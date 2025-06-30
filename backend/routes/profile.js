import express from 'express';
import User from '../models/User.js';
const router = express.Router();

// Get registered events for a user
router.get('/:userId/registered', async (req, res) => {
  try {
    const events = await User.getRegisteredEvents(req.params.userId);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get attended events for a user
router.get('/:userId/attended', async (req, res) => {
  try {
    const events = await User.getAttendedEvents(req.params.userId);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
