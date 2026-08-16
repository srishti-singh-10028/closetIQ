import { useState } from 'react'
import { addClosetItem, uploadImage } from '../api/closet'
import { categorizeItem } from '../api/ai'

const categories = ['top', 'bottom', 'dress', 'footwear', 'outerwear', 'accessory']
const seasons = ['Summer', 'Winter', 'Monsoon', 'All-season']

function AddItem({ onAddItem }) {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [category, setCategory] = useState('top')
  const [subCategory, setSubCategory] = useState('')
  const [color, setColor] = useState('')
  const [season, setSeason] = useState('Summer')
  const [tags, setTags] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [categorizing, setCategorizing] = useState(false)

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function handleAutoFill() {
    if (!imageFile) return
    setCategorizing(true)
    try {
      const { imageUrl } = await uploadImage(imageFile)
      const result = await categorizeItem(imageUrl)
      setCategory(result.category || 'top')
      setSubCategory(result.subCategory || '')
      setColor(result.color || '')
      if (result.season && result.season.length > 0) {
        setSeason(result.season[0].charAt(0).toUpperCase() + result.season[0].slice(1))
      }
      if (result.tags && result.tags.length > 0) {
        setTags(result.tags.join(', '))
      }
    } catch (err) {
      console.error('Auto-categorize error:', err)
      alert('Could not auto-fill details — you can still fill the form manually.')
    } finally {
      setCategorizing(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const newItem = await addClosetItem(imageFile, category, subCategory, color, season, tags)
      onAddItem(newItem)
      alert('Item added successfully!')
      setImageFile(null)
      setImagePreview(null)
      setSubCategory('')
      setColor('')
      setTags('')
    } catch (err) {
      console.error('Add item error:', err)
      alert('Failed to add item: ' + err.message)
    } finally {
      setSubmitting(false)
    }
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
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" required />

        {imagePreview && (
          <img src={imagePreview} alt="preview" className="w-32 h-32 object-cover mb-4 border" style={{ borderColor: 'var(--color-border)' }} />
        )}

        {imageFile && (
          <button
            type="button"
            onClick={handleAutoFill}
            disabled={categorizing}
            className="w-full py-2 mb-6 font-medium border disabled:opacity-50"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
          >
            {categorizing ? 'Analyzing photo...' : 'Auto-fill from photo'}
          </button>
        )}

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Category
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border px-3 py-2 mb-4" style={{ borderColor: 'var(--color-border)' }}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Sub-category (e.g. T-shirt, Jeans)
        </label>
        <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full border px-3 py-2 mb-4" style={{ borderColor: 'var(--color-border)' }} placeholder="e.g. T-shirt" required />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Color
        </label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="w-full border px-3 py-2 mb-4" style={{ borderColor: 'var(--color-border)' }} placeholder="e.g. Navy blue" required />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Season
        </label>
        <select value={season} onChange={(e) => setSeason(e.target.value)} className="w-full border px-3 py-2 mb-4" style={{ borderColor: 'var(--color-border)' }}>
          {seasons.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Tags (comma-separated, optional)
        </label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border px-3 py-2 mb-6" style={{ borderColor: 'var(--color-border)' }} placeholder="e.g. casual, summer" />

        <button type="submit" disabled={submitting} className="w-full py-2 text-white font-medium disabled:opacity-50" style={{ backgroundColor: 'var(--color-ink)' }}>
          {submitting ? 'Uploading...' : 'Add to closet'}
        </button>
      </form>
    </div>
  )
}

export default AddItem