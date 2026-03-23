import { FileText, Settings, Scissors, Hash, Database, Search, User, Layers, MessageSquare, Brain, ArrowDown } from 'lucide-react'
import './RAGArchitecture.css'

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────

interface StrategyCard {
  title: string
  items: string[]
}

interface Metric {
  label: string
  description: string
}

interface Decision {
  decision: string
  options: string
  tradeoff: string
}

// ──────────────────────────────────────────────────────────
// Pure data (no side effects)
// ──────────────────────────────────────────────────────────

const STRATEGIES: StrategyCard[] = [
  {
    title: 'Chunking Strategies',
    items: [
      'Fixed-size (character/word count)',
      'Semantic (by meaning)',
      'Recursive (hierarchical)',
      'Overlap strategies',
    ],
  },
  {
    title: 'Retrieval Optimization',
    items: [
      'Hybrid search (dense + sparse)',
      'Query expansion',
      'Reranking',
      'Maximum marginal relevance',
    ],
  },
  {
    title: 'Context Injection',
    items: [
      'Prompt construction',
      'System prompt engineering',
      'Context windows management',
      'Citation formatting',
    ],
  },
]

const METRICS: Metric[] = [
  { label: 'Context Precision', description: 'How relevant are the retrieved chunks?' },
  { label: 'Context Recall', description: 'Did we retrieve everything needed?' },
  { label: 'Faithfulness', description: 'Does response match the context?' },
  { label: 'Answer Relevance', description: 'How well does answer address the question?' },
]

const DECISIONS: Decision[] = [
  {
    decision: 'Chunk size',
    options: '256, 512, 1024 tokens',
    tradeoff: 'Smaller = more precise, larger = more context',
  },
  {
    decision: 'Embedding model',
    options: 'OpenAI, Cohere, open-source',
    tradeoff: 'Quality vs cost vs latency',
  },
  {
    decision: 'Retrieval',
    options: 'Top-1 vs Top-K',
    tradeoff: 'Precision vs recall',
  },
]

// ──────────────────────────────────────────────────────────
// Sub-components (each < 50 lines)
// ──────────────────────────────────────────────────────────

function StrategyCard({ title, items }: StrategyCard) {
  return (
    <div className="rag-card">
      <h3 className="rag-card-title">{title}</h3>
      <ul className="rag-card-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function PipelineFlow() {
  const stages = [
    { label: 'Documents', icon: <FileText size={18} /> },
    { label: 'Ingestion', icon: <Settings size={18} /> },
    { label: 'Chunking', icon: <Scissors size={18} /> },
    { label: 'Embedding', icon: <Hash size={18} /> },
    { label: 'Vector DB', icon: <Database size={18} /> },
  ]

  const queryStages = [
    { label: 'User Query', icon: <User size={18} /> },
    { label: 'Query Embedding', icon: <Hash size={18} /> },
    { label: 'Similarity Search', icon: <Search size={18} /> },
  ]

  const resultStages = [
    { label: 'Top K Results', icon: <Layers size={18} /> },
    { label: 'Context Assembly', icon: <Settings size={18} /> },
    { label: 'LLM Generation', icon: <Brain size={18} /> },
    { label: 'Response', icon: <MessageSquare size={18} /> },
  ]

  return (
    <div className="rag-pipeline">
      <div className="pipeline-ingestion">
        <div className="pipeline-label">Ingestion Pipeline</div>
        <div className="pipeline-row">
          {stages.map((s, i) => (
            <div key={i} className="pipeline-node">
              <span className="pipeline-icon">{s.icon}</span>
              <span className="pipeline-name">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pipeline-query">
        <div className="pipeline-label">Query Pipeline</div>
        <div className="pipeline-row">
          {queryStages.map((s, i) => (
            <div key={i} className="pipeline-node">
              <span className="pipeline-icon">{s.icon}</span>
              <span className="pipeline-name">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pipeline-connector"><ArrowDown size={16} /></div>
      <div className="pipeline-generation">
        <div className="pipeline-row">
          {resultStages.map((s, i) => (
            <div key={i} className="pipeline-node">
              <span className="pipeline-icon">{s.icon}</span>
              <span className="pipeline-name">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MetricsGrid() {
  return (
    <div className="rag-metrics">
      <div className="rag-metrics-header">
        <h3>Evaluation Metrics</h3>
      </div>
      <div className="rag-metrics-grid">
        {METRICS.map((m, i) => (
          <div key={i} className="rag-metric">
            <div className="rag-metric-label">{m.label}</div>
            <div className="rag-metric-desc">{m.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DecisionsTable() {
  return (
    <div className="rag-decisions">
      <h3>Key Decisions</h3>
      <div className="rag-decisions-table">
        <div className="rag-decisions-header">
          <span>Decision</span>
          <span>Options</span>
          <span>Trade-offs</span>
        </div>
        {DECISIONS.map((d, i) => (
          <div key={i} className="rag-decisions-row">
            <span className="rag-decisions-decision">{d.decision}</span>
            <span className="rag-decisions-options">{d.options}</span>
            <span className="rag-decisions-tradeoff">{d.tradeoff}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────

export default function RAGArchitecture() {
  return (
    <div className="rag-architecture">
      {/* 3-Column Card Grid */}
      <div className="rag-cards">
        {STRATEGIES.map((s, i) => (
          <StrategyCard key={i} title={s.title} items={s.items} />
        ))}
      </div>

      {/* Pipeline Flow Diagram */}
      <PipelineFlow />

      {/* Evaluation Metrics */}
      <MetricsGrid />

      {/* Key Decisions Table */}
      <DecisionsTable />
    </div>
  )
}
