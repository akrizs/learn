import './TrainingPipeline.css'

interface CardData {
  title: string
  points: string[]
}

interface TimelineStage {
  number: number
  label: string
  duration: string
}

interface KeyConcept {
  term: string
  definition: string
}

const CARDS: CardData[] = [
  {
    title: 'Pre-training',
    points: [
      'Next token prediction on massive datasets (trillions of tokens)',
      'Self-supervised learning — no human labels needed',
      'Model learns language, facts, and reasoning from raw text',
    ],
  },
  {
    title: 'Post-training',
    points: [
      'SFT (Supervised Fine-Tuning) on curated examples',
      'RLHF (Reinforcement Learning from Human Feedback)',
      'DPO (Direct Preference Optimization)',
    ],
  },
  {
    title: 'Scaling Laws',
    points: [
      'Chinchilla scaling — compute-optimal training',
      'Emergent capabilities at certain model sizes',
      'More parameters + more data = better capabilities',
    ],
  },
]

const TIMELINE: TimelineStage[] = [
  { number: 1, label: 'Data Collection', duration: 'Web scrapes, books, code' },
  { number: 2, label: 'Data Preparation', duration: 'Filtering, deduplication' },
  { number: 3, label: 'Pre-training', duration: 'Next token prediction, ~weeks/months' },
  { number: 4, label: 'Post-training', duration: 'SFT, RLHF, ~days/weeks' },
  { number: 5, label: 'Evaluation', duration: 'Benchmarks & red teaming' },
]

const KEY_CONCEPTS: KeyConcept[] = [
  {
    term: 'Next Token Prediction',
    definition:
      'The model learns by predicting the next word in a sequence. Given "The cat sat on the __", it predicts "mat". This simple objective, applied to trillions of tokens, produces emergent reasoning.',
  },
  {
    term: 'Emergent Capabilities',
    definition:
      'Unplanned abilities that appear at certain scale — like reasoning, chain-of-thought, or coding — even though they were never explicitly trained. Small models can\'t do these tasks; large ones suddenly can.',
  },
  {
    term: 'Alignment Tax',
    definition:
      'The cost of aligning a model to human preferences (via RLHF) sometimes reduces its capability on other tasks. The model becomes more helpful but may lose some raw performance.',
  },
]

const DATA_POINTS = [
  { value: '~300B', label: 'tokens in GPT-3 training' },
  { value: 'Trillions', label: 'tokens in modern model training' },
  { value: '1000x', label: 'growth in training compute (5 years)' },
]

function Card({ title, points }: CardData) {
  return (
    <div className="training-pipeline-card">
      <h3 className="training-pipeline-card-title">{title}</h3>
      <ul className="training-pipeline-card-list">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

function TimelineItem({ stage, isLast }: { stage: TimelineStage; isLast: boolean }) {
  return (
    <div className={`training-pipeline-timeline-item ${isLast ? 'last' : ''}`}>
      <div className="training-pipeline-timeline-dot">{stage.number}</div>
      <div className="training-pipeline-timeline-content">
        <div className="training-pipeline-timeline-label">{stage.label}</div>
        <div className="training-pipeline-timeline-duration">{stage.duration}</div>
      </div>
    </div>
  )
}

function ConceptItem({ concept }: { concept: KeyConcept }) {
  return (
    <div className="training-pipeline-concept">
      <dt className="training-pipeline-concept-term">{concept.term}</dt>
      <dd className="training-pipeline-concept-def">{concept.definition}</dd>
    </div>
  )
}

function DataPoint({ point }: { point: { value: string; label: string } }) {
  return (
    <div className="training-pipeline-data-point">
      <span className="training-pipeline-data-value">{point.value}</span>
      <span className="training-pipeline-data-label">{point.label}</span>
    </div>
  )
}

export default function TrainingPipeline() {
  return (
    <div className="training-pipeline">
      {/* 3-column card grid */}
      <div className="training-pipeline-cards">
        {CARDS.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>

      {/* Visual timeline */}
      <div className="training-pipeline-timeline">
        <div className="training-pipeline-timeline-track" />
        {TIMELINE.map((stage, i) => (
          <TimelineItem key={stage.number} stage={stage} isLast={i === TIMELINE.length - 1} />
        ))}
      </div>

      {/* Key concepts */}
      <div className="training-pipeline-concepts">
        <h3 className="training-pipeline-concepts-title">Key Concepts</h3>
        <dl className="training-pipeline-concepts-list">
          {KEY_CONCEPTS.map((concept) => (
            <ConceptItem key={concept.term} concept={concept} />
          ))}
        </dl>
      </div>

      {/* Data points */}
      <div className="training-pipeline-data">
        {DATA_POINTS.map((point) => (
          <DataPoint key={point.label} point={point} />
        ))}
      </div>
    </div>
  )
}
