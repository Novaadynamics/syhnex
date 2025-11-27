import bookingModel from "../models/booking.js";
const validPostCode = (postcode) => {
    // Implement postcode validation logic here

     const londonRegex = /^(E|EC|N|NW|SE|SW|W|WC)\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
  return londonRegex.test(postcode.trim());
}


export const createBooking = async (req, res) => {

   const user = req.user;
    const { service,  postcode, propertyType, bedrooms, bathrooms, extras, date, timeSlot, price } = req.body;
try {
    if (!service  || !postcode || !propertyType || !bedrooms || !bathrooms || !date || !timeSlot || !price) {
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
        price
    }



     await bookingModel.create(bookingObj);
        return  res.status(201).json({ message: "Booking created successfully." });
    } catch (error) {

        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }

}

export const getUserBookings = async (req, res) => {
    const user = req.user;
    try {
        const bookings = await bookingModel.find({ user }).populate('service').populate('cleaner');
        return res.status(200).json({ bookings });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }   
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate('service').populate('cleaner').populate('user');
        return res.status(200).json({ bookings });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

export const updateBookingStatus = async (req, res) => {
    const { bookingId, status } = req.body;
    try {
        if (!bookingId || !status) {
            return res.status(400).json({ message: "Booking ID and status are required." });
        }
        await bookingModel.findByIdAndUpdate(bookingId, { status });
        return res.status(200).json({ message: "Booking status updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

export const updatePaymentStatus = async (req, res) => {
    const { bookingId, paymentStatus } = req.body;
    try {
        if (!bookingId || !paymentStatus) {
            return res.status(400).json({ message: "Booking ID and payment status are required." });
        }
        await bookingModel.findByIdAndUpdate(bookingId, { paymentStatus });
        return res.status(200).json({ message: "Payment status updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

export const assignCleanerToBooking = async (req, res) => {
    const { bookingId, cleanerId } = req.body;
    try {
        if (!bookingId || !cleanerId) {
            return res.status(400).json({ message: "Booking ID and Cleaner ID are required." });
        }
        await bookingModel.findByIdAndUpdate(bookingId, { cleaner: cleanerId });
        return res.status(200).json({ message: "Cleaner assigned to booking successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}
