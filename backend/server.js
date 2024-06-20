import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../backend/db/connectdb.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
dotenv.config();
import cookieParser from 'cookie-parser';
const PORT= process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/books',bookRoutes);










app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server is running on port ${PORT}`);
}
);
