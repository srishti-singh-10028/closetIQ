const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET - Weather based on logged-in user's saved location
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.location) {
      return res.status(400).json({ message: 'User location not set' });
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: user.location,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    const weatherData = {
      location: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity
    };

    res.status(200).json(weatherData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
