import express from 'express';
import { createBooking, updateBooking } from '../controllers/booking.js';
import {authMiddleware} from '../middleware/auth.js';
import { getUserBookings, updateUserProfile, getUserProfile } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/create-booking', authMiddleware, createBooking);
userRoute.get('/user-booking', authMiddleware, getUserBookings)
userRoute.put('/update-booking/:bookingId', authMiddleware, updateBooking)
userRoute.put('/update-profile', authMiddleware, updateUserProfile);
userRoute.get('/get-profile', authMiddleware, getUserProfile);

export default userRoute;