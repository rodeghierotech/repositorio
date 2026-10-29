import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'

function FavoriteButton({ project }) {
  const { toggleFavorite, isFavorite } = useApp()
  const favorite = isFavorite(project.id)

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(project.id)}
      aria-label={favorite ? `Remover ${project.name} dos favoritos` : `Adicionar ${project.name} aos favoritos`}
      aria-pressed={favorite}
      className={`project-favorite condition-favorite ${favorite ? 'selected' : ''}`}
      title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
    </button>
  )
}

function getColumnSpan(index, total) {
  if (index === 0) return 'condition-card--first'
  if (index === 1) return 'condition-card--second'
  if ((total - 4) % 2 === 1 && index >= total - 3) return 'condition-card--thirds'
  if (index === total - 2) return 'condition-card--penultimate'
  if (index === total - 1) return 'condition-card--last'
  return 'condition-card--middle'
}

export default function PortfolioGallery({ projects = [], compact = false }) {
  const gridRef = useRef(null)
  const [visibleCards, setVisibleCards] = useState(() => new Set())

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return undefined

    const cards = grid.querySelectorAll('.condition-card')
    if (!('IntersectionObserver' in window)) {
      setVisibleCards(new Set([...cards].map(card => card.dataset.projectId)))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      setVisibleCards(previous => {
        const next = new Set(previous)
        entries.forEach(entry => {
          if (entry.isIntersecting) next.add(entry.target.dataset.projectId)
          else next.delete(entry.target.dataset.projectId)
        })
        return next
      })
    }, { threshold: 0.15 })

    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [projects])

  return (
    <div ref={gridRef} className="condition-grid" aria-label="Projetos">
      {projects.map((project, index) => (
        <article
          key={project.id ?? project.name}
          data-project-id={project.id}
          className={`condition-card ${getColumnSpan(index, projects.length)}${compact ? ' condition-card--compact' : ''}${visibleCards.has(project.id) ? ' is-visible' : ''}`}
        >
          <Link to={`/projects/${project.id}`} className="condition-card-link" aria-label={`Ver detalhes de ${project.name}`}>
            <img src={project.image} alt="" loading="lazy" />
            <span className="condition-card-shade" aria-hidden="true" />
            <span className="condition-card-copy">
              {compact ? <>
                <strong className="condition-card-title">{project.name}</strong>
                <span className="condition-card-description">{project.description}</span>
                <small className="condition-card-tech">{project.techs.slice(0, 3).join(' · ')}</small>
              </> : <>
                <span className="condition-card-title">{project.name}</span>
                <span className="condition-card-description">{project.description}</span>
                <span className="condition-card-tech">{project.techs.slice(0, 3).join(' · ')}</span>
              </>}
            </span>
            <span className="condition-card-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
          </Link>
          <FavoriteButton project={project} />
        </article>
      ))}
    </div>
  )
}
