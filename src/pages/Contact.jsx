import { useState } from 'react'
import { ArrowUpRight, Github, Instagram, Mail, MessageCircle } from 'lucide-react'
import { developer } from '../data/projects'
import DiagnosisDialog from '../components/DiagnosisDialog'
import Seo from '../components/Seo'

export default function Contact() {
  const [diagnosisOpen, setDiagnosisOpen] = useState(false)
  return (
    <main className="studio-page contact-page">
      <Seo title="Diagnóstico da sua rotina" description="Conte como sua operação funciona e descubra se um sistema sob medida faz sentido para seu negócio." />
      <div className="wrap contact-layout">
        <section className="contact-intro">
          <p className="contact-location">Desenvolvimento independente · {developer.location}</p>
          <h1>Vamos entender se um sistema resolve sua rotina.</h1>
          <p>Me conte onde o processo trava hoje. Em três perguntas, a conversa no WhatsApp já começa com o contexto certo.</p>
          <button type="button" onClick={() => setDiagnosisOpen(true)} className="button button-green"><MessageCircle size={17} /> Fazer mini diagnóstico <ArrowUpRight size={15} /></button>
          <p className="contact-hint">Você escolhe o que quer informar antes de abrir a conversa.</p>
        </section>
        <aside className="contact-alternatives" aria-label="Outras formas de contato">
          <h2>Prefere outro canal?</h2>
          <a href={`mailto:${developer.email}`}><Mail size={17} /><span><small>E-mail</small><strong>{developer.email}</strong></span><ArrowUpRight size={14} /></a>
          <a href={developer.github} target="_blank" rel="noopener noreferrer"><Github size={17} /><span><small>GitHub</small><strong>Ver projetos e código</strong></span><ArrowUpRight size={14} /></a>
          <a href={developer.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17} /><span><small>Instagram</small><strong>@rodeghierotech</strong></span><ArrowUpRight size={14} /></a>
        </aside>
      </div>
      <DiagnosisDialog open={diagnosisOpen} onClose={() => setDiagnosisOpen(false)} />
    </main>
  )
}
