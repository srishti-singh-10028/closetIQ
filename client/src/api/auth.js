const API_URL = import.meta.env.VITE_API_URL

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error('Login failed')
  }

  const data = await res.json()
  localStorage.setItem('token', data.token)
  return data
}

export async function signupUser(name, email, password) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Signup failed')
  }

  return res.json()
}