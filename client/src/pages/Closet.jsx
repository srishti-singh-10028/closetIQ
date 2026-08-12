import { useState } from 'react'
import ClothingCard from '../components/ClothingCard'
import SeamDivider from '../components/SeamDivider'

function Closet({ closet, loading, onDeleteItem }) {
  if (loading) {
    return <p className="p-8" style={{ color: 'var(--color-tan)' }}>Loading your closet...</p>
  }
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [colorFilter, setColorFilter] = useState('All')

  const categories = ['All', ...new Set(closet.map((item) => item.category))]
  const colors = ['All', ...new Set(closet.map((item) => item.color))]

  const filteredCloset = closet.filter((item) => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    const matchesColor = colorFilter === 'All' || item.color === colorFilter
    return matchesCategory && matchesColor
  })

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      {/* ...header and filters unchanged... */}

      {filteredCloset.length === 0 ? (
        <p style={{ color: 'var(--color-tan)' }}>No items match these filters.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredCloset.map((item) => (
            <ClothingCard key={item._id} item={item} onDelete={onDeleteItem} />
          ))}
        </div>
      )}

      <SeamDivider label="today's outfit" />
    </div>
  )
}

export default Closet