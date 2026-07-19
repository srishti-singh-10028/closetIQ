const express = require('express');
const ClosetItem = require('../models/ClosetItem');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { imageUrl, category, subCategory, color, season, tags } = req.body;
    const newItem = new ClosetItem({
      userId: req.userId,
      imageUrl,
      category,
      subCategory,
      color,
      season,
      tags
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const items = await ClosetItem.find({ userId: req.userId });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await ClosetItem.findOne({ _id: req.params.id, userId: req.userId });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await ClosetItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await ClosetItem.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
