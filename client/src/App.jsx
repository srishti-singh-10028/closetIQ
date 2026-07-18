import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Closet from './pages/Closet'
import OutfitGenerator from './pages/OutfitGenerator'
import AddItem from './pages/AddItem'
import { mockCloset } from './data/mockCloset'

function App() {
  const [closet, setCloset] = useState(mockCloset)

  function addItem(newItem) {
    setCloset((prev) => [...prev, newItem])
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/closet" element={<Closet closet={closet} />} />
        <Route path="/outfit-generator" element={<OutfitGenerator closet={closet} />} />
        <Route path="/add-item" element={<AddItem onAddItem={addItem} />} />
        <Route path="/history" element={<h1 className="text-3xl font-bold text-center pt-10">History Page</h1>} />
        <Route path="/profile" element={<h1 className="text-3xl font-bold text-center pt-10">Profile Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App