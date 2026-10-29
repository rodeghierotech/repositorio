import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { projects } from '../data/projects'
import PortfolioGallery from '../components/PortfolioGallery'
import SearchFilter from '../components/SearchFilter'
import Seo from '../components/Seo'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [activeTechs, setActiveTechs] = useState([])
  const [sort, setSort] = useState('recent')
  const queryParam = searchParams.get('q') || ''
  const techParamKey = searchParams.getAll('tech').join('|')

  useEffect(() => {
    setQuery(queryParam)
    setActiveTechs(techParamKey ? techParamKey.split('|') : [])
  }, [queryParam, techParamKey])

  const handleQueryChange = (value) => {
    setQuery(value)
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (value) next.set('q', value)
      else next.delete('q')
      return next
    })
  }

  const handleTechsChange = (updater) => {
    const nextTechs = typeof updater === 'function' ? updater(activeTechs) : updater

    setActiveTechs(nextTechs)
    setSearchParams(prevParams => {
      const next = new URLSearchParams(prevParams)
      next.delete('tech')
      nextTechs.forEach(tech => next.append('tech', tech))
      return next
    })
  }


  const filtered = useMemo(() => {
    let result = [...projects]

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techs.some(t => t.toLowerCase().includes(q))
      )
    }

    if (activeTechs.length > 0) {
      result = result.filter(p =>
        activeTechs.every(t => p.techs.includes(t))
      )
    }

    result.sort((a, b) => sort === 'name'
      ? a.name.localeCompare(b.name, 'pt-BR')
      : new Date(b.createdAt) - new Date(a.createdAt))

    return result
  }, [query, activeTechs, sort])
  const showcase = filtered.filter(project => project.portfolio === 'showcase')
  const lab = filtered.filter(project => project.portfolio !== 'showcase')

  return (
    <main className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6">
      <Seo title="Soluções e laboratório" description="Conheça sistemas para comércio e serviços e o laboratório de estudos da RodeghieroTech." />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="projects-banner mb-10">
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-3 break-words">Projetos</h1>
            <p className="text-text-secondary text-sm font-body max-w-lg">Soluções para comércio e serviços, além do laboratório de estudos e experimentos.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <SearchFilter
            query={query}
            setQuery={handleQueryChange}
            activeTechs={activeTechs}
            setActiveTechs={handleTechsChange}
          />
        </div>

        {/* Sort + count */}
        <div className="project-controls mb-6">
          <span className="text-text-secondary text-xs">{filtered.length} projeto{filtered.length !== 1 ? 's' : ''}</span>
          <div className="project-sort">
            {[
              { value: 'recent', label: 'Mais recentes' },
              { value: 'name', label: 'Ordem alfabética' },
            ].map(s => (
              <button
                key={s.value}
                onClick={() => setSort(s.value)}
                className={`sort-option transition-all ${
                  sort === s.value
                    ? 'bg-accent-lime text-bg-primary font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collections */}
        {filtered.length > 0 ? (
          <div className="project-collections">
            {showcase.length > 0 && <section className="project-collection" aria-labelledby="showcase-title">
              <div className="collection-heading"><div><p>Soluções para negócios</p><h2 id="showcase-title">Sistemas para a operação</h2></div><span>{showcase.length} caso{showcase.length !== 1 ? 's' : ''}</span></div>
              <PortfolioGallery projects={showcase} />
            </section>}
            {lab.length > 0 && <section className="project-collection project-lab" aria-labelledby="lab-title">
              <div className="collection-heading"><div><p>Laboratório</p><h2 id="lab-title">Estudos, produtos e experimentos</h2></div><span>{lab.length} projeto{lab.length !== 1 ? 's' : ''}</span></div>
              <p className="collection-description">Projetos acadêmicos, interfaces e explorações técnicas que fazem parte do repertório de desenvolvimento.</p>
              <PortfolioGallery projects={lab} />
            </section>}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-secondary text-sm">Nenhum projeto com esses filtros.</p>
            <p className="text-text-muted text-xs mt-2">Tente outro termo ou remova uma tecnologia.</p>
          </div>
        )}
      </div>
    </main>
  )
}
