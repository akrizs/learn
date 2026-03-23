import { Wand2, Layers, Zap, Settings, Crop, Ban, Shuffle, RefreshCw, Image as ImageIcon } from 'lucide-react'
import './ImageGeneration.css'

// Provider colors
const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: '#10b981',
  'Stability AI': '#f59e0b',
  'Black Forest Labs': '#8b5cf6',
  Midjourney: '#ec4899',
  Google: '#eab308',
}

interface ImageGenModel {
  name: string
  provider: string
  maxResolution: string
  aspectRatios: string
  strengths: string
  pricing: string
}

const IMAGE_GEN_MODELS: ImageGenModel[] = [
  { name: 'DALL-E 3', provider: 'OpenAI', maxResolution: '1024×1024', aspectRatios: '1:1, 16:9, 9:16', strengths: 'ChatGPT integration, prompt adherence, safety filters', pricing: '$0.04/image' },
  { name: 'Stable Diffusion 3', provider: 'Stability AI', maxResolution: '1024×1024', aspectRatios: 'All ratios', strengths: 'Open-source, local deployment, SDXL Turbo for speed', pricing: 'Free (self-hosted)' },
  { name: 'Flux', provider: 'Black Forest Labs', maxResolution: '1024×1024', aspectRatios: 'All ratios', strengths: 'Photorealistic quality, detail rendering, open weights', pricing: 'Free (self-hosted)' },
  { name: 'Midjourney v7', provider: 'Midjourney', maxResolution: '1024×1024', aspectRatios: 'All ratios', strengths: 'Artistic quality, aesthetic consistency, stylization', pricing: '$10/month' },
  { name: 'Imagen 3', provider: 'Google', maxResolution: '1024×1024', aspectRatios: '1:1, 4:3, 3:4, 16:9, 9:16', strengths: 'High fidelity, text rendering, natural lighting', pricing: '$0.00-0.03/image' },
]

// Key concepts
const CONCEPT_CARDS = [
  {
    icon: <Wand2 size={24} />,
    title: 'Diffusion Process',
    description: 'Image generation uses a diffusion model that progressively removes noise from random noise to create an image. This reverse process (denoising) learns to reconstruct patterns from training data.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Latent Space',
    description: 'Images are represented in a compressed latent space where similar images cluster together. The model navigates this space to interpolate between concepts and generate novel combinations.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Guidance Scale',
    description: 'Classifier-free guidance controls how strictly the model follows the prompt vs. sampling more creatively. Higher values (7-12) produce closer prompt adherence; lower values (1-4) add creativity.',
  },
  {
    icon: <Settings size={24} />,
    title: 'Negative Prompts',
    description: 'Negative prompts specify what to exclude from generation. Common uses: removing unwanted objects, adjusting composition, avoiding specific styles or artifacts.',
  },
  {
    icon: <Crop size={24} />,
    title: 'Resolution & Aspect Ratios',
    description: 'Different models support different resolutions and aspect ratios. SD models allow flexible output sizes; DALL-E uses fixed sizes. Upscaling is often needed for high-res output.',
  },
  {
    icon: <Ban size={24} />,
    title: 'Prompt Engineering',
    description: 'Effective prompts include subject, setting, lighting, mood, and technical modifiers. Phrases like "photorealistic," "4k," or "cinematic lighting" dramatically affect output quality.',
  },
]

// Diffusion process steps
const DIFFUSION_STEPS = [
  { icon: <Shuffle size={24} />, label: 'Random Noise', desc: 'Start with random Gaussian noise' },
  { icon: <RefreshCw size={24} />, label: 'Denoise Step 1', desc: 'Model predicts and removes noise' },
  { icon: <RefreshCw size={24} />, label: 'Denoise Step N', desc: 'Iterative refinement (20-50 steps)' },
  { icon: <ImageIcon size={24} />, label: 'Final Image', desc: 'Complete latent is decoded to pixels' },
]

export default function ImageGeneration() {
  return (
    <div className="image-generation">
      {/* Fundamentals: How It Works */}
      <div className="ig-section">
        <h3 className="ig-section-title">How Image Generation Works</h3>
        <p className="ig-section-desc">
          Modern AI image generation relies on <strong>diffusion models</strong>. The process works by starting with random noise and progressively denoising it through learned reverse diffusion. Models are trained on millions of image-text pairs, learning to reconstruct images from progressively noisier versions. The text prompt guides the generation by conditioning the model's denoising process.
        </p>
      </div>

      {/* Diffusion Process Diagram */}
      <div className="ig-diffusion">
        {DIFFUSION_STEPS.map((step, i) => (
          <div key={i} className="diffusion-step">
            <div className="diffusion-icon">{step.icon}</div>
            <div className="diffusion-label">{step.label}</div>
            <div className="diffusion-desc">{step.desc}</div>
            {i < DIFFUSION_STEPS.length - 1 && <div className="diffusion-arrow">→</div>}
          </div>
        ))}
      </div>

      {/* Key Concepts */}
      <div className="ig-cards">
        {CONCEPT_CARDS.map((card, i) => (
          <div key={i} className="ig-card">
            <div className="ig-card-icon">{card.icon}</div>
            <h4>{card.title}</h4>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      {/* Model Comparison */}
      <div className="ig-table-wrap">
        <h3 className="ig-table-title">Image Generation Models (March 2026)</h3>
        <div className="table-scroll">
          <table className="ig-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Provider</th>
                <th>Max Resolution</th>
                <th>Aspect Ratios</th>
                <th>Key Strengths</th>
                <th>Pricing</th>
              </tr>
            </thead>
            <tbody>
              {IMAGE_GEN_MODELS.map((model) => (
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
                  <td className="resolution-cell">{model.maxResolution}</td>
                  <td className="ratio-cell">{model.aspectRatios}</td>
                  <td className="strengths-cell">{model.strengths}</td>
                  <td className="pricing-cell">{model.pricing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
