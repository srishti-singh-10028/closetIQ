const API_URL = import.meta.env.VITE_API_URL

export async function getCurrentUser() {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  return res.json()
}

export async function updateCurrentUser(name, location) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}/api/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, location }),
  })

  if (!res.ok) {
    throw new Error('Failed to update user')
  }

  return res.json()
}