import bookingModel from "../Model/booking.js";
import userModel from "../Model/userModel.js";


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
        await bookingModel.findByIdAndUpdate(bookingId, { cleaner: cleanerId, status: 'assigned' });
        return res.status(200).json({ message: "Cleaner assigned to booking successfully." });
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
export const deleteBooking = async (req, res) => {
    const { bookingId } = req.body;
    try {
        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required." });
        }   
        await bookingModel.findByIdAndDelete(bookingId);
        return res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }   
}


export const getAllUser = async (req, res)=>{
        try{
        const users = await userModel.find();
        return res.json({
            message: "Users fetched successfully",
            status: true,
            users
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}
