const API_URL = import.meta.env.VITE_API_URL

export async function getOutfitHistory() {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/outfits`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch outfit history')
  }

  return res.json()
}