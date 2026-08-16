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

export async function createOutfit(occasion, items, weatherContext) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/outfits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      occasion,
      items: items.map((item) => item._id),
      weatherContext,
      aiGenerated: false,
    }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to save outfit')
  }

  return res.json()
}

export async function generateAIOutfit(occasion) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/ai/generate-outfit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ occasion }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to generate outfit')
  }

  return res.json()
}
