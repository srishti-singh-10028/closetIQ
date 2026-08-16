const API_URL = import.meta.env.VITE_API_URL

export async function getCurrentWeather() {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/weather`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch weather')
  }

  return res.json()
}