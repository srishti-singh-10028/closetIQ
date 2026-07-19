import { useState, useEffect } from 'react'
import { getOutfitHistory } from '../api/outfits'
import ClothingCard from '../components/ClothingCard'

function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOutfitHistory()
      .then((data) => {
        setHistory(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load history:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="p-8" style={{ color: 'var(--color-tan)' }}>Loading your outfit history...</p>
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--color-ink)' }}>
        Outfit history
      </h1>

      {history.length === 0 ? (
        <p style={{ color: 'var(--color-tan)' }}>No outfits logged yet.</p>
      ) : (
        <div className="space-y-8">
          {history.map((outfit) => (
            <div key={outfit._id} className="border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-display text-lg" style={{ color: 'var(--color-ink)' }}>
                  {outfit.occasion}
                </span>
                {outfit.weatherContext && (
                  <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
                    {outfit.weatherContext.temp}°C · {outfit.weatherContext.condition}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4 max-w-2xl">
                {outfit.items.map((item) => (
                  <ClothingCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History