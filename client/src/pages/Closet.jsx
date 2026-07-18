import { useState } from 'react'
import ClothingCard from '../components/ClothingCard'
import SeamDivider from '../components/SeamDivider'

function Closet({ closet }) {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [colorFilter, setColorFilter] = useState('All')

  // build dropdown options dynamically from whatever's actually in the closet
  const categories = ['All', ...new Set(closet.map((item) => item.category))]
  const colors = ['All', ...new Set(closet.map((item) => item.color))]

  // apply both filters together
  const filteredCloset = closet.filter((item) => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesColor = colorFilter === 'All' || item.color === colorFilter
    return matchesCategory && matchesColor
  })

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <div
        className="flex justify-between items-baseline border-b pb-4 mb-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span className="font-display text-2xl" style={{ color: 'var(--color-ink)' }}>
          ClosetIQ
        </span>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Your closet — {filteredCloset.length} of {closet.length} items
        </span>
      </div>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border px-3 py-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
            Color
          </label>
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="border px-3 py-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {(categoryFilter !== 'All' || colorFilter !== 'All') && (
          <button
            onClick={() => { setCategoryFilter('All'); setColorFilter('All') }}
            className="self-end text-sm underline"
            style={{ color: 'var(--color-tan)' }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredCloset.length === 0 ? (
        <p style={{ color: 'var(--color-tan)' }}>No items match these filters.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredCloset.map((item) => (
            <ClothingCard key={item._id} item={item} />
          ))}
        </div>
      )}

      <SeamDivider label="today's outfit" />
    </div>
  )
}

export default Closet