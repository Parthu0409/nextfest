import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return !this.googleId; } },
  googleId: { type: String, unique: true, sparse: true },
  user_type: { type: String, enum: ['student', 'organizer'], required: true },
  points: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
