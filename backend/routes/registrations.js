// Backend: Event registration, notifications, analytics, approval workflow stubs
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Registration = require('../models/Registration');

// Register for event
router.post('/register', async (req, res) => {
  const { eventId, userId } = req.body;
  try {
    let reg = await Registration.findOne({ eventId, userId });
    if (reg && reg.status === 'registered') {
      return res.status(400).json({ error: 'Already registered' });
    }
    if (reg) {
      reg.status = 'registered';
      reg.registeredAt = new Date();
      await reg.save();
    } else {
      reg = new Registration({ eventId, userId });
      await reg.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel registration
router.post('/cancel', async (req, res) => {
  const { eventId, userId } = req.body;
  try {
    const reg = await Registration.findOne({ eventId, userId });
    if (!reg || reg.status !== 'registered') {
      return res.status(400).json({ error: 'Not registered' });
    }
    reg.status = 'cancelled';
    await reg.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get registrations for event
router.get('/:eventId/registrations', async (req, res) => {
  try {
    const regs = await Registration.find({ eventId: req.params.eventId, status: 'registered' }).populate('userId');
    res.json(regs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics endpoint
router.get('/:eventId/analytics', async (req, res) => {
  try {
    const registrations = await Registration.countDocuments({ eventId: req.params.eventId, status: 'registered' });
    // For demo: views and feedback are static
    res.json({ views: 0, registrations, feedback: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approval workflow
router.post('/:eventId/approve', (req, res) => {
  // TODO: Approve event
  res.json({ approved: true });
});

router.post('/:eventId/reject', (req, res) => {
  // TODO: Reject event
  res.json({ approved: false });
});

module.exports = router;
