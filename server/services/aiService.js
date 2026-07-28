/**
 * server/services/aiService.js
 * ClosetIQ — AI/Integration layer, Google Gemini (FREE tier)
 * CommonJS — matches server/package.json ("type": "commonjs")
 */

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-flash-latest';

const VALID_CATEGORIES = ['top', 'bottom', 'dress', 'footwear', 'outerwear', 'accessory'];

async function categorizeClothingItem(imageUrl) {
  const prompt = `You are a fashion categorization assistant for a digital
wardrobe app. Look at this clothing photo and return ONLY a JSON object,
no prose, no markdown fences, in exactly this shape:

{
  "category": "top" | "bottom" | "dress" | "footwear" | "outerwear" | "accessory",
  "subCategory": string,
  "color": string,
  "season": [string, ...],
  "tags": [string, ...]
}

Always make your best guess — never refuse or return an error field.`;

  const imageBytes = await fetchImageAsBase64(imageUrl);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/jpeg', data: imageBytes } },
        ],
      },
    ],
    config: { responseMimeType: 'application/json', temperature: 0.2 },
  });

  const result = safeJsonParse(response.text, 'categorizeClothingItem');

  if (!VALID_CATEGORIES.includes(result.category)) result.category = 'top';
  if (!Array.isArray(result.season)) result.season = [];
  if (!Array.isArray(result.tags)) result.tags = [];

  return result;
}

async function generateOutfit({ closetItems, occasion, weatherData, recentItemIds = [] }) {
  const itemsForPrompt = closetItems.map((i) => ({
    id: i._id.toString(),
    category: i.category,
    subCategory: i.subCategory,
    color: i.color,
    season: i.season,
    tags: i.tags,
  }));

  const weatherContext = `${weatherData.description}, ${Math.round(weatherData.temperature)}C`;

  const prompt = `You are an outfit-generation assistant. Build ONE outfit
using ONLY items from the "closet" list below — never invent an id, color,
or item that isn't listed. Every id you return MUST exist in the closet list.

Rules:
- One "top" OR one "dress" (never both), plus one "bottom" if you picked a
  top (skip bottom if you picked a dress), one "footwear", "outerwear" and
  "accessory" optional.
- Only use categories that actually exist in the closet — don't force it.
- Match the occasion: ${occasion}
- Weather: ${weatherContext}. Avoid outerwear/heavy layers if temperature is
  above 28C. Prefer covered footwear/layering if temperature is below 15C or
  the description suggests rain.
- Avoid reusing these recently-worn item ids if a reasonable alternative
  exists: ${JSON.stringify(recentItemIds)}

Closet: ${JSON.stringify(itemsForPrompt)}

Return ONLY JSON, no markdown fences:
{ "items": [string, ...] }`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json', temperature: 0.7 },
  });

  const parsed = safeJsonParse(response.text, 'generateOutfit');

  const validIds = new Set(itemsForPrompt.map((i) => i.id));
  const items = (parsed.items || []).filter((id) => validIds.has(id));

  return {
    items,
    weatherContext,
    occasion,
    aiGenerated: true,
  };
}

async function fetchImageAsBase64(imageUrl) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const buf = await res.arrayBuffer();
  return Buffer.from(buf).toString('base64');
}

function safeJsonParse(raw, callerName) {
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[aiService] Bad JSON in ${callerName}:`, raw);
    throw new Error(`AI returned invalid JSON in ${callerName}`);
  }
}

module.exports = { categorizeClothingItem, generateOutfit };