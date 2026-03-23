import { useState, useEffect, useRef } from 'react'
import { Waves, Settings2, Lightbulb, Play, RotateCcw, Loader2 } from 'lucide-react'
import './StreamingResponses.css'

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────

interface ConceptCard {
  title: string
  icon: React.ReactNode
  items: string[]
}

// ──────────────────────────────────────────────────────────
// Pure data (no side effects)
// ──────────────────────────────────────────────────────────

const CONCEPTS: ConceptCard[] = [
  {
    title: 'What is Streaming',
    icon: <Waves size={20} />,
    items: [
      'Token-by-token delivery vs full response',
      'Reduces perceived latency dramatically',
      'Users see first token in ~200ms',
      'Builds trust through transparency',
    ],
  },
  {
    title: 'Implementation',
    icon: <Settings2 size={20} />,
    items: [
      'Server-Sent Events (SSE) - one-way stream',
      'WebSockets - bidirectional',
      'Chunked transfer encoding',
      'AbortController for cancellation',
    ],
  },
  {
    title: 'Use Cases',
    icon: <Lightbulb size={20} />,
    items: [
      'Chat interfaces (ChatGPT, Claude)',
      'Code completion (Copilot)',
      'Real-time search results',
      'Live transcription & translation',
    ],
  },
]

// Simulated response for demo
const SAMPLE_RESPONSE = "Artificial intelligence is transforming how we interact with technology, enabling machines to understand, reason, and learn from data in ways that mimic human cognition."

// ──────────────────────────────────────────────────────────
// Sub-components (each < 50 lines)
// ──────────────────────────────────────────────────────────

function ConceptCard({ title, icon, items }: ConceptCard) {
  return (
    <div className="streaming-card">
      <div className="streaming-card-header">
        <span className="streaming-card-icon">{icon}</span>
        <h3 className="streaming-card-title">{title}</h3>
      </div>
      <ul className="streaming-card-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function StreamingDemo() {
  const [nonStreamingText, setNonStreamingText] = useState('')
  const [streamingText, setStreamingText] = useState('')
  const [streamingProgress, setStreamingProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [showDemo, setShowDemo] = useState(false)
  const streamRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (showDemo) {
      // Start timer
      const startTime = Date.now()
      timerRef.current = window.setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000))
      }, 100)

      // Non-streaming: delayed full response
      setTimeout(() => {
        setNonStreamingText(SAMPLE_RESPONSE)
      }, 2500)

      // Streaming: token by token
      const words = SAMPLE_RESPONSE.split(' ')
      let wordIndex = 0
      
      const streamInterval = setInterval(() => {
        if (wordIndex < words.length) {
          setStreamingText(prev => prev + (prev ? ' ' : '') + words[wordIndex])
          setStreamingProgress(((wordIndex + 1) / words.length) * 100)
          wordIndex++
        } else {
          clearInterval(streamInterval)
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
        }
      }, 120) // Simulate token arrival every 120ms

      streamRef.current = streamInterval as unknown as number

      return () => {
        if (streamRef.current) clearInterval(streamRef.current)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    } else {
      setNonStreamingText('')
      setStreamingText('')
      setStreamingProgress(0)
      setElapsed(0)
    }
  }, [showDemo])

  const resetDemo = () => {
    if (streamRef.current) clearInterval(streamRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    setShowDemo(false)
  }

  return (
    <div className="streaming-demo">
      <div className="demo-header">
        <h3>Streaming vs Non-Streaming Comparison</h3>
        <button 
          className="demo-toggle" 
          onClick={() => showDemo ? resetDemo() : setShowDemo(true)}
        >
          {showDemo ? <><RotateCcw size={14} /> Reset</> : <><Play size={14} /> Play Demo</>}
        </button>
      </div>

      {!showDemo && (
        <div className="demo-placeholder">
          Click "Play Demo" to see the difference between streaming and non-streaming responses
        </div>
      )}

      {showDemo && (
        <div className="demo-comparison">
          {/* Non-Streaming Side */}
          <div className="demo-panel">
            <div className="demo-panel-header">
              <span className="demo-label">Non-Streaming</span>
              <span className="demo-timer">{elapsed}s</span>
            </div>
            <div className="demo-response non-streaming">
              {nonStreamingText ? (
                <span className="response-text">{nonStreamingText}</span>
              ) : (
                <span className="response-loading">
                  <Loader2 size={14} className="loading-spinner" />
                  <span className="loading-text">Generating...</span>
                </span>
              )}
            </div>
          </div>

          {/* Streaming Side */}
          <div className="demo-panel">
            <div className="demo-panel-header">
              <span className="demo-label streaming-badge">Streaming</span>
              <span className="demo-timer">{elapsed}s</span>
            </div>
            <div className="demo-response streaming">
              <span className="response-text">
                {streamingText}
                <span className="cursor">|</span>
              </span>
            </div>
            <div className="demo-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${streamingProgress}%` }}
                />
              </div>
              <span className="progress-label">
                {Math.round(streamingProgress)}% complete
              </span>
            </div>
          </div>
        </div>
      )}

      {showDemo && (
        <div className="demo-insight">
          <div className="insight-item">
            <span className="insight-label">Time to first token:</span>
            <span className="insight-value">~200ms</span>
          </div>
          <div className="insight-item">
            <span className="insight-label">Full response time:</span>
            <span className="insight-value">~{elapsed}s</span>
          </div>
          <div className="insight-item">
            <span className="insight-label">User perception:</span>
            <span className="insight-value">"Faster" & "Responsive"</span>
          </div>
        </div>
      )}
    </div>
  )
}

function TimingVisualization() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="timing-viz">
      <h3 className="timing-title">Timing Breakdown</h3>
      
      <div className="timing-timeline">
        <div className="timeline-item">
          <div className="timeline-marker" />
          <div className="timeline-content">
            <span className="timeline-label">Request sent</span>
            <span className="timeline-time">0ms</span>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-marker" />
          <div className="timeline-content">
            <span className="timeline-label">Server processing</span>
            <span className="timeline-time">50-200ms</span>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-marker" style={{ 
            background: animated ? 'var(--accent)' : 'var(--border)',
            boxShadow: animated ? '0 0 12px var(--accent)' : 'none'
          }} />
          <div className="timeline-content" style={{
            color: animated ? 'var(--accent)' : 'var(--text)'
          }}>
            <span className="timeline-label">First token arrives</span>
            <span className="timeline-time" style={{
              color: animated ? 'var(--accent)' : 'var(--text)'
            }}>~200ms</span>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-marker" />
          <div className="timeline-content">
            <span className="timeline-label">Tokens stream in</span>
            <span className="timeline-time">30-80 tok/s</span>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-marker done" />
          <div className="timeline-content">
            <span className="timeline-label">Complete (EOS token)</span>
            <span className="timeline-time">2-10s</span>
          </div>
        </div>
      </div>

      <div className="timing-note">
        <strong>Key insight:</strong> Users see meaningful output at ~200ms vs waiting 2-10s for the full response. 
        This perceived speed difference dramatically improves UX.
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────

export default function StreamingResponses() {
  return (
    <div className="streaming-responses">
      {/* Concept Cards */}
      <div className="streaming-concepts">
        {CONCEPTS.map((concept, i) => (
          <ConceptCard 
            key={i} 
            title={concept.title} 
            icon={concept.icon} 
            items={concept.items} 
          />
        ))}
      </div>

      {/* Interactive Demo */}
      <StreamingDemo />

      {/* Timing Visualization */}
      <TimingVisualization />
    </div>
  )
}
