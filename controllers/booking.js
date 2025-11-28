import bookingModel from "../Model/booking.js";
import userModel from "../Model/userModel.js";
import serviceModel from "../Model/serviceModel.js";
import cleanerModel from "../Model/cleanerModel.js";
const validPostCode = (postcode) => {
    // Implement postcode validation logic here

     const londonRegex = /^(E|EC|N|NW|SE|SW|W|WC)\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
  return londonRegex.test(postcode.trim());
}


export const createBooking = async (req, res) => {

   const user = req.user;
    const { service,cleaner, postcode, propertyType, bedrooms, bathrooms, extras, date, timeSlot } = req.body;
try {
    if (!service  || !postcode || !propertyType || !bedrooms || !bathrooms || !date || !timeSlot) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (!validPostCode(postcode)) {
        return res.status(400).json({ message: "Invalid postcode. We only serve London area." });
    }

    const bookingObj = {
        user,
        service,
        cleaner,
        postcode,
        propertyType,
        bedrooms,
        bathrooms,
        extras,
        date,
        timeSlot,
      
    }



     await bookingModel.create(bookingObj);
        return  res.status(201).json({ message: "Booking created successfully." });
    } catch (error) {

        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }

}


export const updateBooking = async (req, res) => {
    const {bookingId} = req.params;
    const user = req.user;
    console.log("user", user);
    console.log("booking", bookingId);
    console.log("body", req.body);
    const { postcode, propertyType, bedrooms, bathrooms, extras, date, timeSlot } = req.body;
    try {
        if (!bookingId || !user) {
            return res.status(400).json({ message: "Booking ID is required." });
        }
        const booking = await bookingModel.findOne({ _id: bookingId, user });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        await bookingModel.findByIdAndUpdate(bookingId, req.body);
        return res.status(200).json({ message: "Booking updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}