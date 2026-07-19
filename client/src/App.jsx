import { useState ,useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Closet from './pages/Closet'
import OutfitGenerator from './pages/OutfitGenerator'
import AddItem from './pages/AddItem'
import Profile from './pages/Profile'
import History from './pages/History'
import { getClosetItems } from './api/closet'

function App() {
  const [closet, setCloset] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClosetItems()
      .then((data) => {  //runs if it succeeds
        setCloset(data)
        setLoading(false)
      })
      .catch((err) => {   // runs if something fails (like a network error or bad token)
        console.error('Failed to load closet:', err)
        setLoading(false)
      })
  }, [])

  function addItem(newItem) {
    setCloset((prev) => [...prev, newItem])
  }


  function addItem(newItem) {
    setCloset((prev) => [...prev, newItem])
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/closet" element={<Closet closet={closet} loading={loading} />} />
        <Route path="/outfit-generator" element={<OutfitGenerator closet={closet} />} />
        <Route path="/add-item" element={<AddItem onAddItem={addItem} />} />
        <Route path="/history" element={<History closet={closet} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App