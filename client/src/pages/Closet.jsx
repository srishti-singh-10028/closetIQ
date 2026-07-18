import { mockCloset } from '../data/mockCloset'
import ClothingCard from '../components/ClothingCard'
import SeamDivider from '../components/SeamDivider'

function Closet() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <div
        className="flex justify-between items-baseline border-b pb-4 mb-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span className="font-display text-2xl" style={{ color: 'var(--color-ink)' }}>
          ClosetIQ
        </span>
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--color-tan)' }}
        >
          Your closet — {mockCloset.length} items
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {mockCloset.map((item) => (
          <ClothingCard key={item._id} item={item} />
        ))}
      </div>

      <SeamDivider label="today's outfit" />
    </div>
  )
}

export default Closet