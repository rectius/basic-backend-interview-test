import 'babel-polyfill';
import mongoose from 'mongoose';
import app from '../app';

// Database
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB, {
    useMongoClient: true,
});
mongoose.connection.on('error', () => {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
  });
}

export default app;
