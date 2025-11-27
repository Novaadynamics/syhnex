import express from 'express';
import connectDB from './config/db.js';
import route from './Routes/index.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', route);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


