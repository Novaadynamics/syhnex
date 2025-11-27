import mongoose from "mongoose";

const cleanerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },  
    availability: {
        type: [String], 
        required: true,
    }
}, { timestamps: true });

export const cleanerModel = mongoose.model('Cleaner', cleanerSchema);