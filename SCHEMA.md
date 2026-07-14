##user
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  location: String,        // for weather API
  createdAt: Date
}

##closetitem
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  imageUrl: String,        // from Cloudinary
  category: String,        // "top", "bottom", "dress", "footwear", "outerwear", "accessory"
  subCategory: String,     // e.g. "t-shirt", "jeans" — AI can auto-fill this
  color: String,           // AI can auto-detect
  season: [String],        // ["summer", "winter", "monsoon"]
  tags: [String],          // e.g. "casual", "formal", "party"
  createdAt: Date
}

##outfit
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [ObjectId] (ref: ClosetItem),   // array of item IDs that make up the outfit
  weatherContext: String,    // e.g. "sunny, 32°C" — from OpenWeatherMap at time of generation
  occasion: String,          // "casual", "work", "party"
  aiGenerated: Boolean,
  createdAt: Date
}