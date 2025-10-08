import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function useTheme() {
  const getInitial = () => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light' : 'dark'
  }
  const [theme, setTheme] = useState(getInitial)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return { theme, toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')) }
}

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return
      if (menuRef.current?.contains(e.target)) return
      if (btnRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const onEsc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  const linkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--text)' : 'var(--muted)',
    fontWeight: isActive ? 700 : 400,
  })

  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <Link to="/">Chăm Sóc Bệnh Nhân Ung Thư</Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          ref={btnRef}
          className={`hamburger ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(o => !o)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Menu */}
        <nav
          id="main-menu"
          ref={menuRef}
          className={`menu ${open ? 'open' : ''}`}
          aria-label="Main"
        >
          <NavLink className="navLinks" to="/knowledge" style={linkStyle}>Knowledge</NavLink>
          <NavLink className="navLinks" to="/seekingSupport" style={linkStyle}>Seeking Support</NavLink>
          <NavLink className="navLinks" to="/dailyCare" style={linkStyle}>Daily Care</NavLink>
          <NavLink className="navLinks" to="/skillsTraining" style={linkStyle}>Skills Training</NavLink>
          <NavLink className="navLinks" to="/traditionalMedicine" style={linkStyle}>Traditional Medicine</NavLink>
          <NavLink className="navLinks" to="/nutrition" style={linkStyle}>Nutrition</NavLink>
          <NavLink className="navLinks" to="/psychologicalSupport" style={linkStyle}>Psychological Support</NavLink>
        </nav>
      </div>
    </header>
  )
}

