import express from 'express';
import { loginController, signUpController , verfiyOTPController} from '../controllers/authentication.js';
import { authMiddleware } from '../middleware/auth.js';
import { createBooking } from '../controllers/booking.js';
import { serviceController } from '../controllers/service.js';
const route = express.Router();

route.post('/SignUp', signUpController);
route.post('/Login', loginController);
route.post('/Verify-OTP', verfiyOTPController);
route.post('/CreateBooking',authMiddleware, createBooking)
route.post('/ServiceController', serviceController);

export default route;