import express from 'express';
import { adminAuthorization } from '../middleware/authorization.js';
import { assignCleanerToBooking, deleteBooking, getAllBookings, getAllUser, updateBookingStatus, updatePaymentStatus } from '../controllers/adminController.js';


const adminRoute = express.Router();    

adminRoute.get('/get-all-bookings', adminAuthorization, getAllBookings);
adminRoute.post('/update-booking-status', adminAuthorization, updateBookingStatus);
adminRoute.post('/update-payment-status', adminAuthorization, updatePaymentStatus);
adminRoute.post('/assign-cleaner', adminAuthorization, assignCleanerToBooking);
adminRoute.post('/delete-booking', adminAuthorization, deleteBooking);
adminRoute.get('/get-all-users',adminAuthorization, getAllUser);

export default adminRoute;