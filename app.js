import express from 'express';
import connectDB from './config/db.js';

import authRoute from './Routes/auth.js';
import adminRoute from './Routes/admin.js';
import userRoute from './Routes/user.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


