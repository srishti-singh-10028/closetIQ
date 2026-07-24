const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.patch('/me', authMiddleware, async (req, res) => {
  try {
    console.log('PATCH called, userId:', req.userId);
    console.log('PATCH body:', req.body);

    const { name, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: { name, location } },
      { new: true }
    ).select('-password');

    console.log('Updated user result:', updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log('PATCH error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
