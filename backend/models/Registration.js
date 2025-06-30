import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['registered', 'cancelled', 'attended'], default: 'registered' },
  registeredAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Registration', registrationSchema);
