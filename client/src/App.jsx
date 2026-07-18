import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Closet from './pages/Closet'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import OutfitGenerator from './pages/OutfitGenerator'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/outfit-generator" element={<OutfitGenerator />} />
        <Route path="/history" element={<h1 className="text-3xl font-bold text-center pt-10">History Page</h1>} />
        <Route path="/profile" element={<h1 className="text-3xl font-bold text-center pt-10">Profile Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App