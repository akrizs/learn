import { Link } from 'react-router-dom'
import { FlaskConical, Terminal, Calculator, Pencil, Code, GitBranch, MessageSquare, ArrowRight } from 'lucide-react'
import './GTPPractice.css'

const PRACTICES = [
  {
    icon: Terminal,
    title: 'API Experiments',
    description: 'Test different prompts and parameters with live API calls',
    section: 'Prompting',
    path: '/gpt#prompting',
  },
  {
    icon: Calculator,
    title: 'Cost Calculator',
    description: 'Estimate API costs for different models and token volumes',
    section: 'Infrastructure',
    path: '/gpt#calculator',
  },
  {
    icon: Pencil,
    title: 'Prompt Templates',
    description: 'Learn effective prompting with ready-to-use templates',
    section: 'Prompting',
    path: '/gpt#prompting',
  },
  {
    icon: Code,
    title: 'Code Generation',
    description: 'Practice with real code completion examples',
    section: 'Code Models',
    path: '/gpt#code-models',
  },
  {
    icon: GitBranch,
    title: 'RAG Builder',
    description: 'Build a retrieval-augmented generation pipeline step by step',
    section: 'RAG',
    path: '/gpt#rag',
  },
  {
    icon: MessageSquare,
    title: 'Chat History',
    description: 'Understand context management with multi-turn conversations',
    section: 'Memory',
    path: '/gpt#memory',
  },
]

export default function GTPPractice() {
  return (
    <div className="practice-page">
      <div className="practice-hero">
        <div className="practice-badge">
          <FlaskConical size={14} />
          Practice Mode
        </div>
        <h1>Learn by Doing</h1>
        <p>
          Hands-on exercises and interactive tools to practice what you learn.
          Test your knowledge with real-world scenarios.
        </p>
      </div>

      {/* Practice Cards */}
      <div className="practice-grid">
        {PRACTICES.map((practice, i) => {
          const Icon = practice.icon
          return (
            <a
              key={i}
              href={`/#${practice.path.replace('/gpt', '')}`}
              className="practice-card"
            >
              <div className="practice-card-header">
                <div className="practice-icon">
                  <Icon size={24} />
                </div>
                <span className="practice-section">{practice.section}</span>
              </div>
              <h3>{practice.title}</h3>
              <p>{practice.description}</p>
              <div className="practice-card-footer">
                <span>Try it</span>
                <ArrowRight size={14} />
              </div>
            </a>
          )
        })}
      </div>

      {/* Back Link */}
      <div className="practice-back">
        <Link to="/gpt" className="back-link">
          ← Back to Learning
        </Link>
      </div>
    </div>
  )
}
