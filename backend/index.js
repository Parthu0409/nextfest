import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRouter from './routes/users.js';
import eventsRouter from './routes/events.js';
import notificationsRouter from './routes/notifications.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 4000;

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('NextFest backend is running');
});

app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/notifications', notificationsRouter);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
