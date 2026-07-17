import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Login attempt:', { email, password })
    // TODO: replace with real API call once backend auth is ready
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="you@example.com"
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white rounded py-2 font-medium hover:bg-gray-800"
        >
          Log in
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account? <a href="/signup" className="underline">Sign up</a>
        </p>
      </form>
    </div>
  )
}

export default Login