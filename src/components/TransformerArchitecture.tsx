import { useState, useMemo } from 'react'
import { Eye, Settings2, Lightbulb } from 'lucide-react'
import './TransformerArchitecture.css'

interface Concept {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  details: string[]
}

const CONCEPTS: Concept[] = [
  {
    id: 'attention',
    title: 'Self-Attention',
    icon: <Eye size={20} />,
    description: 'The core mechanism allowing tokens to weigh relationships with all other tokens simultaneously.',
    details: [
      'Query (Q): what the current token is looking for',
      'Key (K): what each token offers to be matched',
      'Value (V): the actual information to retrieve',
    ],
  },
  {
    id: 'architecture',
    title: 'Encoder vs Decoder',
    icon: <Settings2 size={20} />,
    description: 'Three fundamental architectural patterns, each suited for different tasks.',
    details: [
      'Encoder-only (BERT): bidirectional, great for understanding',
      'Decoder-only (GPT): auto-regressive, great for generation',
      'Encoder-decoder (T5, GPT-4): combines both for complex tasks',
    ],
  },
  {
    id: 'innovations',
    title: 'Key Innovations',
    icon: <Lightbulb size={20} />,
    description: 'Critical advances that made transformers practical at scale.',
    details: [
      'Parallel processing: all positions computed simultaneously',
      'Positional encoding: injects order information',
      'Scaled dot-product: prevents vanishing gradients',
    ],
  },
]

const TOKENS = ['The', 'cat', 'sat', 'down']

// Pre-computed attention patterns for visualization
const ATTENTION_PATTERNS: Record<number, number[]> = {
  0: [0.95, 0.02, 0.02, 0.01], // "The" attends mostly to itself
  1: [0.15, 0.80, 0.03, 0.02], // "cat" attends to "The" and itself
  2: [0.10, 0.35, 0.45, 0.10], // "sat" attends to "cat" and itself
  3: [0.05, 0.20, 0.25, 0.50], // "down" attends to "sat" and itself
}

export default function TransformerArchitecture() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeToken, setActiveToken] = useState<number | null>(null)

  const attentionWeights = useMemo(() => {
    if (activeToken === null) return null
    return TOKENS.map((_, i) => ATTENTION_PATTERNS[activeToken][i])
  }, [activeToken])

  return (
    <div className="transformer-architecture">
      {/* Scaled Dot-Product Attention Formula */}
      <div className="transformer-architecture-formula">
        <div className="formula-label">Scaled Dot-Product Attention</div>
        <code className="formula">
          Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>)V
        </code>
        <p className="formula-explanation">
          The scaling factor √d<sub>k</sub> prevents gradients from vanishing in high dimensions.
        </p>
      </div>

      {/* Attention Visualization */}
      <div className="transformer-architecture-visual">
        <div className="visual-label">Interactive Attention Visualization</div>
        <div className="attention-demo">
          <p className="attention-instruction">
            Click a token to see how it attends to other tokens in the sequence:
          </p>
          
          {/* Token buttons */}
          <div className="attention-tokens">
            {TOKENS.map((token, i) => (
              <button
                key={i}
                className={`attention-token ${activeToken === i ? 'active' : ''}`}
                onClick={() => setActiveToken(activeToken === i ? null : i)}
              >
                {token}
              </button>
            ))}
          </div>

          {/* Attention heatmap */}
          {activeToken !== null && attentionWeights && (
            <div className="attention-heatmap">
              <div className="heatmap-label">
                <strong>{TOKENS[activeToken]}</strong> attends to:
              </div>
              <div className="heatmap-bars">
                {TOKENS.map((token, i) => (
                  <div key={i} className="heatmap-row">
                    <span className="heatmap-token">{token}</span>
                    <div className="heatmap-bar-container">
                      <div
                        className="heatmap-bar"
                        style={{
                          width: `${attentionWeights[i] * 100}%`,
                          backgroundColor: activeToken === i ? 'var(--accent)' : `rgba(170, 59, 255, ${attentionWeights[i]})`,
                        }}
                      />
                    </div>
                    <span className="heatmap-value">{(attentionWeights[i] * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attention matrix preview */}
          <div className="attention-matrix">
            <div className="matrix-label">Attention Weights Matrix</div>
            <div className="matrix-grid">
              {/* Header row */}
              <div className="matrix-cell matrix-header-corner"></div>
              {TOKENS.map((t, i) => (
                <div key={i} className="matrix-cell matrix-header">
                  {t.length > 4 ? t.slice(0, 3) + '.' : t}
                </div>
              ))}
              {/* Data rows */}
              {TOKENS.map((rowToken, rowIdx) => (
                <>
                  <div key={`row-${rowIdx}`} className="matrix-cell matrix-row-header">
                    {rowToken.length > 4 ? rowToken.slice(0, 3) + '.' : rowToken}
                  </div>
                  {TOKENS.map((_, colIdx) => {
                    const weight = ATTENTION_PATTERNS[rowIdx][colIdx]
                    const isActive = activeToken === rowIdx
                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className={`matrix-cell matrix-data ${isActive ? 'active-row' : ''}`}
                        style={{
                          backgroundColor: `rgba(170, 59, 255, ${weight * 0.8})`,
                        }}
                        title={`${rowToken} → ${TOKENS[colIdx]}: ${(weight * 100).toFixed(0)}%`}
                      >
                        {(weight * 100).toFixed(0)}
                      </div>
                    )
                  })}
                </>
              ))}
            </div>
          </div>

          <p className="qkvl-explanation">
            <strong>Q, K, V explanation:</strong> Query is what you're looking for, Key is what you offer to be matched, 
            Value is the actual information retrieved. The dot product of Q and K determines attention weight.
          </p>
        </div>
      </div>

      {/* Architecture Comparison */}
      <div className="transformer-architecture-comparison">
        <div className="comparison-label">Architecture comparison</div>
        <div className="arch-diagrams">
          <div className="arch-item">
            <div className="arch-diagram encoder-only">
              <div className="arch-block">Enc</div>
              <div className="arch-block">Enc</div>
              <div className="arch-block">Enc</div>
            </div>
            <div className="arch-info">
              <strong>Encoder-only</strong>
              <span>BERT, RoBERTa</span>
            </div>
          </div>
          <div className="arch-item">
            <div className="arch-diagram decoder-only">
              <div className="arch-block dec">Dec</div>
              <div className="arch-block dec">Dec</div>
              <div className="arch-block dec">Dec</div>
            </div>
            <div className="arch-info">
              <strong>Decoder-only</strong>
              <span>GPT, Llama, Claude</span>
            </div>
          </div>
          <div className="arch-item">
            <div className="arch-diagram encoder-decoder">
              <div className="arch-block enc">Enc</div>
              <div className="arch-cross">×</div>
              <div className="arch-block dec">Dec</div>
              <div className="arch-block dec">Dec</div>
              <div className="arch-block dec">Dec</div>
            </div>
            <div className="arch-info">
              <strong>Encoder-Decoder</strong>
              <span>T5, BART, Gemini</span>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Cards */}
      <div className="transformer-architecture-cards">
        {CONCEPTS.map((concept) => (
          <div
            key={concept.id}
            className={`transformer-architecture-card ${hoveredCard === concept.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(concept.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-header">
              <span className="card-icon">{concept.icon}</span>
              <h3>{concept.title}</h3>
            </div>
            <p className="card-description">{concept.description}</p>
            {hoveredCard === concept.id && (
              <ul className="card-details">
                {concept.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
