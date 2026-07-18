import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav
      className="flex justify-between items-center px-8 py-4 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bone)' }}
    >
      <Link to="/closet" className="font-display text-xl" style={{ color: 'var(--color-ink)' }}>
        ClosetIQ
      </Link>

      <div className="flex gap-6 text-sm uppercase tracking-widest" style={{ color: 'var(--color-tan)' }}>
        <Link to="/closet">Closet</Link>
        <Link to="/outfit-generator">Generate</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  )
}

export default Navbar