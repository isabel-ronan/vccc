import { useEffect, useState } from 'react'

function useTheme() {
  const getInitial = () => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }
  const [theme, setTheme] = useState(getInitial)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return { theme, toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')) }
}

export default function ThemeFab() {
  const { theme, toggle } = useTheme()
  const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
  return (
    <button
      className="theme-fab"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {/* simple icon swap */}
      <span className="theme-fab-icon" aria-hidden>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
