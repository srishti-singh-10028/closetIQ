import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav
      className="flex justify-between items-center px-8 py-4 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bone)' }}
    >
      <Link to="/closet" className="font-display text-xl" style={{ color: 'var(--color-ink)' }}>
        ClosetIQ
      </Link>

      <div className="flex gap-6 text-sm uppercase tracking-widest items-center" style={{ color: 'var(--color-tan)' }}>
        <Link to="/closet">Closet</Link>
        <Link to="/outfit-generator">Generate</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/add-item">Add Item</Link>
        <Link to="/outfit-of-the-day">Today</Link>
        <button onClick={handleLogout} className="uppercase tracking-widest">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar