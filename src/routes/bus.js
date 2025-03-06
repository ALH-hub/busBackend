import express from 'express';
import { getAllBuses, createBus } from '../controllers/bus.js';
import { authMiddleware, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

router.get('/buses', getAllBuses);
router.post('/buses', [authMiddleware, adminOnly], createBus);

export default router;
