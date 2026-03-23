import { Play, ArrowDown, Star, StarOff } from 'lucide-react'
import './FineTuningVsRAG.css'

const PROVIDERS = [
  { name: 'OpenAI', ft: 'Fine-tuning API', rag: 'Assistants API (retrieval)' },
  { name: 'Anthropic', ft: 'Fine-tuning', rag: 'Tool use (similar to RAG)' },
  { name: 'Google', ft: 'Tuning API', rag: 'Vertex AI Search' },
  { name: 'Cohere', ft: 'Fine-tuning', rag: 'RAG platform' },
]

const FINE_TUNING_POINTS = [
  { label: 'What', value: 'Training the model on custom data' },
  { label: 'Best for', value: 'Task-specific behaviors, style, terminology' },
  { label: 'Cost', value: 'High (compute + time)' },
  { label: 'Latency', value: 'Lower (single inference)' },
  { label: 'Data needs', value: 'Hundreds to thousands of examples' },
  { label: 'Use cases', value: 'Customer service voice, code generation style, specialized domain knowledge' },
]

const RAG_POINTS = [
  { label: 'What', value: 'Adding relevant documents at inference time' },
  { label: 'Best for', value: 'Knowledge-intensive tasks, up-to-date info' },
  { label: 'Cost', value: 'Low (no training)' },
  { label: 'Latency', value: 'Higher (retrieval step)' },
  { label: 'Data needs', value: 'Document corpus' },
  { label: 'Use cases', value: 'Legal research, product documentation, dynamic content' },
]

export default function FineTuningVsRAG() {
  return (
    <div className="fine-tuning-rag-wrap">
      {/* Decision Flow Diagram */}
      <div className="ftr-flow-diagram">
        <div className="ftr-flow-label">Decision guide</div>
        <div className="ftr-flow-steps">
          <div className="ftr-flow-start">
            <span className="ftr-flow-icon"><Play size={14} /></span>
            Start
          </div>
          <div className="ftr-flow-arrow"><ArrowDown size={16} /></div>
          <div className="ftr-flow-question">
            Does the task need to learn new patterns/behavior?
          </div>
          <div className="ftr-flow-branches">
            <div className="ftr-flow-branch ftr-yes">
              <span className="ftr-branch-label">Yes</span>
              <div className="ftr-result ftr-result-finetune">
                <span className="ftr-result-icon"><Star size={14} /></span>
                Fine-tuning
              </div>
            </div>
            <div className="ftr-flow-branch ftr-no">
              <span className="ftr-branch-label">No</span>
              <div className="ftr-flow-sub">
                <div className="ftr-sub-question">
                  Need up-to-date/external knowledge?
                </div>
                <div className="ftr-sub-branches">
                  <div className="ftr-sub-branch ftr-yes">
                    <span className="ftr-branch-label">Yes</span>
                    <div className="ftr-result ftr-result-rag">
                      <span className="ftr-result-icon"><StarOff size={14} /></span>
                      RAG
                    </div>
                  </div>
                  <div className="ftr-sub-branch ftr-no">
                    <span className="ftr-branch-label">No</span>
                    <div className="ftr-result ftr-result-either">
                      Either approach
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ftr-flow-note">
          Complex tasks can combine both!
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="ftr-comparison">
        <div className="ftr-card ftr-card-finetune">
          <div className="ftr-card-header">
            <h3>Fine-tuning</h3>
          </div>
          <div className="ftr-card-points">
            {FINE_TUNING_POINTS.map((point, i) => (
              <div key={i} className="ftr-point">
                <span className="ftr-point-label">{point.label}</span>
                <span className="ftr-point-value">{point.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ftr-card ftr-card-rag">
          <div className="ftr-card-header">
            <h3>RAG</h3>
            <span className="ftr-card-subtitle">Retrieval-Augmented Generation</span>
          </div>
          <div className="ftr-card-points">
            {RAG_POINTS.map((point, i) => (
              <div key={i} className="ftr-point">
                <span className="ftr-point-label">{point.label}</span>
                <span className="ftr-point-value">{point.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Provider Support */}
      <div className="ftr-providers">
        <h3 className="ftr-providers-title">Provider support</h3>
        <div className="ftr-providers-grid">
          {PROVIDERS.map((provider) => (
            <div key={provider.name} className="ftr-provider">
              <div className="ftr-provider-name">{provider.name}</div>
              <div className="ftr-provider-details">
                <div className="ftr-provider-ft">
                  <span className="ftr-provider-badge">FT</span>
                  {provider.ft}
                </div>
                <div className="ftr-provider-rag">
                  <span className="ftr-provider-badge">RAG</span>
                  {provider.rag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Callout */}
      <div className="callout">
        <span className="callout-label">Tip</span>
        <p>
          <strong>Start with RAG</strong> for most cases. Only fine-tune when you
          need consistent behavioral changes.
        </p>
      </div>
    </div>
  )
}
