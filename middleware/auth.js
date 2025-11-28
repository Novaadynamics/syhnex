import jwt from 'jsonwebtoken';
import userModel from '../Model/userModel.js';
export const authMiddleware = async (req, res, next) => {
  
    const token = req.headers["authorization"].split(" ")[1];
    console.log("token", token);
    // const isVerify = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("isVerify", isVerify);
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      //req.user = decoded.userId;
      req.user = await userModel.findById(decoded.userId);
      console.log("decoded", req.user);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid authorization token' });
    }
    
  
};