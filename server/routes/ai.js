/**
 * server/routes/ai.js
 * Mount in server.js as: app.use('/api/ai', require('./routes/ai'));
 */

const express = require('express');
const axios = require('axios');
const ClosetItem = require('../models/ClosetItem');
const Outfit = require('../models/Outfit');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { categorizeClothingItem, generateOutfit } = require('../services/aiService');

const router = express.Router();

// POST /api/ai/categorize
router.post('/categorize', authMiddleware, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required' });
    }
    const result = await categorizeClothingItem(imageUrl);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/ai/generate-outfit
router.post('/generate-outfit', authMiddleware, async (req, res) => {
  try {
    const { occasion } = req.body;
    if (!occasion) {
      return res.status(400).json({ message: 'occasion is required' });
    }

    const closetItems = await ClosetItem.find({ userId: req.userId });
    if (closetItems.length === 0) {
      return res.status(400).json({ message: 'Closet is empty — add items first' });
    }

    const user = await User.findById(req.userId);
    if (!user || !user.location) {
      return res.status(400).json({ message: 'User location not set' });
    }

    const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: user.location,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });

    const weatherData = {
      temperature: weatherRes.data.main.temp,
      description: weatherRes.data.weather[0].description,
    };

    const cutoff = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const recentOutfits = await Outfit.find({
      userId: req.userId,
      createdAt: { $gte: cutoff },
    });
    const recentItemIds = recentOutfits.flatMap((o) => o.items.map((id) => id.toString()));

    const outfit = await generateOutfit({
      closetItems,
      occasion,
      weatherData,
      recentItemIds,
    });

    const saved = await Outfit.create({ userId: req.userId, ...outfit });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;