import { useState } from 'react'

const categories = ['Top', 'Bottom', 'Dress', 'Shoes', 'Accessories']
const seasons = ['Summer', 'Winter', 'Monsoon', 'All-season']

function AddItem({ onAddItem }) {
  const [imagePreview, setImagePreview] = useState(null)
  const [category, setCategory] = useState('Top')
  const [color, setColor] = useState('')
  const [brand, setBrand] = useState('')
  const [season, setSeason] = useState('Summer')

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      // creates a temporary local URL just for preview — real upload happens later via Cloudinary
      setImagePreview(URL.createObjectURL(file))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newItem = {
      _id: Date.now().toString(), // temporary fake ID until backend assigns a real one
      imageUrl: imagePreview || 'https://placehold.co/300',
      category,
      color,
      brand,
      season,
      style: 'Casual', // placeholder — AI auto-categorization will set this properly later
    }

    onAddItem(newItem)

    // reset form
    setImagePreview(null)
    setColor('')
    setBrand('')
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--color-ink)' }}>
        Add a new item
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md">
        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Photo
        </label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />

        {imagePreview && (
          <img src={imagePreview} alt="preview" className="w-32 h-32 object-cover mb-4 border" style={{ borderColor: 'var(--color-border)' }} />
        )}

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Color
        </label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
          style={{ borderColor: 'var(--color-border)' }}
          placeholder="e.g. Navy blue"
          required
        />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Brand
        </label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
          style={{ borderColor: 'var(--color-border)' }}
          placeholder="e.g. Zara"
          required
        />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Season
        </label>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="w-full border px-3 py-2 mb-6"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {seasons.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <button
          type="submit"
          className="w-full py-2 text-white font-medium"
          style={{ backgroundColor: 'var(--color-ink)' }}
        >
          Add to closet
        </button>
      </form>
    </div>
  )
}

export default AddItem