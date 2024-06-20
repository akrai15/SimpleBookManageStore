import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../backend/db/connectdb.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';      
import path from 'path';

const PORT= process.env.PORT || 5000;

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/books',bookRoutes);




app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist","index.html"));
});



app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server is running on port ${PORT}`);
}
);
