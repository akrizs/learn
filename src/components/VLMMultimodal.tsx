import { Link, Image, Eye, Film, Hash, Zap, Type } from 'lucide-react'
import './VLMMultimodal.css'

// Provider colors as specified
const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: '#10b981',
  Anthropic: '#3b82f6',
  Google: '#eab308',
  Meta: '#8b5cf6',
  'Alibaba (Qwen)': '#f97316',
  'LLaVA (Open)': '#6b7280',
  DeepSeek: '#a855f7',
}

interface VLMModel {
  name: string
  provider: string
  imageInput: boolean
  videoInput: boolean
  maxResolution: string
  contextWindow: string
  strengths: string
}

const VLM_MODELS: VLMModel[] = [
  // OpenAI
  { name: 'GPT-4o (Vision)', provider: 'OpenAI', imageInput: true, videoInput: true, maxResolution: '4096×4096', contextWindow: '128K tokens', strengths: 'Real-time vision, strong reasoning, image generation' },
  
  // Anthropic
  { name: 'Claude 4 (Vision)', provider: 'Anthropic', imageInput: true, videoInput: true, maxResolution: '1600×1600', contextWindow: '200K tokens', strengths: 'Long context, document analysis, nuanced understanding' },
  
  // Google
  { name: 'Gemini 3 Pro Vision', provider: 'Google', imageInput: true, videoInput: true, maxResolution: 'Multiple frames', contextWindow: '1M tokens', strengths: 'Video understanding, spatial reasoning, native multimodal' },
  { name: 'Gemini 2.5 Pro', provider: 'Google', imageInput: true, videoInput: true, maxResolution: 'Multiple frames', contextWindow: '1M tokens', strengths: 'Huge context, excellent for long videos' },
  
  // xAI
  { name: 'Grok 4 Vision', provider: 'xAI', imageInput: true, videoInput: false, maxResolution: '1024×1024', contextWindow: '256K tokens', strengths: 'Real-time web access, humor, sarcasm' },
  
  // Qwen (Alibaba)
  { name: 'Qwen 3.5 VL 72B', provider: 'Alibaba (Qwen)', imageInput: true, videoInput: true, maxResolution: '2048×2048', contextWindow: '128K tokens', strengths: 'Multilingual, open-source, cost-effective' },
  { name: 'Qwen 2.5 VL', provider: 'Alibaba (Qwen)', imageInput: true, videoInput: true, maxResolution: '1024×1024', contextWindow: '128K tokens', strengths: 'Strong OCR, document understanding' },
  
  // Meta
  { name: 'Llama 4 Vision', provider: 'Meta', imageInput: true, videoInput: false, maxResolution: '1024×1024', contextWindow: '128K tokens', strengths: 'Open-source, privacy-friendly' },
  
  // DeepSeek
  { name: 'DeepSeek VL2', provider: 'DeepSeek', imageInput: true, videoInput: false, maxResolution: '768×768', contextWindow: '64K tokens', strengths: 'Open-source, competitive pricing' },
  
  // LLaVA (Open)
  { name: 'LLaVA 1.6', provider: 'LLaVA (Open)', imageInput: true, videoInput: false, maxResolution: '336×336', contextWindow: '4K tokens', strengths: 'Open-source, lightweight, research focus' },
]

// Card data
const CONCEPT_CARDS = [
  {
    icon: <Link size={24} />,
    title: 'Vision-Language Fusion',
    description: 'Combines visual and textual representations into a unified embedding space. Images are encoded alongside text tokens, enabling joint reasoning across modalities.',
  },
  {
    icon: <Image size={24} />,
    title: 'Image Processing',
    description: 'Images are tokenized into fixed-size patches (e.g., 16×16 pixels), linearly embedded, and flattened into sequences similar to text tokenization.',
  },
  {
    icon: <Eye size={24} />,
    title: 'Cross-modal Attention',
    description: 'Text tokens attend to image patches through attention mechanisms. This creates attention maps showing which image regions influence each text response.',
  },
]

// Video understanding note
const VIDEO_CARD = {
  icon: <Film size={24} />,
  title: 'Video Understanding',
  description: 'Modern VLMs process videos by sampling frames and encoding each as image tokens. Temporal relationships between frames are captured through additional attention mechanisms. Gemini 3 Pro and Claude 4 excel at video understanding with multi-frame analysis.',
}

export default function VLMMultimodal() {
  return (
    <div className="vlm-multimodal">
      {/* Pipeline Diagram */}
      <div className="vlm-pipeline">
        <div className="pipeline-stage">
          <div className="pipeline-icon"><Image size={20} /></div>
          <div className="pipeline-label">Image Input</div>
        </div>
        <div className="pipeline-arrow">→</div>
        <div className="pipeline-stage">
          <div className="pipeline-icon"><Hash size={20} /></div>
          <div className="pipeline-label">Patch Grid</div>
          <div className="pipeline-sublabel">(e.g., 16×16 px)</div>
        </div>
        <div className="pipeline-arrow">→</div>
        <div className="pipeline-stage">
          <div className="pipeline-icon"><Hash size={20} /></div>
          <div className="pipeline-label">Vision Tokens</div>
        </div>
        <div className="pipeline-plus">+</div>
        <div className="pipeline-stage">
          <div className="pipeline-icon"><Type size={20} /></div>
          <div className="pipeline-label">Text Tokens</div>
        </div>
        <div className="pipeline-arrow">→</div>
        <div className="pipeline-stage pipeline-output">
          <div className="pipeline-icon"><Zap size={20} /></div>
          <div className="pipeline-label">Multimodal Model</div>
        </div>
      </div>

      {/* Concept Cards */}
      <div className="vlm-cards">
        {CONCEPT_CARDS.map((card, i) => (
          <div key={i} className="vlm-card">
            <div className="vlm-card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      {/* Video Understanding Card */}
      <div className="vlm-card vlm-card-full">
        <div className="vlm-card-icon">{VIDEO_CARD.icon}</div>
        <h3>{VIDEO_CARD.title}</h3>
        <p>{VIDEO_CARD.description}</p>
      </div>

      {/* Model Comparison Table */}
      <div className="vlm-table-wrap">
        <h3 className="vlm-table-title">Vision Model Comparison (March 2026)</h3>
        <div className="table-scroll">
          <table className="vlm-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Provider</th>
                <th>Image</th>
                <th>Video</th>
                <th>Context</th>
                <th>Key Strengths</th>
              </tr>
            </thead>
            <tbody>
              {VLM_MODELS.map((model) => (
                <tr key={model.name}>
                  <td className="model-name">{model.name}</td>
                  <td>
                    <span
                      className="provider-badge"
                      style={{
                        '--provider-color': PROVIDER_COLORS[model.provider] ?? '#6b7280',
                      } as React.CSSProperties}
                    >
                      {model.provider}
                    </span>
                  </td>
                  <td className="check-cell">✓</td>
                  <td className="check-cell">{model.videoInput ? '✓' : '—'}</td>
                  <td className="resolution-cell">{model.contextWindow}</td>
                  <td className="strengths-cell">{model.strengths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
