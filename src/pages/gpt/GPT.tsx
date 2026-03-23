import '../../App.css'
import { Triangle, Circle, Hexagon } from 'lucide-react'
import TokenVisualizer from '../../components/TokenVisualizer'
import ContextWindow from '../../components/ContextWindow'
import TransformerArchitecture from '../../components/TransformerArchitecture'
import TrainingPipeline from '../../components/TrainingPipeline'
import VLMMultimodal from '../../components/VLMMultimodal'
import ImageGeneration from '../../components/ImageGeneration'
import EmbeddingsVectorSearch from '../../components/EmbeddingsVectorSearch'
import RAGArchitecture from '../../components/RAGArchitecture'
import FineTuningVsRAG from '../../components/FineTuningVsRAG'
import OpenSourceModels from '../../components/OpenSourceModels'
import LLMEvaluation from '../../components/LLMEvaluation'
import AlignmentSafety from '../../components/AlignmentSafety'
import LLMLimitations from '../../components/LLMLimitations'
import CodeModels from '../../components/CodeModels'
import PromptEngineering from '../../components/PromptEngineering'
import SystemPrompts from '../../components/SystemPrompts'
import TemperatureSampling from '../../components/TemperatureSampling'
import MemoryState from '../../components/MemoryState'
import StreamingResponses from '../../components/StreamingResponses'
import AgentsToolUse from '../../components/AgentsToolUse'
import PricingTable from '../../components/PricingTable'
import InfraStack from '../../components/InfraStack'
import CostCalculator from '../../components/CostCalculator'
import QuickStart from '../../components/QuickStart'
import Glossary from '../../components/Glossary'
import ScalingLaws from '../../components/ScalingLaws'
import { useComplexity } from '../../context/ComplexityContext'

