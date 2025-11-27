import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({

    serviceType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
    

}, { timestamps: true });

const serviceModel = mongoose.model('Service', serviceSchema);
export default serviceModel;