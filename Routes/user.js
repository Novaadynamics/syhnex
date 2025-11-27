import express from 'express';
import { createBooking } from '../controllers/booking.js';
import {authMiddleware} from '../middleware/auth.js';

const userRoute = express.Router();

userRoute.post('/create-booking', authMiddleware, createBooking);

export default userRoute;