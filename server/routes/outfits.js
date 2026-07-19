const express = require('express');
const Outfit = require('../models/Outfit');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// CREATE - Save a new outfit
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, weatherContext, occasion, aiGenerated } = req.body;

    const newOutfit = new Outfit({
      userId: req.userId,
      items,
      weatherContext,
      occasion,
      aiGenerated
    });

    await newOutfit.save();
    res.status(201).json(newOutfit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// READ - Get all outfits for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const outfits = await Outfit.find({ userId: req.userId }).populate('items');
    res.status(200).json(outfits);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// READ - Get single outfit by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const outfit = await Outfit.findOne({ _id: req.params.id, userId: req.userId }).populate('items');
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.status(200).json(outfit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE - Remove an outfit
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const outfit = await Outfit.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.status(200).json({ message: 'Outfit deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
