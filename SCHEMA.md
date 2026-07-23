# ClosetIQ — Data Schema Reference

This file defines the shape of every object in our database.
Frontend code, backend Mongoose models, and AI output must all match these exact field names, types, and values.
If you need to change something here, message the team first — this file is the source of truth.

**Last updated:** reflects the actual backend models as implemented (previously this doc was out of sync with the real code — if you built anything against an older version of this file, please double check against the models below).

---

## User

```json
{
  "_id": "ObjectId",
  "name": "Srishti Singh",
  "email": "srishti@example.com",
  "password": "hashed_string",
  "location": "Dhanbad",
  "createdAt": "2026-07-12T00:00:00.000Z"
}
```
- `password` is never sent to frontend — only stored hashed (bcrypt) on backend
- `location` is a **plain string** (e.g. a city name), not a nested object. Used for weather-based suggestions (Feature 6).
- No dedicated `/api/users` route exists yet — Profile page still runs on mock data until this is built (needed: `GET /api/users/me`, `PATCH /api/users/me`)

---

## ClosetItem

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "imageUrl": "https://res.cloudinary.com/.../shirt.jpg",
  "category": "top",
  "subCategory": "t-shirt",
  "color": "blue",
  "season": ["summer"],
  "tags": ["casual", "everyday"],
  "createdAt": "2026-07-12T00:00:00.000Z"
}
```
**Allowed values:**
- `category`: `"top"` | `"bottom"` | `"dress"` | `"footwear"` | `"outerwear"` | `"accessory"` — **lowercase, exact strings**
- `subCategory`: free text (e.g. `"t-shirt"`, `"jeans"`) — AI (Person C) can auto-fill this from the uploaded photo
- `color`: free text — AI can auto-detect this from the uploaded photo
- `season`: **array of strings** — e.g. `["summer"]` or `["summer", "monsoon"]` for items that work in multiple seasons
- `tags`: **array of strings** — free text style/occasion tags, e.g. `["casual"]`, `["formal", "office"]`, `["party"]`

**Important:** `season` and `tags` are arrays, not single strings. When sending from frontend via FormData, append each value separately under the same field name (do not send a comma-separated string).

**Upload endpoint:** `POST /api/closet` expects `multipart/form-data` with an `image` file field (handled via Cloudinary upload on the backend) plus the fields above. Endpoint requires auth (JWT in `Authorization: Bearer <token>` header).

---

## Outfit

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "items": ["ObjectId (ref: ClosetItem)", "ObjectId (ref: ClosetItem)"],
  "weatherContext": "sunny, 32°C",
  "occasion": "casual",
  "aiGenerated": false,
  "createdAt": "2026-07-12T00:00:00.000Z"
}
```
**Allowed values:**
- `occasion`: `"casual"` | `"work"` | `"party"` — **lowercase, exact strings, only 3 options currently**
  - Team decided: 3 occasions (casual/work/party) is sufficient for MVP scope. Original 5-occasion plan (College/Party/Interview/Casual/Fest) is dropped.
- `items`: array of ClosetItem `_id` values that make up this outfit (must already exist in that user's closet — AI never invents new items)
- `weatherContext`: **plain string**, not a nested object — e.g. `"sunny, 32°C"`. Backend `.populate('items')` automatically fills in full ClosetItem details when fetching, so frontend doesn't need to manually look up items by ID.
- `aiGenerated`: `true` once Person C's real AI generates the outfit, `false` for rule-based/manual generation (current placeholder logic)
- No `dateWorn` field currently exists — "wearing" an outfit is currently just creating a new Outfit record via `POST /api/outfits`. No explicit "mark as worn today" distinct from "generate" yet.

---

## Real backend routes confirmed as of this update

- `POST /api/auth/signup` — create user
- `POST /api/auth/login` — returns JWT token
- `GET /api/closet` — get logged-in user's closet items
- `POST /api/closet` — add new item (multipart/form-data with image)
- `GET /api/closet/:id`, `PUT /api/closet/:id`, `DELETE /api/closet/:id`
- `GET /api/outfits` — get logged-in user's outfit history (items auto-populated)
- `POST /api/outfits` — save/create an outfit
- `GET /api/outfits/:id`, `DELETE /api/outfits/:id`
- ❌ No `/api/users` routes yet (needed for Profile page)
- ❌ No weather integration yet (Person C's task)
- ❌ No real AI generation/categorization yet (Person C's task — currently frontend uses placeholder rule-based logic)

---

## Notes for each person

- **Person A (backend):** if you add a users route, please update this doc with the exact request/response shape so frontend can match immediately.
- **Person B (frontend):** category values, season, and tags must exactly match the arrays/lowercase strings above — mismatches here will cause save failures (500 errors) or filtering bugs, not obvious crashes.
- **Person C (AI/integration):** when building auto-categorization, your AI's output must return `category` as one of the 6 lowercase values above, `season` and `tags` as arrays, not single strings. When building outfit generation, `occasion` must be one of the 3 lowercase values currently supported, and `weatherContext` must be a plain descriptive string, not an object.
