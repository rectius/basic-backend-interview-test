import express from 'express';
import neoCtrl from '../controllers/neo.controller';

const router = express.Router();

/** 
 * GET /neo/hazardous
 * 
 * Task 4
 * 
 * returns all DB entries which contain potentially hazardos asteroids.
 */
router.route('/hazardous')
  .get(neoCtrl.getHazardous);


/** 
 * GET /neo/fastest
 * 
 * Task 5
 * 
 * calculate and return the model of the fastest asteroid.
 * with a hazardous parameter, where true means is hazardous.
 * default hazardous value is false.
 */
router.route('/fastest')
.get(neoCtrl.getFastest);


/** 
 * GET /neo/best-year
 * 
 * Task 6
 * 
 * analyze all data.
 * calculate and return a year with most asteroids.
 * with a hazardous parameter, where true means is hazardous.
 * default hazardous value is false.
 */
router.route('/best-year')
.get(neoCtrl.getBestYear);


/** 
 * GET /neo/best-month
 * 
 * Task 7
 * 
 * analyze all data.
 * calculate and return a month with most asteroids (not a month in a year).
 * with a hazardous parameter, where true means is hazardous.
 * default hazardous value is false.
 */
router.route('/best-month')
.get(neoCtrl.getBestMonth);
 
export default router;
