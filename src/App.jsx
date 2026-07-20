import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

import Inicio from './pages/Inicio'
import Acerca from './pages/Acerca'
import Contacto from './pages/Contacto'

import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
    </>
  )
}