import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Heart, Menu, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LiquidNavbar, NimbusIcons } from './ui/liquid-glass-navbar'

const navigationItems = [
  { label: 'Início', to: '/', icon: NimbusIcons.home, fx: 'glow' },
  { label: 'Projetos', to: '/projects', icon: NimbusIcons.globe, fx: 'spin' },
  { label: 'Contato', to: '/contact', icon: NimbusIcons.user, fx: 'wave' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { favorites } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const activeIndex = Math.max(0, navigationItems.findIndex(item => item.to === location.pathname))

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <header className={`studio-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="studio-nav wrap">
        <Link to="/" className="studio-brand" aria-label="RodeghieroTech — início">
          <img src="/img/logo-henrique-r.png" alt="" />
          <span>Rodeghiero<span className="brand-tech">Tech</span></span>
        </Link>
        <div className="studio-nav-links">
          <LiquidNavbar
            items={navigationItems}
            active={activeIndex}
            tone="dark"
            sound={false}
            onChange={(_, item) => navigate(item.to)}
          />
        </div>
        <div className="studio-nav-end">
          <Link to="/favorites" className="favorite-link" aria-label={`Favoritos (${favorites.length})`}><Heart size={15} />{favorites.length > 0 && <span>{favorites.length}</span>}</Link>
          <Link to="/contact" className="nav-cta"><span>Vamos conversar</span><ArrowUpRight size={15} /></Link>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </nav>
      {menuOpen && <div className="mobile-nav"><NavLink to="/" end>Início</NavLink><NavLink to="/projects">Projetos</NavLink><NavLink to="/favorites">Favoritos {favorites.length > 0 && `(${favorites.length})`}</NavLink><NavLink to="/contact">Contato</NavLink></div>}
    </header>
  )
}
