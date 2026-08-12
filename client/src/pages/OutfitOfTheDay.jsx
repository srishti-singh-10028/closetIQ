import { useState, useEffect } from 'react'
import { generateOutfit } from '../utils/generateOutfit'
import { createOutfit } from '../api/outfits'
import { getCurrentWeather } from '../api/weather'
import ClothingCard from '../components/ClothingCard'

function getTodayKey() {
  const today = new Date()
  return `outfitOfDay-${today.toISOString().split('T')[0]}` // e.g. "outfitOfDay-2026-07-23"
}

function OutfitOfTheDay({ closet, loading }) {
  const [outfit, setOutfit] = useState(null)
  const [status, setStatus] = useState('checking') // checking | ready | empty

  useEffect(() => {
    if (loading || closet.length === 0) return

    const todayKey = getTodayKey()
    const cached = localStorage.getItem(todayKey)

    if (cached) {
      // already generated today — reuse it, matched against real closet items
      const cachedIds = JSON.parse(cached)
      const items = closet.filter((item) => cachedIds.includes(item._id))
      setOutfit(items)
      setStatus(items.length > 0 ? 'ready' : 'empty')
      return
    }

    // not generated yet today — create a new one
    const generated = generateOutfit('casual', closet)

    if (generated.length === 0) {
      setStatus('empty')
      return
    }

   setOutfit(generated)
    setStatus('ready')
    localStorage.setItem(todayKey, JSON.stringify(generated.map((item) => item._id)))

    // also save it to real outfit history in the background
    async function saveWithRealWeather() {
      try {
        const weather = await getCurrentWeather()
        const weatherContext = weather
          ? `${weather.description}, ${weather.temperature}°C`
          : 'Weather unavailable'
        await createOutfit('casual', generated, weatherContext)
      } catch (err) {
        console.error('Failed to save outfit of the day:', err)
      }
    }

    saveWithRealWeather()
  }, [loading, closet])

  if (loading || status === 'checking') {
    return <p className="p-8" style={{ color: 'var(--color-tan)' }}>Preparing today's outfit...</p>
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <h1 className="font-display text-2xl mb-2" style={{ color: 'var(--color-ink)' }}>
        Outfit of the day
      </h1>
      <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--color-tan)' }}>
        {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {status === 'empty' ? (
        <p style={{ color: 'var(--color-tan)' }}>
          Not enough items in your closet yet to suggest an outfit — try adding a few more pieces.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          {outfit.map((item) => (
            <ClothingCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default OutfitOfTheDay