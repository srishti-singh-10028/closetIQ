const express = require('express');
const Outfit = require('../models/Outfit');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

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

router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await Outfit.find({
      userId: req.userId,
      dateWorn: { $ne: null }
    })
      .populate('items')
      .sort({ dateWorn: -1 });

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const outfits = await Outfit.find({ userId: req.userId }).populate('items');
    res.status(200).json(outfits);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

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

router.patch('/:id/wear', authMiddleware, async (req, res) => {
  try {
    const outfit = await Outfit.findOne({ _id: req.params.id, userId: req.userId });

    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }

    outfit.dateWorn = new Date();
    await outfit.save();

    res.status(200).json(outfit);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

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
