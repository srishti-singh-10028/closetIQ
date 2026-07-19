const API_URL = import.meta.env.VITE_API_URL

export async function getClosetItems() {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/closet`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch closet items')
  }

  return res.json()
}

export async function addClosetItem(imageFile, category, subCategory, color, season, tags) {
  const token = localStorage.getItem('token')

  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append('category', category)
  formData.append('subCategory', subCategory)
  formData.append('color', color)
  formData.append('season', season)
  formData.append('tags', tags)

  const res = await fetch(`${API_URL}/api/closet`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to add item')
  }

  return res.json()
}