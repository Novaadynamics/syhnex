import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Model/userModel.js';
import nodemailer from 'nodemailer';
import otpModel from '../Model/otpModel.js';
export const signUpController = async (req, res) => {
 try {
     const { username,email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObj = {
        ...req.body,
        password: hashedPassword,
    }

    await userModel.create(userObj);

     const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      //   text: "HELLO JANI KYA HAL hai?",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
        }
        .main-content {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .verification-button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
        }
        .verification-button:hover {
            background-color: #45a049;
        }
        .footer {
            font-size: 12px;
            color: #888;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="" alt="Your Logo">
        </div>
        <div class="greeting">
            <p>Hi ${username},</p>
        </div>
        <div class="main-content">
            <p>Thank you for signing up with SHYNEX! We're excited to have you on board. To get started, please verify your email address by clicking the button below:</p>
        </div>
        <div style="text-align: center;">
            <button href="[Verification Link]" class="verification-button"> ${otp} </button>
        </div>
        <div class="footer">
            <p>If you didn't sign up for this account, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} HiringMine. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    });

    const otpObj = {
      email,
      otp,
    };
    await otpModel.create(otpObj);



    res.status(201).json({ message: 'User created successfully.' });
}catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const loginController = async (req, res) => {
   try{
     const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
     if (user.isVerified === false) {
      return res.status(400).json({ message: 'Email not verified.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const userData = {
      username: user.username,
      email: user.email,
    };
   return res.json({message:"Login Successful", token, user: userData });
   }
   catch(error){
   return res.json({message: error.message});
   }
}

export const verfiyOTPController = async (req, res) => {
  try {
    const { email,  otp } = req.body;
    if (!email || !otp) {
      return res.json({
        message: "Required field are missing",
        status: false,
      });
    }

    const isExist = await otpModel.findOne({ email, isUsed: false }).sort({
      createdAt: -1,
    });
    console.log("isExist", isExist);

    if (!isExist) {
      return res.json({
        message: "Invalid OTP",
        status: false,
      });
    }

    if (isExist.otp !== otp) {
      return res.json({
        message: "Invalid OTP",
        status: false,
      });
    }

    await otpModel.findByIdAndUpdate(isExist._id, { isUsed: true });
    await userModel.findOneAndUpdate({ email }, { isVerified: true });

    // console.log("OTP VERIFY")
    return res.json({
      message: "otp verify",
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};

export const resendOTPController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        message: "Required field are missing",
        status: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "invalid email address",
        status: false,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("otp", otp);

    // send verfiy email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      //   text: "HELLO JANI KYA HAL hai?",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
        }
        .main-content {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .verification-button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
        }
        .verification-button:hover {
            background-color: #45a049;
        }
        .footer {
            font-size: 12px;
            color: #888;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://www.hiringmine.com/assets/Hiring%20Mine%20Logo-453a72d3.png" alt="Your Logo">
        </div>
        <div class="greeting">
            <p>Hi ${user.name},</p>
        </div>
        <div class="main-content">
            <p>Thank you for signing up with HiringMine! We're excited to have you on board. To get started, please verify your email address by clicking the button below:</p>
        </div>
        <div style="text-align: center;">
            <button href="[Verification Link]" class="verification-button"> ${otp} </button>
        </div>
        <div class="footer">
            <p>If you didn't sign up for this account, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} HiringMine. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
    });
    const otpObj = {
      otp,
      email,
    };
    await otpModel.create(otpObj);
    res.json({
      message: "RESET OTP SUCCESSFULLY",
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        message: "Required field are missing",
        status: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid Email address",
        status: false,
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const FE_URL = `${process.env.FRONTEND_URL}/change-password?q=${token}`;

    // send verify link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Forgot password verify",
      html: `<html> <body>  <button  > <a href=${FE_URL} target="_blank" >Change Password</a>  </button>   </body> </html>`,
    });
    res.json({
      message: "Please check your email ",
      status: true,
      // data: null,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.json({
        message: "Required field are missing",
        status: false,
      });
    }

    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
    console.log("tokenVerify", tokenVerify);

    if (!tokenVerify.email || !tokenVerify._id) {
      return res.json({
        message: "Invalid Token",
        status: false,
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(tokenVerify._id, {
      password: hashPassword,
    });

   return res.json({
      message: "password changed! ",
      status: true,
      // data: null,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};