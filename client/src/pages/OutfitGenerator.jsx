import { useState } from 'react'
import ClothingCard from '../components/ClothingCard'
import SeamDivider from '../components/SeamDivider'

const occasions = ['College', 'Party', 'Interview', 'Casual', 'Fest']

// crude mapping for now — Person C's real AI will replace this logic later
const occasionStyleMap = {
  College: 'Casual',
  Party: 'Party',
  Interview: 'Formal',
  Casual: 'Casual',
  Fest: 'Party',
}

function generateOutfit(occasion,closet) {
  const targetStyle = occasionStyleMap[occasion]
  const matching = closet.filter((item) => item.style === targetStyle)

  const top = matching.find((i) => i.category === 'Top')
  const dress = matching.find((i) => i.category === 'Dress')
  const bottom = matching.find((i) => i.category === 'Bottom')
  const shoes = matching.find((i) => i.category === 'Shoes')
  const accessory = matching.find((i) => i.category === 'Accessories')

  // prefer a dress alone, otherwise top+bottom
  const outfit = dress ? [dress, shoes, accessory] : [top, bottom, shoes, accessory]
  return outfit.filter(Boolean) // remove any missing pieces
}

function OutfitGenerator({closet}) {
  const [occasion, setOccasion] = useState('College')
  const [outfit, setOutfit] = useState(null)

  function handleGenerate() {
    setOutfit(generateOutfit(occasion,closet))
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--color-ink)' }}>
        Generate an outfit
      </h1>

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
          className="px-6 py-2 text-white font-medium"
          style={{ backgroundColor: 'var(--color-ink)' }}
        >
          Generate
        </button>
      </div>

      {outfit && (
        <>
          <SeamDivider label={`your ${occasion.toLowerCase()} outfit`} />
          {outfit.length === 0 ? (
            <p style={{ color: 'var(--color-tan)' }}>
              Not enough matching items in your closet for this occasion yet.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
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