import { useEffect, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { buildDiagnosticWhatsappUrl } from '../data/projects'

const fields = [
  {
    name: 'routine',
    label: 'O que você quer organizar?',
    options: ['Vendas e atendimento', 'Pedidos e entregas', 'Cadastro e controle de clientes', 'Planilhas e arquivos', 'Outra rotina'],
  },
  {
    name: 'bottleneck',
    label: 'Onde a operação mais trava?',
    options: ['Informações espalhadas', 'Retrabalho manual', 'Acompanhar pedidos ou status', 'Falta de visão do processo', 'Outro gargalo'],
  },
  {
    name: 'currentTool',
    label: 'Como você controla isso hoje?',
    options: ['Planilhas', 'WhatsApp', 'Papel ou caderno', 'Ferramentas separadas', 'Outro método'],
  },
]

export default function DiagnosisDialog({ open, onClose }) {
  const [answers, setAnswers] = useState({ routine: '', bottleneck: '', currentTool: '' })

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = event => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open, onClose])

  if (!open) return null

  const complete = Object.values(answers).every(Boolean)
  const submit = event => {
    event.preventDefault()
    if (!complete) return
    window.open(buildDiagnosticWhatsappUrl(answers), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="diagnosis-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="diagnosis-dialog" role="dialog" aria-modal="true" aria-labelledby="diagnosis-title" onMouseDown={event => event.stopPropagation()}>
        <button className="diagnosis-close" type="button" onClick={onClose} aria-label="Fechar diagnóstico"><X size={18} /></button>
        <p className="diagnosis-kicker">Primeiro passo</p>
        <h2 id="diagnosis-title">Vamos entender sua rotina.</h2>
        <p>Responda três perguntas rápidas. A conversa no WhatsApp já abre com esse contexto.</p>
        <form onSubmit={submit}>
          {fields.map(field => (
            <label key={field.name}>
              <span>{field.label}</span>
              <select value={answers[field.name]} onChange={event => setAnswers(current => ({ ...current, [field.name]: event.target.value }))} required>
                <option value="">Selecione uma opção</option>
                {field.options.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <button className="button button-green diagnosis-submit" type="submit" disabled={!complete}>Abrir conversa com contexto <ArrowRight size={16} /></button>
        </form>
      </section>
    </div>
  )
}
