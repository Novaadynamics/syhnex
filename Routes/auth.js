import express from 'express';

import { loginController, signUpController , verfiyOTPController, resendOTPController, changePassword, forgotPassword} from '../controllers/authentication.js';

const authRoute = express.Router();

authRoute.post('/sign-up', signUpController);
authRoute.post('/login', loginController);
authRoute.post('/verify-otp', verfiyOTPController);
authRoute.post('/resend-otp', resendOTPController);
authRoute.post('/change-password', changePassword);
authRoute.post('/forget-password', forgotPassword);
export default authRoute;