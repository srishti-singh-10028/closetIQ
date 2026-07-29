const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ClosetIQ backend is running!');
});

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
app.use('/api/auth', authRoutes);
app.use('/api/closet', closetItemRoutes);
app.use('/api/outfits', outfitRoutes);
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/ai', require('./routes/ai'));
>>>>>>> origin/ai-integration

