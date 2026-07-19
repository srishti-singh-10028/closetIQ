function ClothingCard({ item }) {
  return (
    <div>
      <div
        className="border p-2 mb-2 bg-white"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <img
          src={item.imageUrl}
          alt={item.category}
          className="w-full h-32 object-cover"
          style={{ backgroundColor: '#E8E3D8' }}
        />
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