function ClothingCard({ item, onDelete }) {
  return (
    <div>
      <div
        className="border p-2 mb-2 bg-white relative"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <img
          src={item.imageUrl}
          alt={item.category}
          className="w-full h-32 object-cover"
          style={{ backgroundColor: '#E8E3D8' }}
        />
        {onDelete && (
          <button
            onClick={() => onDelete(item._id)}
            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-white text-xs"
            style={{ color: 'var(--color-tan)', border: '1px solid var(--color-border)' }}
            aria-label="Delete item"
          >
            ×
          </button>
        )}
      </div>
      <div
        className="text-[10px] uppercase tracking-widest mb-1"
        style={{ color: 'var(--color-tan)' }}
      >
        {item.category} — {item.color}
      </div>
      <div className="font-display text-base" style={{ color: 'var(--color-ink)' }}>
        {item.subCategory || item.brand}
      </div>
    </div>
  )
}

export default ClothingCard