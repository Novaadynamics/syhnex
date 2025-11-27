import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {  
        type: String,
        required: true,
    },  
    isUsed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 } // OTP expires in 5 minutes
    }
});

const otpModel = mongoose.model('OTP', otpSchema);

export default otpModel;