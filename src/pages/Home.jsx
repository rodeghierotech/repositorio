import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, MessageCircle } from 'lucide-react'
import { projects } from '../data/projects'
import DiagnosisDialog from '../components/DiagnosisDialog'
import Seo from '../components/Seo'
import ShowcaseCard from '../components/ShowcaseCard'

const showcaseProjects = projects.filter(project => project.portfolio === 'showcase')
const pointOfSale = showcaseProjects.find(project => project.id === 'pdv-adega-demo')
export default function Home() {
  const [diagnosisOpen, setDiagnosisOpen] = useState(false)
  return (
    <main className="studio-page">
      <Seo title="Sistemas para comércio e serviços" description="Sistemas sob medida para organizar vendas, pedidos, planilhas e rotinas de comércio e serviços." />
      <section className="wrap home-hero" aria-labelledby="hero-title">
        <div className="home-hero-copy">
          <p className="home-eyebrow">RodeghieroTech para comércio e serviços</p>
          <h1 id="hero-title">Tire vendas, pedidos e rotinas do improviso.</h1>
          <p className="home-lede">Entendo onde sua operação trava e transformo esse processo em uma ferramenta simples para sua equipe trabalhar com mais controle.</p>
          <div className="home-actions">
            <button type="button" onClick={() => setDiagnosisOpen(true)} className="button button-green">Contar o que preciso organizar <ArrowRight size={16} /></button>
            <Link to="/projects" className="secondary-link">Ver sistemas que já construí</Link>
          </div>
        </div>

        {pointOfSale && <article className="hero-project-card" aria-label="Projeto demonstrativo de ponto de venda">
          <img src={pointOfSale.image} alt="" />
          <div className="hero-project-overlay" aria-hidden="true" />
          <div className="hero-project-content">
            <span className="hero-project-label">Estudo de caso em destaque</span>
            <div className="hero-project-details">
              <h2>{pointOfSale.name}</h2>
              <p>{pointOfSale.description}</p>
            </div>
            <div className="hero-project-actions">
              <Link to={`/projects/${pointOfSale.id}`} className="hero-project-detail">Ver detalhes <ArrowRight size={15} /></Link>
              {pointOfSale.deploy && <a href={pointOfSale.deploy} target="_blank" rel="noopener noreferrer" className="hero-project-demo">Abrir demonstração <ExternalLink size={14} /></a>}
            </div>
          </div>
        </article>}
      </section>

      <section className="trust-strip" aria-label="Como a RodeghieroTech trabalha">
        <div className="wrap trust-strip-inner">
          <p>Desenvolvimento direto com Henrique</p>
          <p>Sistemas sob medida para a rotina</p>
          <p>Demonstrações funcionais dos projetos</p>
        </div>
      </section>

      <section className="work-section" id="projects">
        <div className="wrap work-inner">
          <div className="work-heading">
            <h2>Soluções para operações reais</h2>
            <p>Exemplos de como vendas, tarefas repetitivas e conteúdos podem sair do controle manual.</p>
          </div>
          <div className="work-gallery">
            <div className="showcase-grid">{showcaseProjects.map(project => <ShowcaseCard key={project.id} project={project} />)}</div>
            <Link to="/projects" className="all-projects">Ver laboratório e todos os projetos <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="diagnostic-section">
        <div className="wrap diagnostic-layout">
          <div className="diagnostic-intro">
            <h2>O que um sistema próprio pode organizar</h2>
            <p>Quando a rotina cresce, pequenas improvisações começam a custar tempo e atenção.</p>
          </div>
          <div className="diagnostic-content">
            <div className="diagnostic-signals">
              <article><h3>Vendas e comandas espalhadas</h3><p>Informações ficam em cadernos, mensagens ou várias planilhas.</p></article>
              <article><h3>Pedidos no WhatsApp</h3><p>É difícil acompanhar o que foi pedido, entregue ou ficou pendente.</p></article>
              <article><h3>Planilhas que não acompanham a operação</h3><p>O controle existe, mas atualizar e conferir tudo virou uma tarefa diária.</p></article>
            </div>
            <button type="button" onClick={() => setDiagnosisOpen(true)} className="diagnostic-cta">Alguma dessas situações parece familiar? <ArrowRight size={15} /></button>
          </div>
        </div>
      </section>

      <section className="contact-band">
        <div className="wrap closing-contact">
          <div><h2>Tem uma rotina que merece um sistema próprio?</h2><p>Conte o que você precisa organizar. A primeira conversa serve para entender o problema e avaliar o próximo passo.</p></div>
          <button type="button" onClick={() => setDiagnosisOpen(true)} className="button button-green">Fazer mini diagnóstico <MessageCircle size={16} /></button>
        </div>
      </section>
      <DiagnosisDialog open={diagnosisOpen} onClose={() => setDiagnosisOpen(false)} />
    </main>
  )
}
