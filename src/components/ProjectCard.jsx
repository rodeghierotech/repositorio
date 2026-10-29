import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ProjectCard = memo(function ProjectCard({ project }) {
  const { toggleFavorite, isFavorite } = useApp()
  const favorite = isFavorite(project.id)

  return (
    <article className="project-entry">
      <div className="project-entry-heading">
        <div>
          {project.id === 'pdv-adega-demo' && <p className="project-kind">Demonstração</p>}
          <Link to={`/projects/${project.id}`}><h3>{project.name}</h3></Link>
        </div>
        <button onClick={() => toggleFavorite(project.id)} aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} className={`project-favorite ${favorite ? 'selected' : ''}`} title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
          <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <p className="project-summary">{project.description}</p>
      <div className="project-entry-bottom">
        <div className="project-tags">{project.techs.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div>
        <Link to={`/projects/${project.id}`} className="project-read">Detalhes <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  )
})

export default ProjectCard
