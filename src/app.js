import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes/recordRoute.js';
import summaryRouter from './routes/analystRoute.js';
import userRouter from './routes/userRoute.js';
import { mockAuth } from './middleware/mockAuth.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/records', mockAuth, router);
app.use('/summary', mockAuth, summaryRouter);
app.use('/users', userRouter);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default app;