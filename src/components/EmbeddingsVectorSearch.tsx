import { useState } from 'react'
import { ArrowLeftRight, Box, Network } from 'lucide-react'
import './EmbeddingsVectorSearch.css'

// Word pairs with pre-computed similarities for the demo
const SIMILARITY_PAIRS: Record<string, Record<string, number>> = {
  'king': { queen: 0.92, man: 0.68, woman: 0.72, dog: 0.15, computer: 0.08 },
  'queen': { king: 0.92, man: 0.62, woman: 0.89, dog: 0.14, computer: 0.09 },
  'man': { king: 0.68, queen: 0.62, woman: 0.85, dog: 0.22, computer: 0.12 },
  'woman': { king: 0.72, queen: 0.89, man: 0.85, dog: 0.20, computer: 0.11 },
  'dog': { cat: 0.78, lion: 0.65, king: 0.15, man: 0.22, computer: 0.10 },
  'cat': { dog: 0.78, lion: 0.58, king: 0.14, man: 0.21, computer: 0.09 },
  'computer': { software: 0.82, algorithm: 0.75, phone: 0.68, king: 0.08, dog: 0.10 },
  'software': { computer: 0.82, algorithm: 0.71, phone: 0.52, king: 0.07, dog: 0.08 },
  'pizza': { sushi: 0.65, banana: 0.25, dog: 0.12, computer: 0.05 },
  'sushi': { pizza: 0.65, banana: 0.22, dog: 0.14, computer: 0.06 },
}

const VECTOR_DATABASES = [
  { name: 'Pinecone', type: 'Managed', description: 'Fully managed, cloud-native vector database' },
  { name: 'Weaviate', type: 'Open Source', description: 'Open source, with GraphQL and REST APIs' },
  { name: 'Chroma', type: 'Open Source', description: 'Developer-friendly, Python-first embedding store' },
  { name: 'pgvector', type: 'Extension', description: 'PostgreSQL extension for vector similarity search' },
  { name: 'Qdrant', type: 'Open Source', description: 'High-performance, Rust-based vector search engine' },
]

const WORD_OPTIONS = ['king', 'queen', 'man', 'woman', 'cat', 'dog', 'computer', 'software', 'pizza', 'sushi']

function SimilarityDemo() {
  const [word1, setWord1] = useState('king')
  const [word2, setWord2] = useState('queen')

  // Look up similarity from pre-computed pairs
  const similarity = SIMILARITY_PAIRS[word1]?.[word2] ?? SIMILARITY_PAIRS[word2]?.[word1]

  const getInterpretation = (score: number | undefined) => {
    if (score === undefined) return { text: 'Enter two words', class: 'unknown' }
    if (score > 0.8) return { text: 'Highly similar', class: 'high' }
    if (score > 0.5) return { text: 'Somewhat similar', class: 'medium' }
    if (score > 0.3) return { text: 'Loosely related', class: 'low' }
    return { text: 'Not related', class: 'none' }
  }

  const interpretation = getInterpretation(similarity)

  return (
    <div className="embeddings-similarity-demo">
      <div className="similarity-header">
        <h4>Cosine Similarity Calculator</h4>
        <p>Select two words to see their semantic similarity score</p>
      </div>
      
      <div className="similarity-inputs">
        <select 
          value={word1} 
          onChange={(e) => setWord1(e.target.value)}
          className="similarity-select"
        >
          {WORD_OPTIONS.map(w => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
        
        <span className="similarity-vs">↔</span>
        
        <select 
          value={word2} 
          onChange={(e) => setWord2(e.target.value)}
          className="similarity-select"
        >
          {WORD_OPTIONS.map(w => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      {similarity !== undefined ? (
        <div className="similarity-result">
          <div className="similarity-visual">
            <div 
              className="similarity-bar"
              style={{ width: `${similarity * 100}%` }}
            />
          </div>
          <div className="similarity-values">
            <span className="similarity-value">{similarity.toFixed(2)}</span>
            <span className={`similarity-interpretation ${interpretation.class}`}>
              {interpretation.text}
            </span>
          </div>
        </div>
      ) : (
        <div className="similarity-hint">
          These words don't have a similarity score in our demo database
        </div>
      )}
    </div>
  )
}

function Word2VecDemo() {
  const [activePair, setActivePair] = useState(0)
  
  const pairs = [
    { words: ['king', 'queen', 'man', 'woman'], label: 'Word2Vec Classic', description: 'Semantic relationships captured by embeddings' },
    { words: ['cat', 'dog', 'lion', 'bird'], label: 'Animal Cluster', description: 'Related concepts cluster together' },
    { words: ['computer', 'software', 'phone', 'algorithm'], label: 'Tech Cluster', description: 'Domain-specific groupings' },
  ]

  return (
    <div className="embeddings-word2vec-demo">
      <div className="demo-tabs">
        {pairs.map((pair, idx) => (
          <button
            key={idx}
            className={`demo-tab ${activePair === idx ? 'active' : ''}`}
            onClick={() => setActivePair(idx)}
          >
            {pair.label}
          </button>
        ))}
      </div>
      
      <div className="demo-content">
        <div className="demo-words">
          {pairs[activePair].words.map((word, idx) => (
            <div key={word} className="demo-word">
              <span className="word-bubble">{word}</span>
              {idx < pairs[activePair].words.length - 1 && (
                <span className="word-connector">—</span>
              )}
            </div>
          ))}
        </div>
        <p className="demo-description">{pairs[activePair].description}</p>
      </div>
    </div>
  )
}

function VectorDBComparison() {
  return (
    <div className="embeddings-db-table">
      <table>
        <thead>
          <tr>
            <th>Database</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {VECTOR_DATABASES.map((db) => (
            <tr key={db.name}>
              <td className="db-name">{db.name}</td>
              <td><span className={`db-type ${db.type.toLowerCase().replace(' ', '-')}`}>{db.type}</span></td>
              <td className="db-desc">{db.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function EmbeddingsVectorSearch() {
  return (
    <div className="embeddings-content">
      <div className="cards">
        <div className="card">
          <div className="card-icon"><Box size={20} /></div>
          <h3>What are Embeddings</h3>
          <p>
            Dense vector representations of text. Semantic meaning encoded as
            numbers in high-dimensional space. Similar text maps to similar
            vectors — this is the foundation of semantic search.
          </p>
        </div>
        <div className="card">
          <div className="card-icon"><Network size={20} /></div>
          <h3>How Embedding Models Work</h3>
          <p>
            Transformer-based encoders (BERT, SBERT, OpenAI text-embedding-3)
            convert text into vectors. Typical dimensions: 384-3072. Models
            like text-embedding-3-large use 3072 dimensions to capture
            nuanced semantic relationships.
          </p>
        </div>
        <div className="card">
          <div className="card-icon"><ArrowLeftRight size={20} /></div>
          <h3>Cosine Similarity</h3>
          <p>
            Measures angle between vectors. Formula: (A · B) / (||A|| × ||B||).
            Range: -1 to 1, where 1 = identical, 0 = orthogonal, -1 = opposite.
            Used to rank search results by semantic relevance.
          </p>
        </div>
      </div>

      <div className="embeddings-interactive">
        <div className="interactive-header">
          <h3>Interactive Embeddings Demo</h3>
          <p>Explore how semantic similarity works with embeddings</p>
        </div>
        
        <SimilarityDemo />
        <Word2VecDemo />
      </div>

      <div className="embeddings-db-section">
        <h3>Vector Databases</h3>
        <p>Popular options for storing and searching embeddings at scale</p>
        <VectorDBComparison />
      </div>
    </div>
  )
}
