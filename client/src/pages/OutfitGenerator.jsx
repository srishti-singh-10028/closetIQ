import { useState, useEffect } from 'react'
import ClothingCard from '../components/ClothingCard'
import SeamDivider from '../components/SeamDivider'
import { generateAIOutfit } from '../api/outfits'
import { getCurrentWeather } from '../api/weather'
import { detectLocation } from '../utils/detectLocation'
import { getCurrentUser, updateCurrentUser } from '../api/users'

const occasions = ['casual', 'work', 'party']

function OutfitGenerator({ closet }) {
  const [occasion, setOccasion] = useState('casual')
  const [outfit, setOutfit] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function ensureLocationAndFetchWeather() {
      try {
        const user = await getCurrentUser()

        if (!user.location) {
          const city = await detectLocation()
          await updateCurrentUser(user.name, city)
        }

        const weatherData = await getCurrentWeather()
        setWeather(weatherData)
      } catch (err) {
        console.error('Weather/location setup failed:', err)
      }
    }

    ensureLocationAndFetchWeather()
  }, [])

  async function handleGenerate() {
    setGenerating(true)
    setError(null)
    setOutfit(null)
    try {
      const savedOutfit = await generateAIOutfit(occasion)
      // savedOutfit.items is an array of ClosetItem IDs — map back to full items from closet prop
      const fullItems = savedOutfit.items
        .map((id) => closet.find((item) => item._id === id))
        .filter(Boolean)
      setOutfit(fullItems)
    } catch (err) {
      console.error('Generate outfit error:', err)
      setError(err.message || 'Failed to generate outfit')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--color-ink)' }}>
        Generate an outfit
      </h1>

      {weather && (
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-tan)' }}>
          Current weather: {weather.description}, {weather.temperature}°C in {weather.location}
        </p>
      )}

      <div className="flex gap-4 items-end mb-8">
        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
            Occasion
          </label>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="border px-3 py-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {occasions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-2 text-white font-medium disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-ink)' }}
        >
          {generating ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error && (
        <p className="mb-4" style={{ color: 'var(--color-tan)' }}>
          {error}
        </p>
      )}

      {outfit && (
        <>
          <SeamDivider label={`your ${occasion} outfit`} />
          {outfit.length === 0 ? (
            <p style={{ color: 'var(--color-tan)' }}>
              Not enough matching items in your closet for this occasion yet.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4 max-w-2xl mb-6">
              {outfit.map((item) => (
                <ClothingCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default OutfitGenerator