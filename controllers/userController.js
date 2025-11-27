
export const getUserBookings = async (req, res) => {
    const user = req.user;
    try {
        const bookings = await bookingModel.find({ user }).populate('service').populate('cleaner');
        return res.status(200).json({ bookings });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }   
}


export const getUserProfile = async (req, res) => {
    const user = req.user;
    try {
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }

}

export const updateUserProfile = async (req, res) => {
    const user = req.user;
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

export const updateBooking = async (req, res) => {
    const user = req.user;
    const { bookingId, postcode, propertyType, bedrooms, bathrooms, extras, date, timeSlot } = req.body;
    try {
        if (!bookingId || !postcode || !propertyType || !bedrooms || !bathrooms || !date || !timeSlot) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const booking = await bookingModel.findOne({ _id: bookingId, user });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        await bookingModel.findByIdAndUpdate(bookingId, { postcode, propertyType, bedrooms, bathrooms, extras, date, timeSlot });
        return res.status(200).json({ message: "Booking updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}