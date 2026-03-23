import { useState } from 'react'
import './ScalingLaws.css'

interface ConceptCard {
  title: string
  points: string[]
}

interface ModelSize {
  params: string
  display: string
  flops: string
  capability: string
  unlocked: boolean
}

const SECTION_TAG = 'Foundation'

const CONCEPTS: ConceptCard[] = [
  {
    title: 'Compute Scaling',
    points: [
      'Power law: loss ∝ compute^(-α) — larger models need exponentially more compute',
      'Doubling parameters ≈ 5% improvement in loss (Chinchilla findings)',
      'Training compute grows faster than parameter count due to data requirements',
    ],
  },
  {
    title: 'Emergent Capabilities',
    points: [
      'Abilities appear suddenly at specific model scales — not gradual',
      'Chain-of-thought reasoning emerges around 50-100B parameters',
      'Small models cannot perform tasks that large models do easily',
    ],
  },
  {
    title: 'Chinchilla Scaling',
    points: [
      'Optimal: ~20 tokens per parameter (e.g., 70B params → 1.4T tokens)',
      'Before Chinchilla: 300B tokens for 175B params (overparameterized)',
      'More data + optimal params > huge model + little data',
    ],
  },
]

const MODEL_SIZES: ModelSize[] = [
  { params: '7B', display: '7B', flops: '~1e21', capability: 'Basic NLU', unlocked: true },
  { params: '13B', display: '13B', flops: '~2e21', capability: 'Code generation', unlocked: true },
  { params: '70B', display: '70B', flops: '~1e23', capability: 'Chain-of-thought', unlocked: true },
  { params: '405B', display: '405B', flops: '~6e23', capability: 'Research-grade reasoning', unlocked: false },
]

function ConceptCard({ title, points }: ConceptCard) {
  return (
    <div className="scaling-laws-card">
      <h3 className="scaling-laws-card-title">{title}</h3>
      <ul className="scaling-laws-card-list">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

function ModelComparison() {
  const [selected, setSelected] = useState<string>('70B')

  return (
    <div className="scaling-laws-model-comparison">
      <div className="scaling-laws-model-header">
        <h3 className="scaling-laws-model-title">Parameter Count vs Capabilities</h3>
        <p className="scaling-laws-model-subtitle">Click a model size to explore capability thresholds</p>
      </div>
      <div className="scaling-laws-model-buttons">
        {MODEL_SIZES.map((model) => (
          <button
            key={model.params}
            className={`scaling-laws-model-btn ${selected === model.params ? 'active' : ''} ${model.unlocked ? 'unlocked' : 'locked'}`}
            onClick={() => setSelected(model.params)}
          >
            <span className="scaling-laws-model-param">{model.display}</span>
            <span className="scaling-laws-model-capability">{model.capability}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="scaling-laws-model-detail">
          <div className="scaling-laws-model-detail-label">Selected Model</div>
          <div className="scaling-laws-model-detail-value">{selected} parameters</div>
          <div className="scaling-laws-model-detail-cap">
            {MODEL_SIZES.find((m) => m.params === selected)?.capability}
          </div>
        </div>
      )}
    </div>
  )
}

function DataPoint({ value, label }: { value: string; label: string }) {
  return (
    <div className="scaling-laws-data-point">
      <span className="scaling-laws-data-value">{value}</span>
      <span className="scaling-laws-data-label">{label}</span>
    </div>
  )
}

export default function ScalingLaws() {
  return (
    <div className="scaling-laws">
      <div className="scaling-laws-header">
        <span className="scaling-laws-tag">{SECTION_TAG}</span>
      </div>

      <div className="scaling-laws-cards">
        {CONCEPTS.map((card) => (
          <ConceptCard key={card.title} {...card} />
        ))}
      </div>

      <ModelComparison />

      <div className="scaling-laws-data">
        <DataPoint value="20 tokens/param" label="Chinchilla optimal ratio" />
        <DataPoint value="100B+" label="Emergent reasoning threshold" />
        <DataPoint value="4x" label="Compute per doubling params" />
      </div>
    </div>
  )
}
