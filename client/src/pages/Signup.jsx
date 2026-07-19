import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signupUser } from '../api/auth'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
  e.preventDefault()
  signupUser(name, email, password)
    .then((data) => {
      console.log('Signed up:', data)
      alert('Signup successful! Now try logging in.')
    })
    .catch((err) => {
      console.error('Signup error:', err)
      alert('Signup failed: ' + err.message)
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
          Create account
        </h1>

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
          style={{ borderColor: 'var(--color-border)' }}
          placeholder="Srishti Singh"
          required
        />

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
          Sign up
        </button>

        <p className="text-sm text-center mt-4" style={{ color: 'var(--color-tan)' }}>
          Already have an account? <Link to="/" className="underline">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup