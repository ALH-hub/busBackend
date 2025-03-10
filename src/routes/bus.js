import express from 'express';
import { getAllBuses, createBus } from '../controllers/bus.js';
import dotenv from 'dotenv';
import { authMiddleware } from '../middlewares/auth.js';

dotenv.config();

const router = express.Router();

router.get('/buses', authMiddleware, getAllBuses);
router.post('/buses', authMiddleware, createBus);

export default router;
