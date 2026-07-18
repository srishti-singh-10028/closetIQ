import { useState } from 'react'
import { mockUser } from '../data/mockUser'

function Profile() {
  const [name, setName] = useState(mockUser.name)
  const [city, setCity] = useState(mockUser.location.city)
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setIsEditing(false)
    // TODO: replace with PATCH /api/users/me once backend auth exists
    console.log('Saved profile:', { name, city })
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bone)' }}>
      <h1 className="font-display text-2xl mb-6" style={{ color: 'var(--color-ink)' }}>
        Your profile
      </h1>

      <form
        onSubmit={handleSave}
        className="bg-white p-8 border max-w-md"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
          className="w-full border px-3 py-2 mb-4 disabled:bg-gray-100"
          style={{ borderColor: 'var(--color-border)' }}
        />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          Email
        </label>
        <input
          type="email"
          value={mockUser.email}
          disabled
          className="w-full border px-3 py-2 mb-4 bg-gray-100"
          style={{ borderColor: 'var(--color-border)' }}
        />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          City (used for weather-based suggestions)
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!isEditing}
          className="w-full border px-3 py-2 mb-6 disabled:bg-gray-100"
          style={{ borderColor: 'var(--color-border)' }}
        />

      {isEditing && (
          <button
            type="submit"
            className="w-full py-2 text-white font-medium"
            style={{ backgroundColor: 'var(--color-ink)' }}
          >
            Save changes
          </button>
        )}
      </form>

     {!isEditing && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="w-full max-w-md py-2 font-medium border mt-0"
          style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
        >
          Edit profile
        </button>
      )}
    </div>
  )
}

export default Profile