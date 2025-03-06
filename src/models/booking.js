import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  tripDate: {
    type: Date,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled'],
    default: 'booked',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
