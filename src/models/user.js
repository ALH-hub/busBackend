import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['passenger', 'admin', 'operator'],
    default: 'passenger',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);
