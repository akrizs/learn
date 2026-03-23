import { BookOpen, CheckCircle, Compass, GraduationCap, Rocket, Clock, Star } from 'lucide-react'
import './QuickStart.css'

const LEARNING_PHASES = [
  { tag: 'Foundation 01', title: 'Foundation', desc: 'Core concepts of AI & LLMs', icon: BookOpen },
  { tag: 'Foundation 02', title: 'Architecture', desc: 'Transformer models & training', icon: Star },
  { tag: 'Foundation 03', title: 'Knowledge', desc: 'RAG, embeddings & context', icon: Compass },
  { tag: 'Foundation 04', title: 'Evaluation', desc: 'Metrics, benchmarks & safety', icon: GraduationCap },
  { tag: 'Foundation 05', title: 'Practical Skills', desc: 'Prompt engineering & tools', icon: CheckCircle },
  { tag: 'Foundation 06', title: 'Deployment', desc: 'Production, costs & scaling', icon: Rocket },
]

const PREREQUISITES = [
  'Basic programming knowledge (Python helpful)',
  'Understanding of fundamental ML concepts',
  'Familiarity with APIs and REST services',
  'Curiosity about AI capabilities & limitations',
]

const HOW_TO_USE = [
  'Start from Foundation and progress sequentially',
  'Each phase builds on previous concepts',
  'Try interactive examples in each section',
  'Use the sidebar for quick navigation',
  'Bookmark topics you want to revisit',
]

const WHAT_YOU_LEARN = [
  'How LLMs work under the hood',
  'Effective prompt engineering techniques',
  'Building retrieval-augmented systems',
  'Evaluating model performance',
  'Deploying AI applications responsibly',
  'Cost optimization strategies',
]

export default function QuickStart() {
  return (
    <div className="quickstart">
      {/* Header */}
      <div className="quickstart-header">
        <span className="quickstart-tag">Getting Started</span>
        <h2>Welcome to Your AI Learning Path</h2>
        <p className="quickstart-desc">
          A structured journey from fundamentals to production-ready AI applications.
        </p>
      </div>

      {/* Learning Path Grid */}
      <div className="learning-path">
        <h3>Learning Path</h3>
        <div className="phases-grid">
          {LEARNING_PHASES.map((phase, i) => (
            <div key={i} className="phase-card">
              <span className="phase-tag">{phase.tag}</span>
              <div className="phase-icon">
                <phase.icon size={20} />
              </div>
              <h4>{phase.title}</h4>
              <p>{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="info-grid">
        {/* Prerequisites */}
        <div className="info-card prerequisites">
          <div className="info-card-header">
            <Clock size={18} />
            <h4>Prerequisites</h4>
          </div>
          <ul>
            {PREREQUISITES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* How to Use */}
        <div className="info-card how-to-use">
          <div className="info-card-header">
            <Compass size={18} />
            <h4>How to Use This Guide</h4>
          </div>
          <ul>
            {HOW_TO_USE.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* What You'll Learn */}
        <div className="info-card what-learn">
          <div className="info-card-header">
            <BookOpen size={18} />
            <h4>What You'll Learn</h4>
          </div>
          <ul>
            {WHAT_YOU_LEARN.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
