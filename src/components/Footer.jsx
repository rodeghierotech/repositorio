import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react'
import { developer } from '../data/projects'

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="wrap footer-content">
        <Link to="/" className="studio-brand footer-brand"><img src="/img/logo-henrique-r.png" alt="" /><span>Rodeghiero<span className="brand-tech">Tech</span></span></Link>
        <div className="footer-links"><Link to="/projects">Projetos</Link><Link to="/contact">Contato <ArrowUpRight size={13} /></Link><a href={developer.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a><a href={developer.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15} /></a><a href={developer.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a></div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} RodeghieroTech</span><span>Canguçu, RS</span></div>
    </footer>
  )
}
