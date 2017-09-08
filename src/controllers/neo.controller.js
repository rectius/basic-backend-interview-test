import httpStatus from 'http-status';
import APIError from '../models/error/APIError';
import Neo from '../models/neo.model';

/**
 * Returns all DB entries which contain potentially hazardous asteroids.
 * @param req
 * @param res
 * @param next
 * @returns {Neo[]}
 */
async function getHazardous(req, res, next) {
    let result;
    try {
        result = await Neo.getHazardous();
        return res.json(result);
    }
    catch(e) {
        next(e);
    }
}

/**
 * Returns the model of the fastest asteroid.
 * @param req
 * @param res
 * @param next
 * @property {boolean} req.query.hazardous - true means is hazardous. Default false.
 * @returns {Neo}
 */
async function getFastest (req, res, next) {
    const { hazardous = false } = req.query;
    let result;
    try { 
        result = await Neo.getFastest(hazardous);
        return res.json(result);
    }
    catch(e) {
        next(e);
    }
}

/**
 * Returns a year with most asteroids.
 * @param req
 * @param res
 * @param next
 * @property {boolean} req.query.hazardous - true means is hazardous. Default false.
 * @returns {Neo}
 */
async function getBestYear(req, res, next) {
    const { hazardous = false } = req.query;
    let result;
    try { 
        result = await Neo.getBestYear(hazardous);
        if(result && result.length > 0) {
            return res.json(result[0]);
        }
    }
    catch(e) {
        next(e);
    }
}

/**
 * Return a month with most asteroids (not a month in a year).
 * @param req
 * @param res
 * @param next
 * @property {boolean} req.query.hazardous - true means is hazardous. Default false.
 * @returns {Neo}
 */
async function getBestMonth(req, res, next) {
    const { hazardous = false } = req.query;
    let result;
    try { 
        result = await Neo.getBestMonth(hazardous);
        if(result && result.length > 0) {
            return res.json(result[0]);
        }
    }
    catch(e) {
        next(e);
    }
}

export default { getHazardous, getFastest, getBestMonth, getBestYear };
