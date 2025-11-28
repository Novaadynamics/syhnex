import bookingModel from "../Model/booking.js";
import userModel from "../Model/userModel.js";
import serviceModel from "../Model/serviceModel.js";
import cleanerModel from "../Model/cleanerModel.js";
export const getUserBookings = async (req, res) => {
    const {user} = req.params;
    try {
        const bookings = await bookingModel.find({ user }).populate('service').populate('cleaner');
        return res.status(200).json({ bookings });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }   
}


export const getUserProfile = async (req, res) => {
    const {user} = req.params;
    try {
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }

}

export const updateUserProfile = async (req, res) => {
    const {user} = req.params;
    const { name, email, phone } = req.body;
    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }
        await userModel.findByIdAndUpdate(user._id, { name, email, phone });
        return res.status(200).json({ message: "Profile updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

