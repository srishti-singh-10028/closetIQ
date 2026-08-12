import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    loginUser(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token)
        navigate('/closet')
      })
      .catch((err) => {
        console.error('Login error:', err)
        alert('Login failed — check your email and password, or check console for details')
      })
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bone)' }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 border w-full max-w-sm"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <h1 className="font-display text-3xl mb-6 text-center" style={{ color: 'var(--color-ink)' }}>
          Log in
        </h1>

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
          style={{ borderColor: 'var(--color-border)' }}
          placeholder="you@example.com"
          required
        />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-6"
          style={{ borderColor: 'var(--color-border)' }}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          className="w-full py-2 font-medium text-white"
          style={{ backgroundColor: 'var(--color-ink)' }}
        >
          Log in
        </button>

        <p className="text-sm text-center mt-4" style={{ color: 'var(--color-tan)' }}>
          Don't have an account? <Link to="/signup" className="underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login