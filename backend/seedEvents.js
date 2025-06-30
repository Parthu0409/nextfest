import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Event from './models/Event.js';

const events = [
  {
    title: 'AI Workshop',
    description: 'Learn the basics of AI and machine learning.',
    start_date: new Date('2025-07-10T10:00:00'),
    end_date: new Date('2025-07-10T16:00:00'),
    location: 'Auditorium A',
    image_url: 'https://source.unsplash.com/800x400/?ai,workshop',
    organizer_id: '64a1f2b3c4d5e6f7a8b9c0d1',
    category: 'workshop',
  },
  {
    title: 'NextFest Hackathon',
    description: '24-hour coding marathon with exciting prizes.',
    start_date: new Date('2025-07-15T09:00:00'),
    end_date: new Date('2025-07-16T09:00:00'),
    location: 'Lab 3',
    image_url: 'https://source.unsplash.com/800x400/?hackathon',
    organizer_id: '64a1f2b3c4d5e6f7a8b9c0d1',
    category: 'hackathon',
  },
  {
    title: 'Tech Conference 2025',
    description: 'Annual conference with top tech speakers.',
    start_date: new Date('2025-08-01T09:00:00'),
    end_date: new Date('2025-08-01T18:00:00'),
    location: 'Main Hall',
    image_url: 'https://source.unsplash.com/800x400/?conference',
    organizer_id: '64a1f2b3c4d5e6f7a8b9c0d1',
    category: 'conference',
  },
  {
    title: 'Monthly Meetup',
    description: 'Casual meetup for tech enthusiasts.',
    start_date: new Date('2025-07-20T18:00:00'),
    end_date: new Date('2025-07-20T20:00:00'),
    location: 'Cafeteria',
    image_url: 'https://source.unsplash.com/800x400/?meetup',
    organizer_id: '64a1f2b3c4d5e6f7a8b9c0d1',
    category: 'meetup',
  },
];

async function insertEvents() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Event.deleteMany({});
  await Event.insertMany(events);
  console.log('Sample events inserted!');
  mongoose.disconnect();
}

insertEvents();
