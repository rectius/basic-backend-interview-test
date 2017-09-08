import express from 'express';
import defaultCtrl from '../controllers/default.controller';

const router = express.Router();

/** 
 * GET /
 * 
 * Task 1
 * 
 * returns hello world message.
 */
router.route('/')
  .get(defaultCtrl.helloWorld);

export default router;
