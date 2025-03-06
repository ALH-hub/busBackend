import express from 'express';
import { createBooking, cancelBooking } from '../controllers/booking.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post('/bookings', authMiddleware, createBooking);
router.delete('/bookings/:id', authMiddleware, cancelBooking);

export default router;
