import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import './Glossary.css'

interface GlossaryTerm {
  term: string
  definition: string
  anchor: string
  category: string
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  // A
  { term: 'Attention', definition: 'A mechanism that allows models to focus on relevant parts of input when generating output, weighting importance dynamically.', anchor: 'transformer', category: 'Architecture' },
  { term: 'Alignment', definition: 'The process of ensuring AI systems behave in ways that are helpful, harmless, and honest to human values.', anchor: 'alignment-safety', category: 'Safety' },
  
  // B
  { term: 'BPE (Byte Pair Encoding)', definition: 'A tokenization method that iteratively merges the most frequent adjacent byte pairs to build a vocabulary.', anchor: 'tokenizer', category: 'Tokenization' },

  // C
  { term: 'Chain-of-Thought (CoT)', definition: 'A prompting technique that encourages the model to show its reasoning step-by-step before giving the final answer.', anchor: 'prompting', category: 'Prompting' },
  { term: 'Context Window', definition: 'The maximum number of tokens a model can process in a single prompt, determining how much history it can consider.', anchor: 'context-window', category: 'Model Config' },

  // D
  { term: 'Decoder', definition: 'The part of a Transformer that generates output tokens one at a time, using attention on previous tokens and encoder context.', anchor: 'transformer', category: 'Architecture' },
  { term: 'DPO (Direct Preference Optimization)', definition: 'A training method that optimizes models directly on human preference comparisons without explicit reward models.', anchor: 'training-pipeline', category: 'Training' },

  // E
  { term: 'Embedding', definition: 'A numerical vector representation of text that captures semantic meaning, enabling similarity comparisons and retrieval.', anchor: 'embeddings', category: 'Data Processing' },
  { term: 'Encoder', definition: 'The part of a Transformer that processes input and creates representations that can be used by the decoder.', anchor: 'transformer', category: 'Architecture' },

  // F
  { term: 'Few-shot', definition: 'A prompting approach that provides 2-5 examples in the prompt to demonstrate the desired output format.', anchor: 'prompting', category: 'Prompting' },
  { term: 'Fine-tuning', definition: 'The process of adapting a pre-trained model to a specific task or domain by continuing training on specialized data.', anchor: 'fine-tuning', category: 'Training' },
  { term: 'Function Calling', definition: 'The ability of an LLM to invoke external tools or functions with structured parameters to complete tasks.', anchor: 'agents', category: 'Capabilities' },

  // G
  { term: 'Grounding', definition: 'Ensuring model outputs are factually accurate and connected to reliable sources rather than fabricated information.', anchor: 'limitations', category: 'Safety' },

  // H
  { term: 'Hallucination', definition: 'When a model generates confident but factually incorrect or nonsensical responses.', anchor: 'limitations', category: 'Limitations' },

  // L
  { term: 'LLM (Large Language Model)', definition: 'A deep learning model trained on massive text data to understand and generate human-like language.', anchor: 'llm-basics', category: 'Model Types' },
  { term: 'LoRA (Low-Rank Adaptation)', definition: 'A parameter-efficient fine-tuning method that adds small trainable matrices to model weights without full retraining.', anchor: 'fine-tuning', category: 'Training' },

  // M
  { term: 'MMLM (Multimodal Large Language Model)', definition: 'An LLM capable of processing and generating multiple modalities like text, images, audio, and video.', anchor: 'vlm', category: 'Model Types' },
  { term: 'Memory State', definition: 'Techniques for maintaining conversation context across multiple turns using conversation history or external storage.', anchor: 'memory', category: 'Architecture' },

  // P
  { term: 'Prompt Engineering', definition: 'The practice of crafting inputs to a model to achieve desired outputs, including techniques like few-shot and CoT.', anchor: 'prompting', category: 'Techniques' },

  // R
  { term: 'RAG (Retrieval-Augmented Generation)', definition: 'A technique that augments LLM prompts with relevant information retrieved from a knowledge base.', anchor: 'rag', category: 'Architecture' },
  { term: 'RLHF (Reinforcement Learning from Human Feedback)', definition: 'Training method that uses human preference data to fine-tune models via reinforcement learning.', anchor: 'training-pipeline', category: 'Training' },

  // S
  { term: 'SFT (Supervised Fine-Tuning)', definition: 'Training a pre-trained model on labeled examples of the target task to adapt its behavior.', anchor: 'training-pipeline', category: 'Training' },
  { term: 'System Prompt', definition: 'Instructions given to an LLM that set its behavior, role, and constraints for all subsequent interactions.', anchor: 'system-prompts', category: 'Prompting' },

  // T
  { term: 'Temperature', definition: 'A sampling parameter that controls randomness in token selection—lower values produce deterministic outputs.', anchor: 'sampling', category: 'Model Config' },
  { term: 'Token', definition: 'The basic unit of text that models process—a word, subword, or character—converted to numerical IDs.', anchor: 'tokenizer', category: 'Tokenization' },
  { term: 'Tokenizer', definition: 'The component that splits text into tokens and converts them to numeric IDs for the model to process.', anchor: 'tokenizer', category: 'Tokenization' },
  { term: 'Tool Use', definition: 'The capability of an AI agent to call external functions, APIs, or tools to accomplish tasks beyond text generation.', anchor: 'agents', category: 'Capabilities' },
  { term: 'Top-p (Nucleus Sampling)', definition: 'A sampling method that selects from the smallest set of tokens whose cumulative probability exceeds threshold p.', anchor: 'sampling', category: 'Model Config' },
  { term: 'Transformer', definition: 'The neural network architecture introduced in 2017, using self-attention to process sequential data efficiently.', anchor: 'transformer', category: 'Architecture' },

  // V
  { term: 'Vector', definition: 'An ordered list of numbers representing data in high-dimensional space, used for semantic similarity calculations.', anchor: 'embeddings', category: 'Data Processing' },
  { term: 'VLM (Vision Language Model)', definition: 'A model that processes both images and text, capable of answering questions about visual content.', anchor: 'vlm', category: 'Model Types' },
]

function groupTermsByLetter(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {}
  for (const t of terms) {
    const letter = t.term[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(t)
  }
  return grouped
}

export default function Glossary() {
  const [search, setSearch] = useState('')

  const filteredTerms = useMemo(() => {
    if (!search.trim()) return GLOSSARY_TERMS
    const query = search.toLowerCase()
    return GLOSSARY_TERMS.filter(
      (t) => t.term.toLowerCase().includes(query) || t.definition.toLowerCase().includes(query)
    )
  }, [search])

  const groupedTerms = useMemo(() => groupTermsByLetter(filteredTerms), [filteredTerms])
  const letters = Object.keys(groupedTerms).sort()

  return (
    <div className="glossary">
      <div className="glossary-header">
        <span className="glossary-tag">Reference</span>
        <h2>Glossary</h2>
        <p>Quick reference for key AI and LLM terminology</p>
      </div>

      <div className="glossary-search">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="glossary-content">
        {letters.length === 0 ? (
          <div className="no-results">
            <p>No terms found for "{search}"</p>
          </div>
        ) : (
          letters.map((letter) => (
            <div key={letter} className="glossary-letter-section">
              <h3 className="letter-heading">{letter}</h3>
              <div className="terms-grid">
                {groupedTerms[letter].map((item) => (
                  <a
                    key={item.term}
                    href={`#${item.anchor}`}
                    className="glossary-item"
                  >
                    <span className="term-name">{item.term}</span>
                    <span className="term-category">{item.category}</span>
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}