export default function GPT() {
  const { complexity } = useComplexity()
  const isSimple = complexity === 'simple'

  return (
    <div className="gpt-page">
      {/* Hero */}
      <header id="hero">
        <p className="eyebrow">Complete AI Education</p>
        <h1>Understanding&nbsp;AI&nbsp;&amp;&nbsp;LLMs</h1>
        <p className="subtitle">
          {isSimple
            ? 'Learn how AI language models work, from basic concepts to practical applications.'
            : 'A comprehensive guide to large language models — from tokens and architecture to training, building, and deploying production AI applications.'}
        </p>
        <div className="hero-nav">
          <a href="#quickstart">Start</a>
          <a href="#what-are-tokens">Tokens</a>
          <a href="#transformer">Architecture</a>
          <a href="#context-window">Context</a>
          <a href="#multimodal">Multimodal</a>
          <a href="#embeddings">Embeddings</a>
          <a href="#rag">RAG</a>
          <a href="#evaluation">Evaluation</a>
          <a href="#prompting">Prompting</a>
          <a href="#agents">Agents</a>
          <a href="#infrastructure">Infrastructure</a>
          <a href="#glossary">Glossary</a>
        </div>
      </header>

      <div className="ticks" />

      {/* Quick Start */}
      <section id="quickstart" className="content-section">
        <QuickStart />
      </section>

      <div className="ticks" />

      {/* What are tokens */}
      <section id="what-are-tokens" className="content-section">
        <div className="section-header">
          <span className="section-tag">Foundation 01</span>
          <h2>What are tokens?</h2>
          <p>
            Tokens are the basic units of text that an LLM processes. {isSimple
              ? 'Think of them as pieces of words that the AI reads.'
              : 'They are not simply words or characters — they are sub-word fragments produced by a compression algorithm called Byte-Pair Encoding (BPE).'}
          </p>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon"><Hexagon size={20} /></div>
            <h3>Not words</h3>
            <p>
              {isSimple
                ? 'One word can be split into multiple tokens.'
                : 'A single English word can be 1, 2, or even 3+ tokens. "cat" is one token; "unbelievable" might be split into "un", "believ", "able".'}
            </p>
          </div>
          <div className="card">
            <div className="card-icon"><Triangle size={20} /></div>
            <h3>Not characters</h3>
            <p>
              {isSimple
                ? 'About 4 characters make up one token on average.'
                : '4 characters is a rough average per token in English. Other languages (e.g. Chinese) use more tokens per word because their characters are less common in training data.'}
            </p>
          </div>
          <div className="card">
            <div className="card-icon"><Circle size={20} /></div>
            <h3>Sub-word fragments</h3>
            <p>
              {isSimple
                ? 'Common words stay as one token, rare words get split up.'
                : 'BPE merges the most frequent character pairs until a target vocabulary size is reached (GPT-4 uses ~100 k tokens). Common words stay whole; rare ones are split.'}
            </p>
          </div>
        </div>

        <div className="explainer-grid">
          <div className="explainer-box">
            <h3>How BPE works</h3>
            <ol className="steps">
              <li>
                <span className="step-num">1</span>
                Start with individual characters as the vocabulary.
              </li>
              <li>
                <span className="step-num">2</span>
                Count all adjacent character pairs in the training corpus.
              </li>
              <li>
                <span className="step-num">3</span>
                Merge the most frequent pair into a new token, add it to the vocabulary.
              </li>
              <li>
                <span className="step-num">4</span>
                Repeat until the vocabulary reaches its target size (~50 k–100 k entries).
              </li>
              <li>
                <span className="step-num">5</span>
                At inference time, encode new text using the learned merge rules.
              </li>
            </ol>
          </div>

          <div className="explainer-box">
            <h3>Why it matters</h3>
            <ul className="why-list">
              <li>
                <strong>Context window</strong> — models have a hard limit on total tokens. {isSimple ? 'This limits how much text they can read at once.' : 'GPT-5 supports up to 256 k tokens at once.'}
              </li>
              <li>
                <strong>Speed</strong> — generating 1,000 tokens takes longer than 100 tokens. Response latency scales with output token count.
              </li>
              <li>
                <strong>Cost</strong> — every API call is billed by the token. Understanding token counts lets you estimate and control spend.
              </li>
              {!isSimple && (
                <li>
                  <strong>Prompt engineering</strong> — shorter prompts use fewer tokens, reducing cost and freeing space for model output.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="callout">
          <span className="callout-label">Rule of thumb</span>
          <p>
            In English, <strong>1 token ≈ 4 characters</strong> or <strong>~0.75 words</strong>. {isSimple
              ? 'A paragraph of text is roughly 100-150 tokens.'
              : 'A page of text (~500 words) is roughly 667 tokens.'}
          </p>
        </div>
      </section>

      <div className="ticks" />

      {/* Token Visualizer */}
      <section id="visualizer" className="content-section">
        <div className="section-header">
          <span className="section-tag">Interactive</span>
          <h2>Token visualizer</h2>
          <p>
            Type any text below to see how it might be split into tokens. Each colored segment represents one token.
          </p>
        </div>
        <TokenVisualizer />
      </section>

      <div className="ticks" />

      {/* Scaling Laws */}
      <section id="scaling-laws" className="content-section">
        <div className="section-header">
          <span className="section-tag">Foundation</span>
          <h2>Scaling Laws &amp; Emergent Capabilities</h2>
          <p>
            Understanding how model capabilities scale with size and compute helps inform decisions about model selection.
          </p>
        </div>
        <ScalingLaws />
      </section>

      <div className="ticks" />

      {/* Transformer Architecture */}
      <section id="transformer" className="content-section">
        <div className="section-header">
          <span className="section-tag">Architecture</span>
          <h2>Transformer Architecture</h2>
          <p>
            The transformer architecture powers all modern LLMs. {isSimple
              ? 'It lets models understand relationships between all parts of a sentence at once.'
              : 'Understanding self-attention, encoder/decoder designs, and key innovations helps you choose the right model and debug unexpected outputs.'}
          </p>
        </div>
        <TransformerArchitecture />
      </section>

      <div className="ticks" />

      {/* Training Pipeline */}
      <section id="training" className="content-section">
        <div className="section-header">
          <span className="section-tag">Architecture</span>
          <h2>How LLMs are Trained</h2>
          <p>
            Understanding the training process helps explain model capabilities and limitations.
          </p>
        </div>
        <TrainingPipeline />
      </section>

      <div className="ticks" />

      {/* Open Source Models */}
      <section id="open-source" className="content-section">
        <OpenSourceModels />
      </section>

      <div className="ticks" />

      {/* Context Window */}
      <section id="context-window" className="content-section">
        <div className="section-header">
          <span className="section-tag">Architecture</span>
          <h2>Context windows &amp; compaction</h2>
          <p>
            Every LLM has a finite context window — the total number of tokens it can process at once.
          </p>
        </div>
        <ContextWindow />
      </section>

      <div className="ticks" />

      {/* VLM & Multimodal */}
      <section id="multimodal" className="content-section">
        <div className="section-header">
          <span className="section-tag">Architecture</span>
          <h2>VLM &amp; Multimodal Models</h2>
          <p>
            Vision-Language Models extend text-only LLMs to process images, audio, and video.
          </p>
        </div>
        <VLMMultimodal />
      </section>

      <div className="ticks" />

      {/* Image Generation */}
      <section id="image-generation" className="content-section">
        <div className="section-header">
          <span className="section-tag">Architecture</span>
          <h2>Image Generation Models</h2>
          <p>
            AI image generation has evolved from simple GANs to sophisticated diffusion models.
          </p>
        </div>
        <ImageGeneration />
      </section>

      <div className="ticks" />

      {/* Embeddings */}
      <section id="embeddings" className="content-section">
        <div className="section-header">
          <span className="section-tag">Knowledge</span>
          <h2>Embeddings &amp; Vector Search</h2>
          <p>
            Text embeddings are the foundation of semantic search and RAG systems.
          </p>
        </div>
        <EmbeddingsVectorSearch />
      </section>

      <div className="ticks" />

      {/* RAG */}
      <section id="rag" className="content-section">
        <div className="section-header">
          <span className="section-tag">Knowledge</span>
          <h2>RAG Architecture</h2>
          <p>
            Retrieval-Augmented Generation combines the power of language models with external knowledge bases.
          </p>
        </div>
        <RAGArchitecture />
      </section>

      <div className="ticks" />

      {/* Fine-tuning vs RAG */}
      <section id="fine-tuning" className="content-section">
        <div className="section-header">
          <span className="section-tag">Knowledge</span>
          <h2>Fine-tuning vs RAG</h2>
          <p>
            Two powerful approaches to customize LLM behavior.
          </p>
        </div>
        <FineTuningVsRAG />
      </section>

      <div className="ticks" />

      {/* LLM Evaluation */}
      <section id="evaluation" className="content-section">
        <div className="section-header">
          <span className="section-tag">Evaluation</span>
          <h2>LLM Evaluation</h2>
          <p>
            Evaluate large language models using standardized benchmarks.
          </p>
        </div>
        <LLMEvaluation />
      </section>

      <div className="ticks" />

      {/* Limitations */}
      <section id="limitations" className="content-section">
        <div className="section-header">
          <span className="section-tag">Evaluation</span>
          <h2>LLM Limitations</h2>
          <p>
            Understanding what LLMs cannot do is as important as knowing their capabilities.
          </p>
        </div>
        <LLMLimitations />
      </section>

      <div className="ticks" />

      {/* Alignment & Safety */}
      <section id="safety" className="content-section">
        <div className="section-header">
          <span className="section-tag">Evaluation</span>
          <h2>Alignment &amp; Safety</h2>
          <p>
            Ensuring AI systems behave as intended and avoid harmful outputs.
          </p>
        </div>
        <AlignmentSafety />
      </section>

      <div className="ticks" />

      {/* Code Models */}
      <section id="code-models" className="content-section">
        <div className="section-header">
          <span className="section-tag">Evaluation</span>
          <h2>Code Models</h2>
          <p>
            Specialized code generation models trained on software repositories.
          </p>
        </div>
        <CodeModels />
      </section>

      <div className="ticks" />

      {/* Prompt Engineering */}
      <section id="prompting" className="content-section">
        <div className="section-header">
          <span className="section-tag">Practical Skills</span>
          <h2>Prompt Engineering</h2>
          <p>
            Craft effective prompts to get better responses from LLMs.
          </p>
        </div>
        <PromptEngineering />
      </section>

      <div className="ticks" />

      {/* System Prompts */}
      <section id="system-prompts" className="content-section">
        <div className="section-header">
          <span className="section-tag">Practical Skills</span>
          <h2>System Prompts</h2>
          <p>
            System prompts set the context and behavior for every conversation.
          </p>
        </div>
        <SystemPrompts />
      </section>

      <div className="ticks" />

      {/* Temperature & Sampling */}
      <section id="temperature" className="content-section">
        <div className="section-header">
          <span className="section-tag">Practical Skills</span>
          <h2>Temperature &amp; Sampling</h2>
          <p>
            Control the randomness and creativity of model outputs.
          </p>
        </div>
        <TemperatureSampling />
      </section>

      <div className="ticks" />

      {/* Memory & State */}
      <section id="memory" className="content-section">
        <div className="section-header">
          <span className="section-tag">Practical Skills</span>
          <h2>Memory &amp; State</h2>
          <p>
            Managing conversation history and context across multiple turns.
          </p>
        </div>
        <MemoryState />
      </section>

      <div className="ticks" />

      {/* Streaming Responses */}
      <section id="streaming" className="content-section">
        <div className="section-header">
          <span className="section-tag">Practical Skills</span>
          <h2>Streaming Responses</h2>
          <p>
            Token-by-token streaming for better user experience.
          </p>
        </div>
        <StreamingResponses />
      </section>

      <div className="ticks" />

      {/* Agents & Tool Use */}
      <section id="agents" className="content-section">
        <div className="section-header">
          <span className="section-tag">Practical Skills</span>
          <h2>Agents &amp; Tool Use</h2>
          <p>
            AI agents extend language models with the ability to use tools, search the web, execute code, and more.
          </p>
        </div>
        <AgentsToolUse />
      </section>

      <div className="ticks" />

      {/* Input vs Output Tokens */}
      <section id="pricing" className="content-section">
        <div className="section-header">
          <span className="section-tag">Deployment</span>
          <h2>Input vs. output tokens</h2>
          <p>
            LLM APIs distinguish between tokens you send (input) and tokens the model generates (output).
          </p>
        </div>

        <div className="io-diagram">
          <div className="io-box io-input">
            <div className="io-label">Input tokens</div>
            <div className="io-examples">
              <span>System prompt</span>
              <span>Conversation history</span>
              <span>Your message</span>
              <span>Retrieved documents (RAG)</span>
            </div>
            <div className="io-price-hint">Lower cost/token</div>
          </div>
          <div className="io-arrow">
            <div className="arrow-line" />
            <div className="arrow-model">Model</div>
            <div className="arrow-line" />
          </div>
          <div className="io-box io-output">
            <div className="io-label">Output tokens</div>
            <div className="io-examples">
              <span>Model's reply</span>
              <span>Generated code</span>
              <span>Summaries</span>
              <span>Reasoning traces</span>
            </div>
            <div className="io-price-hint">Higher cost/token</div>
          </div>
        </div>

        <div className="cards cards-2">
          <div className="card">
            <h3>Prompt caching</h3>
            <p>
              Some providers offer a <strong>cache read</strong> discount — if your prompt starts with the same prefix as a recent call, the cached prefix is re-used and billed at a fraction of normal input cost.
            </p>
          </div>
          <div className="card">
            <h3>Reasoning tokens</h3>
            <p>
              Models like OpenAI o1/o3 and DeepSeek R1 produce internal <em>reasoning tokens</em> before the final answer. These are billed as output tokens but are typically hidden.
            </p>
          </div>
        </div>
      </section>

      <div className="ticks" />

      {/* Pricing Table */}
      <section id="pricing-table" className="content-section">
        <div className="section-subheader">
          <h2>Model pricing comparison</h2>
          <p>
            Prices per 1 million tokens (USD), sourced from{' '}
            <a href="https://models.dev" target="_blank" rel="noreferrer">
              models.dev
            </a>
            .
          </p>
        </div>
        <PricingTable />
      </section>

      <div className="ticks" />

      {/* Infrastructure */}
      <section id="infrastructure" className="content-section">
        <div className="section-header">
          <span className="section-tag">Deployment</span>
          <h2>LLM infrastructure stack</h2>
          <p>
            A chat response travels through nine distinct layers of infrastructure before it reaches your screen.
          </p>
        </div>
        <InfraStack />
      </section>

      <div className="ticks" />

      {/* Cost Calculator */}
      <section id="calculator" className="content-section">
        <div className="section-header">
          <span className="section-tag">Interactive</span>
          <h2>Cost calculator</h2>
          <p>
            Estimate the cost of an API call by specifying token counts and selecting a model.
          </p>
        </div>
        <CostCalculator />
      </section>

      <div className="ticks" />

      {/* Glossary */}
      <section id="glossary" className="content-section">
        <Glossary />
      </section>

      <div className="ticks" />
      <footer id="footer">
        <p>
          Pricing data from{' '}
          <a href="https://models.dev" target="_blank" rel="noreferrer">
            models.dev
          </a>
          . Prices may change — always verify with the provider's official documentation.
        </p>
      </footer>
    </div>
  )
}
