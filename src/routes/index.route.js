import express from 'express';
import defaultRoutes from './default.route';
import neoRoutes from './neo.route';

const router = express.Router();

// mount routes at /
router.use('/', defaultRoutes);

// mount routes at /neo
router.use('/neo', neoRoutes);

export default router;
