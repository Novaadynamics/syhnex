import serviceModel from '../Model/serviceModel.js';
export const serviceController = async (req, res) => {

    try{
        const { serviceType, description, price } = req.body;

    if (!serviceType || !description || !price) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const serviceObj = {
        serviceType,
        description,
        price
    }

        await serviceModel.create(serviceObj);
    return res.status(201).json({ message: "Service created successfully." });
    }
    catch(error){
        return res.json({
            message: error.message,
            status: false
        })
    }
    

}