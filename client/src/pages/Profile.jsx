import { useState, useEffect } from 'react'
import { getCurrentUser, updateCurrentUser } from '../api/users'

function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data)
        setName(data.name)
        setLocation(data.location || '')
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load user:', err)
        setLoading(false)
      })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const updated = await updateCurrentUser(name, location)
      setUser(updated)
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to save profile:', err)
      alert('Failed to save changes: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="p-8" style={{ color: 'var(--color-tan)' }}>Loading your profile...</p>
  }

  if (!user) {
    return <p className="p-8" style={{ color: 'var(--color-tan)' }}>Could not load profile. Try logging in again.</p>
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
          value={user.email}
          disabled
          className="w-full border px-3 py-2 mb-4 bg-gray-100"
          style={{ borderColor: 'var(--color-border)' }}
        />

        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
          City (used for weather-based suggestions)
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={!isEditing}
          placeholder="e.g. Dhanbad, India"
          className="w-full border px-3 py-2 mb-6 disabled:bg-gray-100"
          style={{ borderColor: 'var(--color-border)' }}
        />

        {isEditing && (
          <button
            type="submit"
            disabled={saving}
            className="w-full py-2 text-white font-medium disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-ink)' }}
          >
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        )}
      </form>

      {!isEditing && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="w-full max-w-md py-2 font-medium border mt-4"
          style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
        >
          Edit profile
        </button>
      )}
    </div>
  )
}

export default Profile