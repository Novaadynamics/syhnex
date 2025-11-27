import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  //  cleaner: { type: mongoose.Schema.Types.ObjectId, ref: "Cleaner" },
  postcode: String,
  propertyType: String,
  bedrooms: Number,
  bathrooms: Number,
  extras: [String],
  date: Date,
  timeSlot: String,
  price: Number,
  status: { type: String, default: "pending" },
  paymentStatus: { type: String, default: "unpaid" }
}, { timestamps: true });

const bookingModel = mongoose.model('Booking', bookingSchema);

export default bookingModel;