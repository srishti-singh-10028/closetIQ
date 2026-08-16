# ClosetIQ

An AI-powered digital wardrobe app that helps users organize their clothing, generate outfit recommendations based on occasion and weather, and manage their wardrobe intelligently.

Built as a 3-person team project (MERN stack) over a 15-day timeline.

## Tech Stack

**Frontend:** React, React Router, Tailwind CSS
**Backend:** Node.js, Express, MongoDB (Mongoose)
**Image storage:** Cloudinary
**AI features:** Google Gemini (gemini-flash-latest) — outfit generation,auto-categorization
**Weather:** OpenWeatherMap API
**Deployment:** Render (backend)

## Features

- **Auth** — signup/login with JWT, protected routes
- **Closet management** — add clothing items with photos, view/filter by category and color, delete items
- **AI auto-categorization** — upload a photo and let AI suggest category, sub-category, color, season, and tags
- **AI outfit generation** — generates outfit suggestions based on occasion (casual/work/party), current weather, and your closet, while avoiding outfits worn in the last 3 days
- **Outfit of the Day** — automatically generates and caches one outfit per day
- **Outfit history** — view all previously generated/saved outfits
- **Profile** — view and edit name and location (used for weather-based suggestions), with automatic location detection via browser geolocation
- **Weather integration** — shows current weather for the user's saved location

## Project Structure

This repo has separate branches for each part of the team's work:
- `frontend` — React client (this is where UI work happens)
- `backend` — Express server, MongoDB models, routes
- `ai-integration` — AI service integration (OpenAI, categorization, outfit generation)
- `main` — stable reference branch

## Running Locally

### Frontend
```bash
cd client
npm install
npm run dev
```

Create a `.env` file in `client/` with:

VITE_API_URL=https://closetiq-94q7.onrender.com


(Or point it at your own local backend if running one.)

### Backend
```bash
cd server
npm install
npm run dev
```

Create a `.env` file in `server/` with:
MONGO_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweathermap_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret


## Live Backend

The deployed backend is running at: `https://closetiq-94q7.onrender.com`

## Team

- **Frontend:** Srishti Singh
- **Backend:** Vanshika Panchal
- **AI Integration:** Tenzin Nornzom
