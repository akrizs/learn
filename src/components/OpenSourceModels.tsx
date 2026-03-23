import { Globe, Cloud, Server, CheckCircle, XCircle, Brain, Waves, Fish, Gem, Database } from 'lucide-react'
import './OpenSourceModels.css'

// Provider colors
const PROVIDER_COLORS: Record<string, string> = {
  Meta: '#f59e0b',
  Mistral: '#8b5cf6',
  Alibaba: '#06b6d4',
  DeepSeek: '#8b5cf6',
  Google: '#3b82f6',
  Microsoft: '#10b981',
}

// Open source models data - March 2026
interface OpenSourceModel {
  id: string
  name: string
  provider: string
  params: string
  context: number
  strengths: string[]
  icon: React.ReactNode
}

const OPEN_SOURCE_MODELS: OpenSourceModel[] = [
  {
    id: 'llama-4',
    name: 'Llama 4',
    provider: 'Meta',
    params: '405B',
    context: 128000,
    strengths: ['Open weights', 'Large context', 'Meta ecosystem'],
    icon: <Brain size={24} />,
  },
  {
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    provider: 'Mistral',
    params: '123B',
    context: 128000,
    strengths: ['Excellent reasoning', 'Fast inference', 'European'],
    icon: <Waves size={24} />,
  },
  {
    id: 'qwen-3.5',
    name: 'Qwen 3.5',
    provider: 'Alibaba',
    params: '72B',
    context: 131072,
    strengths: ['Multilingual', 'Strong Chinese', 'Efficient'],
    icon: <Fish size={24} />,
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    params: '236B',
    context: 128000,
    strengths: ['Efficient architecture', 'Open weights', 'Cost-effective'],
    icon: <Database size={24} />,
  },
  {
    id: 'gemma-3',
    name: 'Gemma 3',
    provider: 'Google',
    params: '27B',
    context: 128000,
    strengths: ['Lightweight', 'Google integration', 'Fast deployment'],
    icon: <Gem size={24} />,
  },
  {
    id: 'phi-4',
    name: 'Phi-4',
    provider: 'Microsoft',
    params: '14B',
    context: 128000,
    strengths: ['Small but capable', 'Quality-focused', 'Azure integration'],
    icon: <span style={{ fontWeight: 'bold', fontSize: '20px' }}>φ</span>,
  },
]

function OpenSourceModelsCards() {
  return (
    <div className="osm-cards">
      {OPEN_SOURCE_MODELS.map((model) => (
        <div key={model.id} className="osm-card">
          <div className="osm-card-header">
            <span className="osm-card-icon">{model.icon}</span>
            <span
              className="osm-provider-badge"
              style={{ '--provider-color': PROVIDER_COLORS[model.provider] ?? '#6b7280' } as React.CSSProperties}
            >
              {model.provider}
            </span>
          </div>
          <h3>{model.name}</h3>
          <div className="osm-card-specs">
            <div className="osm-spec">
              <span className="osm-spec-label">Parameters</span>
              <span className="osm-spec-value">{model.params}</span>
            </div>
            <div className="osm-spec">
              <span className="osm-spec-label">Context</span>
              <span className="osm-spec-value">{model.context.toLocaleString()}</span>
            </div>
          </div>
          <div className="osm-card-strengths">
            {model.strengths.map((s) => (
              <span key={s} className="osm-strength-tag">{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function OpenSourceModelsTable() {
  return (
    <div className="osm-table-section">
      <h3>Comparison Table</h3>
      <div className="osm-table-scroll">
        <table className="osm-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Provider</th>
              <th>Parameters</th>
              <th>Context</th>
              <th>Strengths</th>
            </tr>
          </thead>
          <tbody>
            {OPEN_SOURCE_MODELS.map((model) => (
              <tr key={model.id}>
                <td className="osm-model-name">{model.name}</td>
                <td>
                  <span
                    className="osm-provider-badge"
                    style={{ '--provider-color': PROVIDER_COLORS[model.provider] ?? '#6b7280' } as React.CSSProperties}
                  >
                    {model.provider}
                  </span>
                </td>
                <td className="osm-params">{model.params}</td>
                <td className="osm-context">{(model.context / 1000).toFixed(0)}k</td>
                <td className="osm-strengths">{model.strengths.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OpenSourceModelsUseCases() {
  const openSourceUseCases = [
    { icon: <CheckCircle size={18} />, title: 'Data Privacy', desc: 'Keep data on-premise' },
    { icon: <CheckCircle size={18} />, title: 'Custom Fine-tuning', desc: 'Adapt to your domain' },
    { icon: <CheckCircle size={18} />, title: 'Cost Control', desc: 'No per-token fees' },
    { icon: <CheckCircle size={18} />, title: 'Offline Use', desc: 'Run without internet' },
  ]

  const closedUseCases = [
    { icon: <XCircle size={18} />, title: 'State-of-the-art', desc: 'Access to latest models' },
    { icon: <XCircle size={18} />, title: 'Managed Infrastructure', desc: 'No deployment hassle' },
    { icon: <XCircle size={18} />, title: 'Enterprise Support', desc: 'SLA and compliance' },
  ]

  return (
    <div className="osm-use-cases">
      <h3>When to Use Open Source vs Closed</h3>
      <div className="osm-use-cases-grid">
        <div className="osm-use-case-column">
          <h4><Globe size={18} /> Open Source</h4>
          {openSourceUseCases.map((uc) => (
            <div key={uc.title} className="osm-use-case">
              <span className="osm-use-case-icon osm-use-case-open">{uc.icon}</span>
              <div>
                <h5>{uc.title}</h5>
                <p>{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="osm-use-case-column">
          <h4><Server size={18} /> Closed Source</h4>
          {closedUseCases.map((uc) => (
            <div key={uc.title} className="osm-use-case">
              <span className="osm-use-case-icon osm-use-case-closed">{uc.icon}</span>
              <div>
                <h5>{uc.title}</h5>
                <p>{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OpenSourceModelsDeployment() {
  const deploymentOptions = [
    {
      icon: <Cloud size={20} />,
      title: 'Cloud Deployment',
      options: ['Hugging Face Inference', 'RunPod', 'Modal', 'AWS SageMaker'],
      pros: 'Quick setup, managed infrastructure',
    },
    {
      icon: <Server size={20} />,
      title: 'Local Deployment',
      options: ['Ollama', 'LM Studio', 'vLLM', 'llama.cpp'],
      pros: 'Full control, privacy, no ongoing costs',
    },
  ]

  return (
    <div className="osm-deployment">
      <h3>Deployment Options</h3>
      <div className="osm-deployment-grid">
        {deploymentOptions.map((opt) => (
          <div key={opt.title} className="osm-deployment-card">
            <div className="osm-deployment-icon">{opt.icon}</div>
            <h4>{opt.title}</h4>
            <ul className="osm-deployment-options">
              {opt.options.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p className="osm-deployment-pros">{opt.pros}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OpenSourceModels() {
  return (
    <div className="osm">
      <div className="osm-intro">
        <span className="osm-tag">Knowledge</span>
        <h2>Open Source AI Models</h2>
        <p className="osm-intro-text">
          Open source AI models provide transparency, customization, and cost-effective alternatives 
          to closed APIs. With weights freely available, organizations can fine-tune, self-host, 
          or use cloud-based inference endpoints.
        </p>
      </div>
      <OpenSourceModelsCards />
      <OpenSourceModelsTable />
      <OpenSourceModelsUseCases />
      <OpenSourceModelsDeployment />
    </div>
  )
}
