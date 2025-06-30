import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  location: String,
  image_url: String,
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
