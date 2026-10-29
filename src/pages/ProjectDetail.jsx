import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Heart } from 'lucide-react'
import { projects } from '../data/projects'
import { useApp } from '../context/AppContext'
import ProjectCard from '../components/ProjectCard'
import Seo from '../components/Seo'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useApp()
  const project = projects.find(item => item.id === id)
  const related = projects.filter(item => item.id !== id && item.techs.some(tech => project?.techs.includes(tech))).slice(0, 3)

  useEffect(() => {
    if (!project) return navigate('/projects')
    window.scrollTo(0, 0)
  }, [id, project, navigate])

  if (!project) return null

  const favorite = isFavorite(project.id)
  const isShowcase = project.portfolio === 'showcase' && project.caseStudy

  return (
    <main className="studio-page project-detail-page">
      <Seo title={project.name} description={project.description} />
      <div className="wrap project-detail-wrap">
        <Link to="/projects" className="back-link"><ArrowLeft size={15} /> Todos os projetos</Link>
        <header className="detail-heading">
          <div><p className="detail-kind">Projeto</p><h1>{project.name}</h1></div>
          <button onClick={() => toggleFavorite(project.id)} className={`project-favorite ${favorite ? 'selected' : ''}`} aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /></button>
        </header>
        <p className="detail-summary">{project.description}</p>
        {isShowcase ? <>
          <section className="case-study" aria-label="Resumo da solução">
            <div><p>O desafio</p><h2>{project.caseStudy.problem}</h2></div>
            <div><p>Como a solução organiza</p><h2>{project.caseStudy.solution}</h2></div>
            <div><p>O que entrega</p><ul>{project.caseStudy.highlights.map(item => <li key={item}>{item}</li>)}</ul></div>
          </section>
          {project.longDescription && <details className="technical-details"><summary>Ver detalhes técnicos do projeto</summary><div className="detail-description">{project.longDescription.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></details>}
        </> : project.longDescription && <div className="detail-description">{project.longDescription.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
        <div className="detail-technologies"><h2>Tecnologias usadas</h2><div className="project-tags">{project.techs.map(tech => <Link key={tech} to={`/projects?tech=${encodeURIComponent(tech)}`}>{tech}</Link>)}</div></div>
        <div className="detail-actions">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="button button-dark"><Github size={16} /> Ver código no GitHub <ExternalLink size={13} /></a>
          {project.deploy && <a href={project.deploy} target="_blank" rel="noopener noreferrer" className="button button-green">Abrir projeto <ExternalLink size={13} /></a>}
        </div>
        {related.length > 0 && <section className="related-projects"><div className="related-heading"><h2>Projetos relacionados</h2><Link to="/projects">Ver todos <ArrowRight size={14} /></Link></div><div className="project-list">{related.map(item => <ProjectCard key={item.id} project={item} />)}</div></section>}
      </div>
    </main>
  )
}
