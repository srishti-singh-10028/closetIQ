# ClosetIQ — Data Schema Reference

This file defines the shape of every object in our database. 
Frontend mock data, backend Mongoose models, and AI output must all match these exact field names and types. 
If you need to change something here, message the team first — this file is the source of truth.

---

## User

```json
{
  "_id": "ObjectId",
  "name": "Srishti Singh",
  "email": "srishti@example.com",
  "password": "hashed_string",
  "location": {
    "city": "Muzaffarpur",
    "lat": 26.1197,
    "lon": 85.3910
  },
  "createdAt": "2026-07-12T00:00:00.000Z"
}
```
- `password` is never sent to frontend — only stored hashed (bcrypt) on backend
- `location` is used for weather-based suggestions (Feature 6)

---

## ClosetItem

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "imageUrl": "https://res.cloudinary.com/.../shirt.jpg",
  "category": "Top",
  "color": "Blue",
  "brand": "Zara",
  "season": "Summer",
  "style": "Casual",
  "createdAt": "2026-07-12T00:00:00.000Z"
}
```
**Allowed values:**
- `category`: `"Top"` | `"Bottom"` | `"Dress"` | `"Shoes"` | `"Accessories"`
- `season`: `"Summer"` | `"Winter"` | `"Monsoon"` | `"All-season"`
- `style`: free text for now (e.g. `"Casual"`, `"Formal"`, `"Party"`) — AI (Person C) fills this in automatically from the vision model; user can edit after

---

## Outfit

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "occasion": "College",
  "items": ["ObjectId (ref: ClosetItem)", "ObjectId (ref: ClosetItem)"],
  "weatherAtGeneration": {
    "temp": 32,
    "condition": "Sunny"
  },
  "dateWorn": "2026-07-12T00:00:00.000Z",
  "isAutoSuggested": true,
  "createdAt": "2026-07-12T00:00:00.000Z"
}
```
**Allowed values:**
- `occasion`: `"College"` | `"Party"` | `"Interview"` | `"Casual"` | `"Fest"`
- `items`: array of ClosetItem IDs that make up this outfit (must already exist in that user's closet — AI never invents new items)
- `dateWorn`: set when user marks "I wore this today" — used for outfit history + avoiding repeats (Feature 7)
- `isAutoSuggested`: `true` if this came from "Outfit of the Day" (Feature 5), `false` if user manually requested it via the generator

---

## Notes for each person

- **Person A (backend):** build these three as Mongoose schemas in `server/models/`. Add `timestamps: true` in schema options instead of manually writing `createdAt`.
- **Person B (frontend):** your mock data (`client/src/data/mockCloset.js`) must match the `ClosetItem` shape above exactly — same field names, same allowed values — so swapping to real API data later is a one-line change.
- **Person C (ai-integration):** your GPT-4 Vision prompt must return JSON matching `category`, `color`, `season`, `style` fields exactly as named above, nothing extra, nothing renamed. Your outfit generator must only return `items` as ClosetItem IDs pulled from the DB — never invent clothing that isn't in that user's closet.