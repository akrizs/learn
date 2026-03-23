import { useState } from 'react'
import './AlignmentSafety.css'

const WORKFLOW_STEPS = [
  { num: 1, label: 'Collect demonstration data' },
  { num: 2, label: 'Train reward model' },
  { num: 3, label: 'Fine-tune with PPO' },
  { num: 4, label: 'Iterate & evaluate' },
]

const PROVIDERS = [
  {
    name: 'OpenAI',
    approaches: ['RLHF', 'Red teaming', 'Content filters'],
  },
  {
    name: 'Anthropic',
    approaches: ['Constitutional AI', 'RLHF', 'Helpful-only training'],
  },
  {
    name: 'Google',
    approaches: ['Safety brainstorming', 'RLHF', 'Grounding techniques'],
  },
]

const TIMELINE_EVENTS = [
  { year: '2017', event: 'RLHF concept introduced for dialogue systems' },
  { year: '2022', event: 'InstructGPT / ChatGPT popularize alignment' },
  { year: '2022', event: 'Constitutional AI proposed by Anthropic' },
  { year: '2024', event: 'Multi-provider safety standards emerge' },
]

type ActiveCard = 'rlhf' | 'cai' | 'hallucination'

interface Technique {
  id: ActiveCard
  title: string
  subtitle: string
  points: string[]
}

// Pure data - no side effects
const TECHNIQUES: Technique[] = [
  {
    id: 'rlhf',
    title: 'RLHF',
    subtitle: 'Reinforcement Learning from Human Feedback',
    points: ['Reward models trained on human preferences', 'PPO (Proximal Policy Optimization) fine-tuning', 'Aligns model with human values'],
  },
  {
    id: 'cai',
    title: 'Constitutional AI',
    subtitle: 'Principles-Based Alignment',
    points: ['Self-critique by the model itself', 'Reduces reliance on human labels', 'Principles guide behavior assessment'],
  },
  {
    id: 'hallucination',
    title: 'Hallucination Mitigation',
    subtitle: 'Factuality Enhancement',
    points: ['Retrieval augmentation (RAG)', 'Confidence calibration', 'Fact-checking mechanisms'],
  },
]

export default function AlignmentSafety() {
  const [activeCard, setActiveCard] = useState<ActiveCard | null>(null)

  return (
    <div className="alignment-safety">
      {/* 3-Column Card Grid */}
      <div className="alignment-safety-cards">
        {TECHNIQUES.map((tech) => (
          <button
            key={tech.id}
            className={`alignment-safety-card ${activeCard === tech.id ? 'active' : ''}`}
            onClick={() => setActiveCard(activeCard === tech.id ? null : tech.id)}
            aria-pressed={activeCard === tech.id}
          >
            <h3 className="card-title">{tech.title}</h3>
            <p className="card-subtitle">{tech.subtitle}</p>
            <ul className="card-points">
              {tech.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* RLHF Workflow Diagram */}
      <div className="alignment-safety-workflow">
        <div className="workflow-header">
          <h3>RLHF Workflow</h3>
          <p>Reinforcement learning optimizes the model based on reward signals</p>
        </div>
        <div className="workflow-diagram">
          <div className="workflow-flow">
            <div className="workflow-node">Human raters</div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-node">Reward model</div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-node">RL optimization</div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-node workflow-node-accent">Aligned model</div>
          </div>
          <div className="workflow-steps">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.num} className="workflow-step">
                <span className="step-num">{step.num}</span>
                <span className="step-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Provider Comparison */}
      <div className="alignment-safety-providers">
        <h3>Provider Safety Approaches</h3>
        <div className="providers-grid">
          {PROVIDERS.map((provider) => (
            <div key={provider.name} className="provider-card">
              <h4>{provider.name}</h4>
              <ul>
                {provider.approaches.map((approach, i) => (
                  <li key={i}>{approach}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Callout Box */}
      <div className="alignment-safety-callout">
        <span className="callout-label">Key Insight</span>
        <p>
          <strong>Trade-off:</strong> Higher safety thresholds may reduce helpfulness.
          Finding the right balance between safety and utility is an ongoing challenge.
        </p>
      </div>

      {/* Timeline */}
      <div className="alignment-safety-timeline">
        <h3>Evolution of Safety Techniques</h3>
        <div className="timeline-track">
          {TIMELINE_EVENTS.map((item, i) => (
            <div key={i} className="timeline-item">
              <span className="timeline-year">{item.year}</span>
              <div className="timeline-dot" />
              <span className="timeline-event">{item.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
