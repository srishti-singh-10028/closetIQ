const mongoose = require('mongoose');

const closetItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String
  },
  color: {
    type: String
  },
  season: {
    type: [String]
  },
  tags: {
    type: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('ClosetItem', closetItemSchema);
