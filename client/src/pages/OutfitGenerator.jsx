import { useState } from 'react'
import ClothingCard from '../components/ClothingCard'
import SeamDivider from '../components/SeamDivider'
import { createOutfit } from '../api/outfits'

const occasions = ['casual', 'work', 'party']

// crude mapping for now — Person C's real AI will replace this logic later
const occasionStyleMap = {
  casual: 'casual',
  work: 'formal',
  party: 'party',
}

function generateOutfit(occasion, closet) {
  const targetStyle = occasionStyleMap[occasion].toLowerCase()

 const matching = closet.filter((item) =>
  item.tags && item.tags.some((tag) => tag.toLowerCase().includes(targetStyle))
)

  const top = matching.find((i) => i.category === 'Top')
  const dress = matching.find((i) => i.category === 'Dress')
  const bottom = matching.find((i) => i.category === 'Bottom')
  const shoes = matching.find((i) => i.category === 'Shoes')
  const accessory = matching.find((i) => i.category === 'Accessories')

  const outfit = dress ? [dress, shoes, accessory] : [top, bottom, shoes, accessory]
  return outfit.filter(Boolean)
}


function OutfitGenerator({closet}) {
  const [occasion, setOccasion] = useState('College')
  const [outfit, setOutfit] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

   function handleGenerate() {
    setOutfit(generateOutfit(occasion, closet))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await createOutfit(occasion, outfit, { temp: 28, condition: 'Clear' }) // placeholder weather until real weather API exists
      setSaved(true)
    } catch (err) {
      console.error('Save outfit error:', err)
      alert('Failed to save outfit: ' + err.message)
    } finally {
      setSaving(false)
    }
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
            <>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mb-6">
                {outfit.map((item) => (
                  <ClothingCard key={item._id} item={item} />
                ))}
              </div>

              <button
                onClick={handleSave}
                disabled={saving || saved}
                className="px-6 py-2 font-medium border disabled:opacity-50"
                style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
              >
                {saved ? 'Saved to history ✓' : saving ? 'Saving...' : 'Wear this outfit'}
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default OutfitGenerator