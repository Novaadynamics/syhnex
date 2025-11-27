import bookingModel from "../Model/booking.js";
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


