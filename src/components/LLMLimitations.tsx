import { AlertTriangle, Calendar, Calculator, Scale, Lightbulb } from 'lucide-react'
import './LLMLimitations.css'

type Severity = 'high' | 'medium' | 'low'

interface Limitation {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  causes: string[]
  mitigations: string[]
  severity: Severity
}

interface ComparisonRow {
  problem: string
  severity: Severity
  severityLabel: string
  mitigation: string[]
}

const LIMITATIONS: Limitation[] = [
  {
    id: 'hallucinations',
    title: 'Hallucinations',
    icon: <AlertTriangle size={20} />,
    description:
      'Models generate confident but incorrect information that sounds plausible. The model has no ground truth — it generates text based on patterns, not facts.',
    causes: [
      'Pattern matching without verification',
      'Training on conflicting or low-quality data',
      'Lack of real-world grounding',
      'Prompt ambiguity leading to guesswork',
    ],
    mitigations: [
      'Cross-reference with authoritative sources',
      'Use RAG to ground responses in retrieved documents',
      'Ask for confidence levels and uncertainty flags',
      'Structure prompts to request sources when available',
    ],
    severity: 'high',
  },
  {
    id: 'knowledge-cutoff',
    title: 'Knowledge Cutoffs',
    icon: <Calendar size={20} />,
    description:
      'Models only know what they were trained on. They have no awareness of events, discoveries, or updates after their training cutoff date.',
    causes: [
      'Static training data that becomes outdated',
      'No real-time information access by default',
      'Events post-training are entirely unknown',
      'Training data curation lag',
    ],
    mitigations: [
      'Use real-time search and retrieval systems',
      'Implement RAG with up-to-date document stores',
      'Combine with live APIs for current data',
      'Always verify dates and recency of information',
    ],
    severity: 'medium',
  },
  {
    id: 'reasoning-errors',
    title: 'Reasoning Errors',
    icon: <Calculator size={20} />,
    description:
      'Models struggle with reliable arithmetic, logical deduction, and multi-step reasoning. They often get simple math wrong or contradict themselves.',
    causes: [
      'Token prediction doesn\'t equal true reasoning',
      'Arithmetic requires precise intermediate steps',
      'Complex logical chains amplify error probability',
      'Training data lacks sufficient step-by-step examples',
    ],
    mitigations: [
      'Use chain-of-thought prompting for step-by-step logic',
      'Offload calculations to code execution tools',
      'Verify multi-step reasoning with external tools',
      'Break complex problems into smaller prompts',
    ],
    severity: 'medium',
  },
  {
    id: 'bias',
    title: 'Inherited Bias',
    icon: <Scale size={20} />,
    description:
      'Models absorb and amplify biases present in training data — including societal, cultural, political, and demographic viewpoints.',
    causes: [
      'Training on internet-scraped data reflects human biases',
      'Underrepresentation of certain groups in data',
      'Reinforcement from human feedback preferences',
      'Inherited stereotypes from language patterns',
    ],
    mitigations: [
      'Implement bias detection and evaluation benchmarks',
      'Use diverse, balanced training data when possible',
      'Apply content filtering and safety layers',
      'Include diverse perspectives in RLHF feedback',
    ],
    severity: 'medium',
  },
]

const COMPARISON_DATA: ComparisonRow[] = [
  {
    problem: 'Hallucinations',
    severity: 'high',
    severityLabel: 'High',
    mitigation: [
      'Cross-reference facts',
      'Use RAG grounding',
      'Request uncertainty flags',
    ],
  },
  {
    problem: 'Knowledge Cutoffs',
    severity: 'medium',
    severityLabel: 'Medium',
    mitigation: [
      'Real-time retrieval',
      'Live API integration',
      'Verify recency',
    ],
  },
  {
    problem: 'Reasoning Errors',
    severity: 'medium',
    severityLabel: 'Medium',
    mitigation: [
      'Chain-of-thought prompting',
      'Code execution tools',
      'Break into steps',
    ],
  },
  {
    problem: 'Inherited Bias',
    severity: 'medium',
    severityLabel: 'Medium',
    mitigation: [
      'Bias detection benchmarks',
      'Safety filters',
      'Diverse RLHF data',
    ],
  },
]

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`limitation-severity limitation-severity-${severity}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  )
}

function LimitationCard({ item }: { item: Limitation }) {
  return (
    <div className="limitation-card">
      <div className="limitation-card-header">
        <span className="limitation-card-icon">{item.icon}</span>
        <h3 className="limitation-card-title">{item.title}</h3>
        <SeverityBadge severity={item.severity} />
      </div>
      <p className="limitation-card-desc">{item.description}</p>
      <div className="limitation-card-sections">
        <div className="limitation-section">
          <h4>Causes</h4>
          <ul>
            {item.causes.map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>
        </div>
        <div className="limitation-section">
          <h4>Mitigations</h4>
          <ul>
            {item.mitigations.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function LLMLimitations() {
  return (
    <div className="llm-limitations">
      {/* Limitations Cards Grid */}
      <div className="limitation-cards">
        {LIMITATIONS.map((item) => (
          <LimitationCard key={item.id} item={item} />
        ))}
      </div>

      {/* Comparison Table */}
      <div className="limitation-table">
        <h3>Comparison: Problem Severity &amp; Mitigation</h3>
        <div className="limitation-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Severity</th>
                <th>Mitigation Strategies</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row) => (
                <tr key={row.problem}>
                  <td>
                    <strong>{row.problem}</strong>
                  </td>
                  <td>
                    <SeverityBadge severity={row.severity} />
                  </td>
                  <td>
                    <div className="mitigation-list">
                      {row.mitigation.map((m, i) => (
                        <span key={i} className="mitigation-tag">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insight */}
      <div className="limitation-insight">
        <div className="insight-icon"><Lightbulb size={20} /></div>
        <div className="insight-content">
          <h4>Key Takeaway</h4>
          <p>
            No LLM is infallible. Understanding these limitations is essential for responsible AI deployment.
            The best systems combine model capabilities with retrieval, verification, and human oversight.
          </p>
        </div>
      </div>
    </div>
  )
}
