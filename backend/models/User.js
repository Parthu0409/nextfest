import mongoose from 'mongoose';
import Registration from './Registration';

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return !this.googleId; } },
  googleId: { type: String, unique: true, sparse: true },
  user_type: { type: String, enum: ['student', 'organizer'], required: true },
  points: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.statics.getRegisteredEvents = async function(userId) {
  return Registration.find({ userId, status: 'registered' }).populate('eventId');
};

userSchema.statics.getAttendedEvents = async function(userId) {
  return Registration.find({ userId, status: 'attended' }).populate('eventId');
};

export default mongoose.model('User', userSchema);
