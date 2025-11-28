import mongoose from "mongoose";

const cleanerSchema = new mongoose.Schema({
   user: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "user" ,
        required: true,

   },

    servicesProvided: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
    }],
    availability: {
        type: Boolean,
        default: true, 
        required: true,
    },
    Rating:{
        type: Number,
        default: 0,
        required: true 
    }
}, { timestamps: true });

 const cleanerModel = mongoose.model('Cleaner', cleanerSchema);
export default cleanerModel;