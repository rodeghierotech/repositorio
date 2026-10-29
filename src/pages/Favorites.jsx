import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import { useApp } from '../context/AppContext'
import ProjectCard from '../components/ProjectCard'

export default function Favorites() {
  const { favorites } = useApp()
  const saved = projects.filter(p => favorites.includes(p.id))

  return (
    <main className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-3 flex flex-wrap items-center gap-3 break-words">
            Projetos salvos
            {saved.length > 0 && (
              <span className="text-text-muted font-mono text-base">({saved.length})</span>
            )}
          </h1>
        </div>

        {saved.length === 0 ? (
          <div className="py-24 text-center">
            <Heart size={40} className="text-text-muted mx-auto mb-5" />
            <p className="text-text-secondary text-sm mb-2">Você ainda não salvou nenhum projeto.</p>
            <p className="text-text-muted text-xs mb-8">Use o coração ao lado de um projeto para guardá-lo aqui.</p>
            <Link to="/projects" className="btn-primary px-6 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
              Explorar projetos <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="project-list">
            {saved.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        )}
      </div>
    </main>
  )
}
