const API_URL = import.meta.env.VITE_API_URL

export async function categorizeItem(imageUrl) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/ai/categorize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ imageUrl }),
  })

  if (!res.ok) {
    throw new Error('Failed to categorize item')
  }

  return res.json()
}