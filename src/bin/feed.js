import dotenv from 'dotenv';
import moment from 'moment';
import mongoose from 'mongoose';
import request from 'request-promise';
import Neo from '../models/neo.model';

// load environment variables from .env file
dotenv.load();

// Database
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB, {
    useMongoClient: true,
});
mongoose.connection.on('error', () => {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

// date from 3 days ago
const threeDaysAgo = moment().subtract(2, 'days').format('YYYY-MM-DD');

/**
 * Import data from the last 3 days from nasa api
 * @property {number} req.query.skip - Number of Neo's to be skipped.
 * @property {number} req.query.limit - Limit number of Neo's to be returned.
 * @returns {Neo[]}
 */
async function feed() {   
    try {
        clearDatabase();
        let items = [];
        let result = await request.get({
            baseUrl: process.env.NEO_BASE_URL,
            uri: `/feed?end_date=${threeDaysAgo}&api_key=${process.env.NEO_API_KEY}`,
            json: true
        });
        Object.keys(result.near_earth_objects).forEach((key) => {
            const neosByDate = result.near_earth_objects[key];
            neosByDate.forEach(item => {
                items.push({
                    date: moment(key).format('YYYY-MM-DD'),
                    year: moment(key).format('YYYY'),
                    month: moment(key).format('MM'),
                    reference: item.neo_reference_id,
                    name: item.name,
                    speed: item.close_approach_data[0].relative_velocity.kilometers_per_hour,
                    isHazardous: item.is_potentially_hazardous_asteroid
                }); 
            })
        });
        await saveData(items);
    }
    catch(e) {
        console.log(e)
    }
}

function clearDatabase() {
    Neo.remove({}, (err) => {
        if(err) console.log(err)
    });
}

async function saveData(items) {
    await Neo.collection.insert(items, (err, docs) => {
        if(err) console.log(err);
        console.log(`Inserted ${docs.insertedCount} Near-Earth Objects (NEOs)`);
        process.exit()
    });
}


// do the magic =]
feed();
