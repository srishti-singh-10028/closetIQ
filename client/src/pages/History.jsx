import { mockOutfitHistory } from '../data/mockOutfitHistory'
import ClothingCard from '../components/ClothingCard'

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function History({ closet }) {
  // sort newest first
  const sortedHistory = [...mockOutfitHistory].sort(
    (a, b) => new Date(b.dateWorn) - new Date(a.dateWorn)
  )

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--color-ink)' }}>
        Outfit history
      </h1>

      {sortedHistory.length === 0 ? (
        <p style={{ color: 'var(--color-tan)' }}>No outfits logged yet.</p>
      ) : (
        <div className="space-y-8">
          {sortedHistory.map((outfit) => {
            // look up full item details using the stored IDs
            const items = closet.filter((item) => outfit.itemIds.includes(item._id))

            return (
              <div key={outfit._id} className="border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-display text-lg" style={{ color: 'var(--color-ink)' }}>
                    {outfit.occasion}
                  </span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
                    {formatDate(outfit.dateWorn)} · {outfit.weatherAtGeneration.temp}°C
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 max-w-2xl">
                  {items.map((item) => (
                    <ClothingCard key={item._id} item={item} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default History