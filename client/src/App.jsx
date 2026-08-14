import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Closet from './pages/Closet'
import OutfitGenerator from './pages/OutfitGenerator'
import AddItem from './pages/AddItem'
import Profile from './pages/Profile'
import History from './pages/History'
import { getClosetItems, deleteClosetItem } from './api/closet'
import OutfitOfTheDay from './pages/OutfitOfTheDay'

function AppContent() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/' || location.pathname === '/signup'

  const [closet, setCloset] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setCloset([])
      setLoading(false)
      return
    }

    setLoading(true)
    getClosetItems()
      .then((data) => {
        setCloset(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load closet:', err)
        setCloset([])
        setLoading(false)
      })
  }, [location.pathname])

  function addItem(newItem) {
    setCloset((prev) => [...prev, newItem])
  }

  async function handleDeleteItem(id) {
    try {
      await deleteClosetItem(id)
      setCloset((prev) => prev.filter((item) => item._id !== id))
    } catch (err) {
      console.error('Failed to delete item:', err)
      alert('Failed to delete item: ' + err.message)
    }
  }

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/closet" element={<Closet closet={closet} loading={loading} onDeleteItem={handleDeleteItem} />} />
        <Route path="/outfit-generator" element={<OutfitGenerator closet={closet} />} />
        <Route path="/add-item" element={<AddItem onAddItem={addItem} />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/outfit-of-the-day" element={<OutfitOfTheDay closet={closet} loading={loading} />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App