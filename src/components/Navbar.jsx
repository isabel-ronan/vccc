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
  const [open, setOpen] = useState(false)
  const [openDD, setOpenDD] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const btnRef = useRef(null)
  const ddRef = useRef(null)

  useEffect(() => { setOpen(false); setOpenDD(false) }, [location.pathname])

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return
      if (menuRef.current?.contains(e.target)) return
      if (btnRef.current?.contains(e.target)) return
      setOpen(false)
      setOpenDD(false)
    }
    const onEsc = (e) => e.key === 'Escape' && (setOpen(false), setOpenDD(false))
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

  const psychologicalActivity = ({
    color: location.pathname.startsWith('/cancer') || location.pathname.startsWith('/treatment') ? 'var(--text)' : 'var(--muted)',
    fontWeight: location.pathname.startsWith('/cancer') || location.pathname.startsWith('/treatment') ? 700 : 400,
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




          <NavLink className="navLinks" to="/cancer" style={linkStyle} onClick={() => { setOpen(false); setOpenDD(false); }}>Kiến Thức</NavLink>
          <NavLink className="navLinks" to="/seekingSupport" style={linkStyle} onClick={() => { setOpen(false); setOpenDD(false); }}>Tìm Kiếm Hỗ Trợ</NavLink>
          <NavLink className="navLinks" to="/dailyCare" style={linkStyle} onClick={() => { setOpen(false); setOpenDD(false); }}>Chăm Sóc Hàng Ngày</NavLink>
          <NavLink className="navLinks" to="/skillsTraining" style={linkStyle} onClick={() => { setOpen(false); setOpenDD(false); }}>Skills Training</NavLink>
          <NavLink className="navLinks" to="/traditionalMedicine" style={linkStyle} onClick={() => { setOpen(false); setOpenDD(false); }}>Traditional Medicine</NavLink>
          <NavLink className="navLinks" to="/nutrition" style={linkStyle} onClick={() => { setOpen(false); setOpenDD(false); }}>Nutrition</NavLink>

          {/* Knowledge dropdown */}
          <div
            className={`dropdown ${openDD ? 'open' : ''}`}
            onMouseEnter={() => setOpenDD(true)}
            onMouseLeave={() => setOpenDD(false)}
          >
            {/* The button controls the submenu (good for mobile / keyboard) */}
            <button
              className={`dropdown-trigger`}
              aria-haspopup="menu"
              aria-expanded={openDD}
              aria-controls="knowledge-submenu"
              onClick={() => setOpenDD(v => !v)}
              style={psychologicalActivity}
            >
              Psychological Support ▾
            </button>
            <div
              id="knowledge-submenu"
              role="menu"
              ref={ddRef}
              className="submenu"
            >
              <NavLink role="menuitem" to="/selfCare" className="submenu-item" onClick={() => { setOpen(false); setOpenDD(false); }}>Bài Tập Thở"</NavLink>
              <NavLink role="menuitem" to="/" className="submenu-item" onClick={() => { setOpen(false); setOpenDD(false); }}>Placeholder Example</NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

