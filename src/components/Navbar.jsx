import { NavLink } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Inicio
        </NavLink>
        <NavLink to="/acerca" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Acerca
        </NavLink>
        <NavLink to="/contacto" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Contacto
        </NavLink>
      </nav>
    </header>
  )
}