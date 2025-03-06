import mongoose from 'mongoose';

const BusSchema = new mongoose.Schema({
  busNumber: { type: String, unique: true, required: true },
  route: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  operator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  schedule: {
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
  },
  availableSeats: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Bus', BusSchema);
