import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ShowcaseCard({ project }) {
  const { caseStudy } = project
  return (
    <article className="showcase-card">
      <img src={project.image} alt="" loading="lazy" />
      <div className="showcase-card-shade" />
      <div className="showcase-card-content">
        <p className="showcase-label">Solução para operação</p>
        <h3>{project.name}</h3>
        <p className="showcase-problem"><strong>Desafio:</strong> {caseStudy.problem}</p>
        <p className="showcase-solution">{caseStudy.solution}</p>
        <div className="showcase-highlights">{caseStudy.highlights.map(item => <span key={item}>{item}</span>)}</div>
        <div className="showcase-actions">
          <Link to={`/projects/${project.id}`}>Ver estudo de caso <ArrowRight size={14} /></Link>
          {project.deploy && <a href={project.deploy} target="_blank" rel="noopener noreferrer" aria-label={`Abrir demonstração de ${project.name}`}><ExternalLink size={15} /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Ver código de ${project.name}`}><Github size={15} /></a>}
        </div>
      </div>
    </article>
  )
}
