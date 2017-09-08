import httpStatus from 'http-status';
import APIError from '../models/error/APIError';

/**
 * Returns Hello World
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function helloWorld(req, res, next) {
    return res.json({ 
        hello: "world!" 
    });
}

export default { helloWorld };
