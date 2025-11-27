import serviceModel from '../Model/serviceModel.js';
export const createService = async (req, res) => {

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

export const updateService = async (req, res)=>{
        const {serviceId, price} = req.body;
    if(!serviceId){
        return res.json({
            message: "Service Id is not available",
            status: false
        })
    }
    const isExist = await serviceModel.findOne(serviceId)
    if(!isExist){
        return res.json({
            message: "No service Available",
            status: false
        })
    }
    try{
        await serviceModel.findByIdAndUpdate(serviceId, {price});
        return res.json({
            message: "Service updated successfully",
            status: true
        })
    }
    catch(error){
        return res.json({
            message: error.message,
            status: false
        })
    }

}

export const getAllServices = async (req, res) => {
    try{
        const services = await serviceModel.find(); 
        return res.json({
            message: "Services fetched successfully",
            status: true,
            data: services
        })
    }
    catch(error){
        return res.json({
            message: error.message,
            status: false
        })
    }
}