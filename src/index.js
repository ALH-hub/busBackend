import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// importing the database connection
import connectDB from './config/db.js';

connectDB();

// importing the routes
import bookingRoutes from './routes/booking.js';
import busRoutes from './routes/bus.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/api', (req, res) => {
  res.json('Welcome to the Bus Booking API');
});

app.use('/api/auth', authRoutes);
app.use('/api', busRoutes);
app.use('/api', bookingRoutes);
app.use('/api', userRoutes);

// Handle unauthorized routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Unauthorized route' });
});

app.listen(8080, () => {
  console.log('API available on http://localhost:8080/api');
});
