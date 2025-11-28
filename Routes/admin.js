import express from 'express';
import { adminAuthorization } from '../middleware/authorization.js';
import { assignCleanerToBooking, deleteBooking, deleteCleaner, deleteUser, getAllBookings, getAllCleaners, getAllUser, updateBookingStatus, updatePaymentStatus } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/auth.js';


const adminRoute = express.Router();    

adminRoute.get('/get-all-bookings', authMiddleware, adminAuthorization, getAllBookings);
adminRoute.post('/update-booking-status', authMiddleware, adminAuthorization, updateBookingStatus);
adminRoute.post('/update-payment-status', authMiddleware, adminAuthorization, updatePaymentStatus);
adminRoute.post('/assign-cleaner', authMiddleware, adminAuthorization, assignCleanerToBooking);
adminRoute.delete('/delete-booking/:bookingId', authMiddleware, adminAuthorization, deleteBooking);
adminRoute.get('/get-all-users', authMiddleware, adminAuthorization, getAllUser);
adminRoute.delete('/delete-user/:userId', authMiddleware, adminAuthorization, deleteUser);
adminRoute.get('/get-all-cleaners', authMiddleware, adminAuthorization, getAllCleaners);
adminRoute.delete('/delete-cleaner/:cleanerId', authMiddleware, adminAuthorization, deleteCleaner);

export default adminRoute;