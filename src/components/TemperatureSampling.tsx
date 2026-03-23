import { useState, useMemo } from 'react'
import { Thermometer, BarChart3, Scissors, Lightbulb, AlertTriangle } from 'lucide-react'
import './TemperatureSampling.css'

interface OutputExample {
  prompt: string
  temp0: string
  temp1: string
}

const EXAMPLES: OutputExample[] = [
  {
    prompt: 'Hello',
    temp0: 'Hello! How can I help you today?',
    temp1: 'Hey there! Greetings, human friend! What\'s on your mind?',
  },
  {
    prompt: 'Tell me about the sun',
    temp0: 'The sun is a star at the center of our solar system. It is a nearly perfect sphere of hot plasma.',
    temp1: 'The sun! That magnificent golden orb of endless fire dancing across the cosmic stage! It\'s basically a giant nuclear furnace in the sky...',
  },
  {
    prompt: 'What is 2 + 2?',
    temp0: '2 + 2 equals 4.',
    temp1: 'Let me think... 2 + 2... that would be... hmm... could be 4, or perhaps... wait, definitely 4! Maybe!',
  },
]

export default function TemperatureSampling() {
  const [temperature, setTemperature] = useState(0.7)
  const [topP, setTopP] = useState(0.9)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [activeExample, setActiveExample] = useState(0)

  const currentOutput = useMemo(() => {
    const example = EXAMPLES[activeExample]
    return temperature < 0.5 ? example.temp0 : example.temp1
  }, [temperature, activeExample])

  return (
    <div className="temperature-sampling">
      {/* Concepts Overview */}
      <div className="concepts-grid">
        <div className="concept-card">
          <div className="concept-icon"><Thermometer size={20} /></div>
          <h4>Temperature</h4>
          <p>Controls randomness. <code>0</code> = deterministic (always pick most likely token). <code>1</code> = creative (more varied outputs).</p>
          <div className="concept-scale">
            <span>Deterministic</span>
            <span>Creative</span>
          </div>
        </div>
        <div className="concept-card">
          <div className="concept-icon"><BarChart3 size={20} /></div>
          <h4>Top-p (Nucleus)</h4>
          <p>Selects from smallest set of tokens that together exceed probability p. Lower = stricter selection.</p>
          <div className="concept-scale">
            <span>Focused</span>
            <span>Diverse</span>
          </div>
        </div>
        <div className="concept-card">
          <div className="concept-icon"><Scissors size={20} /></div>
          <h4>Max Tokens</h4>
          <p>Hard limit on response length. Prevents runaway outputs. Each token ≈ 4 characters of English text.</p>
          <div className="concept-scale">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="visualizer">
        <h3>Temperature Visualizer</h3>
        
        <div className="slider-section">
          <div className="slider-header">
            <label>Temperature</label>
            <span className="slider-value">{temperature.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="temp-slider"
          />
          <div className="slider-labels">
            <span>0 (Deterministic)</span>
            <span>1 (Creative)</span>
          </div>
        </div>

        <div className="example-selector">
          <span className="example-label">Test with:</span>
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className={`example-btn ${activeExample === i ? 'active' : ''}`}
              onClick={() => setActiveExample(i)}
            >
              "{ex.prompt}"
            </button>
          ))}
        </div>

        <div className="output-comparison">
          <div className="output-column">
            <div className="output-label">
              <span>Temperature = 0</span>
              <span className="output-type">Deterministic</span>
            </div>
            <div className="output-box">
              {EXAMPLES[activeExample].temp0}
            </div>
          </div>
          <div className="output-column">
            <div className="output-label">
              <span>Temperature = 1</span>
              <span className="output-type">Creative</span>
            </div>
            <div className="output-box">
              {EXAMPLES[activeExample].temp1}
            </div>
          </div>
        </div>

        <div className="current-output">
          <div className="output-label">
            <span>Current (temp: {temperature.toFixed(2)})</span>
            <span className="output-type">
              {temperature < 0.3 ? 'Factual' : temperature > 0.7 ? 'Creative' : 'Balanced'}
            </span>
          </div>
          <div className="output-box highlight">
            {currentOutput}
          </div>
        </div>
      </div>

      {/* Parameter Settings */}
      <div className="parameter-section">
        <h3>API Parameters</h3>
        
        <div className="parameter-grid">
          <div className="parameter-card">
            <div className="param-header">
              <label>temperature</label>
              <span className="param-value">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
            <div className="param-desc">
              {temperature < 0.3 
                ? 'Best for factual Q&A, code generation, translation'
                : temperature > 0.7
                ? 'Best for creative writing, brainstorming, roleplay'
                : 'Balanced for general conversation'}
            </div>
          </div>

          <div className="parameter-card">
            <div className="param-header">
              <label>top_p</label>
              <span className="param-value">{topP}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={topP}
              onChange={(e) => setTopP(parseFloat(e.target.value))}
            />
            <div className="param-desc">
              {topP < 0.5 
                ? 'Very focused, only most probable tokens'
                : topP > 0.9
                ? 'More diverse, includes less likely tokens'
                : 'Balanced nucleus sampling'}
            </div>
          </div>

          <div className="parameter-card">
            <div className="param-header">
              <label>max_tokens</label>
              <span className="param-value">{maxTokens}</span>
            </div>
            <input
              type="range"
              min="1"
              max="4096"
              step="1"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            />
            <div className="param-desc">
              {maxTokens < 256 
                ? 'Short responses, headlines'
                : maxTokens > 2048
                ? 'Long-form content, detailed answers'
                : 'Standard response length'}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guide */}
      <div className="usage-guide">
        <h3>Recommended Settings</h3>
        <table className="settings-table">
          <thead>
            <tr>
              <th>Use Case</th>
              <th>Temperature</th>
              <th>Top-p</th>
              <th>Max Tokens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Code Generation</strong></td>
              <td>0 - 0.2</td>
              <td>0.95</td>
              <td>2048+</td>
            </tr>
            <tr>
              <td><strong>Factual Q&A</strong></td>
              <td>0 - 0.3</td>
              <td>0.9</td>
              <td>1024</td>
            </tr>
            <tr>
              <td><strong>General Chat</strong></td>
              <td>0.7 - 0.8</td>
              <td>0.9</td>
              <td>2048</td>
            </tr>
            <tr>
              <td><strong>Creative Writing</strong></td>
              <td>0.8 - 1.0</td>
              <td>0.95</td>
              <td>4096</td>
            </tr>
            <tr>
              <td><strong>Brainstorming</strong></td>
              <td>1.0 - 1.2</td>
              <td>1.0</td>
              <td>2048</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tips */}
      <div className="tips-section">
        <div className="tip">
          <span className="tip-icon"><Lightbulb size={16} /></span>
          <div>
            <strong>Temperature vs Top-p</strong>
            <p>Use either, not both. Set temperature=1 if using top_p, or top_p=1 if using temperature.</p>
          </div>
        </div>
        <div className="tip">
          <span className="tip-icon"><AlertTriangle size={16} /></span>
          <div>
            <strong>High Temperature Warning</strong>
            <p>Values above 1.0 can produce nonsensical outputs. Most APIs cap at 2.0.</p>
          </div>
        </div>
      </div>
    </div>
  )
}