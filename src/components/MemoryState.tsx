import { useState } from 'react'
import { MessageSquare, Settings2, Cpu, AlertTriangle, Check, X, Plus, Minus } from 'lucide-react'
import './MemoryState.css'

type MemoryStrategy = 'full' | 'summarized' | 'lastN' | 'stateless'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  tokens: number
}

const SAMPLE_MESSAGES: { role: 'user' | 'assistant'; content: string; tokens: number }[] = [
  { role: 'user', content: "Hi! I'm planning a trip to Japan", tokens: 8 },
  { role: 'assistant', content: "That sounds exciting! I'd love to help. What dates are you thinking?", tokens: 12 },
  { role: 'user', content: "March 15-25, 2026. First time there!", tokens: 9 },
  { role: 'assistant', content: "Great choice! March is perfect - cherry blossoms and mild weather. Let me ask a few questions to plan your itinerary.", tokens: 16 },
  { role: 'user', content: "I love anime and want to visit Akihabara", tokens: 8 },
  { role: 'assistant', content: "Akihabara is amazing! You can find everything from vintage anime merch to the latest figures. I'd recommend the Radio Kaikan building and the Pokemon Center.", tokens: 22 },
  { role: 'user', content: "Also interested in traditional temples and gardens", tokens: 9 },
  { role: 'assistant', content: "Kyoto is perfect for that! Kinkaku-ji (Golden Pavilion), Fushimi Inari shrine, and the Arashiyama bamboo grove are must-sees. I can help you plan day trips from Tokyo.", tokens: 24 },
  { role: 'user', content: "What about food? I love sushi!", tokens: 7 },
  { role: 'assistant', content: "You're in for a treat! For the best sushi, try Tsukiji outer market or book a seat at a top sushi-ya. Don't miss trying okonomiyaki in Osaka too!", tokens: 20 },
  { role: 'user', content: "Can you help me find hotels too?", tokens: 7 },
  { role: 'assistant', content: "Absolutely! What kind of accommodation are you looking for? Budget hostels, traditional ryokans, or luxury hotels? And which areas do you prefer - Shinjuku, Shibuya, or near the stations?", tokens: 26 },
]

const CONTEXT_LIMIT = 100 // tokens for demo purposes

export default function MemoryState() {
  const [strategy, setStrategy] = useState<MemoryStrategy>('lastN')
  const [showAllMessages, setShowAllMessages] = useState(false)
  
  // Build conversation based on strategy
  const getMessages = (): Message[] => {
    let messages = SAMPLE_MESSAGES.slice(0, showAllMessages ? SAMPLE_MESSAGES.length : 6).map((m, i) => ({
      ...m,
      id: i + 1,
    }))

    switch (strategy) {
      case 'full':
        return messages
      case 'summarized':
        return messages.length > 6 
          ? [
              { id: 0, role: 'assistant', content: '[Summary: User planning Japan trip March 15-25. Interested in anime, temples, sushi. Needs hotel recommendations.]', tokens: 18 },
              ...messages.slice(-4)
            ]
          : messages
      case 'lastN':
        return messages.slice(-4)
      case 'stateless':
        return messages.slice(-1)
      default:
        return messages
    }
  }

  const messages = getMessages()
  const totalTokens = messages.reduce((sum, m) => sum + m.tokens, 0)
  const isTruncated = strategy === 'lastN' || strategy === 'summarized'

  return (
    <div className="ms-wrap">
      {/* Header explainer */}
      <div className="ms-header">
        <h2>Memory & State Management</h2>
        <p className="ms-header-desc">
          How LLMs maintain conversation context across multiple turns, and the tradeoffs of different approaches.
        </p>
      </div>

      {/* Three concepts grid */}
      <div className="ms-concepts">
        <div className="ms-concept">
          <div className="concept-icon"><MessageSquare size={20} /></div>
          <h4>Conversation History</h4>
          <p>
            The array of messages (user + assistant) that gets passed to the model. 
            Each turn adds to this history, allowing the LLM to reference prior context.
          </p>
          <div className="concept-code">
            <code>{'[{"role": "user", "content": "Hi"}, {"role": "assistant", "content": "Hello!"}, ...]'}</code>
          </div>
        </div>

        <div className="ms-concept">
          <div className="concept-icon"><Settings2 size={20} /></div>
          <h4>Context Window Management</h4>
          <p>
            Strategies to handle the limited context window. When history exceeds the limit, 
            you must truncate, summarize, or retrieve relevant past messages.
          </p>
          <div className="concept-tags">
            <span>truncation</span>
            <span>summarization</span>
            <span>retrieval</span>
          </div>
        </div>

        <div className="ms-concept">
          <div className="concept-icon"><Cpu size={20} /></div>
          <h4>Stateful vs Stateless</h4>
          <p>
            <strong>Stateful</strong>: Accumulate history across requests. 
            <strong>Stateless</strong>: Send only the current message. 
            Stateful requires more tokens but preserves context.
          </p>
          <div className="concept-comparison">
            <span className="stateful">Stateful: Full context</span>
            <span className="stateless">Stateless: No memory</span>
          </div>
        </div>
      </div>

      {/* Interactive demo */}
      <div className="ms-demo-section">
        <h3>Interactive Demo</h3>
        <p className="ms-demo-desc">
          See how different memory strategies handle a growing conversation. 
          The context limit shows when truncation kicks in.
        </p>

        <div className="ms-demo">
          {/* Strategy selector */}
          <div className="ms-strategy-panel">
            <div className="strategy-label">Memory Strategy</div>
            <div className="strategy-options">
              <button 
                className={`strategy-btn ${strategy === 'full' ? 'active' : ''}`}
                onClick={() => setStrategy('full')}
              >
                <span className="strategy-name">Full History</span>
                <span className="strategy-desc">Keep all messages</span>
              </button>
              <button 
                className={`strategy-btn ${strategy === 'summarized' ? 'active' : ''}`}
                onClick={() => setStrategy('summarized')}
              >
                <span className="strategy-name">Summarized</span>
                <span className="strategy-desc">Compress old turns</span>
              </button>
              <button 
                className={`strategy-btn ${strategy === 'lastN' ? 'active' : ''}`}
                onClick={() => setStrategy('lastN')}
              >
                <span className="strategy-name">Last N Messages</span>
                <span className="strategy-desc">Rolling window</span>
              </button>
              <button 
                className={`strategy-btn ${strategy === 'stateless' ? 'active' : ''}`}
                onClick={() => setStrategy('stateless')}
              >
                <span className="strategy-name">Stateless</span>
                <span className="strategy-desc">No memory</span>
              </button>
            </div>

            <div className="demo-controls">
              <button 
                className="expand-btn"
                onClick={() => setShowAllMessages(!showAllMessages)}
              >
                {showAllMessages ? 'Show fewer messages' : 'Add more messages (simulate long chat)'}
              </button>
            </div>
          </div>

          {/* Message visualization */}
          <div className="ms-messages-panel">
            <div className="messages-header">
              <span>Conversation Messages</span>
              <div className="token-counter">
                <span className={`token-count ${totalTokens > CONTEXT_LIMIT ? 'over-limit' : ''}`}>
                  {totalTokens} tokens
                </span>
                <span className="limit-bar">
                  <span 
                    className={`limit-fill ${totalTokens > CONTEXT_LIMIT ? 'over' : ''}`}
                    style={{ width: `${Math.min((totalTokens / CONTEXT_LIMIT) * 100, 100)}%` }}
                  />
                  <span className="limit-marker" style={{ left: `${(CONTEXT_LIMIT / 150) * 100}%` }} />
                </span>
                <span className="limit-label">Limit: {CONTEXT_LIMIT}</span>
              </div>
            </div>

            <div className="messages-list">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`message-item ${msg.role} ${strategy === 'stateless' ? 'stateless-msg' : ''}`}
                >
                  <div className="msg-role">{msg.role === 'user' ? 'User' : 'Assistant'}</div>
                  <div className="msg-content">{msg.content}</div>
                  <div className="msg-tokens">{msg.tokens} tokens</div>
                </div>
              ))}
              
              {isTruncated && (
                <div className="truncation-notice">
                  <span className="trunc-icon"><AlertTriangle size={14} /></span>
                  <span>
                    {strategy === 'summarized' 
                      ? 'Older messages summarized into a single summary'
                      : strategy === 'lastN' 
                        ? 'Older messages dropped (rolling window)'
                        : 'Only the latest message retained (stateless)'}
                  </span>
                </div>
              )}
            </div>

            {strategy === 'stateless' && (
              <div className="stateless-warning">
                <strong>Note:</strong> Each request only contains the current message. 
                The model has no memory of previous turns - it can't reference "what you said earlier".
              </div>
            )}
          </div>
        </div>

        {/* Strategy details */}
        <div className="strategy-details">
          <div className={`strategy-card ${strategy === 'full' ? 'active' : ''}`}>
            <h4>Full History</h4>
            <p>Preserves the complete conversation. Best for short conversations within context limits. Simple to implement but hits ceiling quickly.</p>
            <div className="strategy-pros-cons">
              <span className="pros"><Check size={12} /> Complete context</span>
              <span className="cons"><X size={12} /> Expensive, limited history</span>
            </div>
          </div>

          <div className={`strategy-card ${strategy === 'summarized' ? 'active' : ''}`}>
            <h4>Summarized</h4>
            <p>Uses an LLM to compress old messages into a summary. Preserves the gist while freeing tokens. Trade-off: loses nuance and specific details.</p>
            <div className="strategy-pros-cons">
              <span className="pros"><Plus size={12} /> More history, semantic retention</span>
              <span className="cons"><Minus size={12} /> Extra LLM call, loses detail</span>
            </div>
          </div>

          <div className={`strategy-card ${strategy === 'lastN' ? 'active' : ''}`}>
            <h4>Last N Messages</h4>
            <p>Rolling window of the most recent N messages. Simple and predictable. Risk: losing critical context from earlier in the conversation.</p>
            <div className="strategy-pros-cons">
              <span className="pros"><Check size={12} /> Fast, deterministic</span>
              <span className="cons"><X size={12} /> May lose important context</span>
            </div>
          </div>

          <div className={`strategy-card ${strategy === 'stateless' ? 'active' : ''}`}>
            <h4>Stateless</h4>
            <p>No memory between requests. Each message is independent. Use cases: simple Q&A, stateless APIs, or when explicit memory isn't needed.</p>
            <div className="strategy-pros-cons">
              <span className="pros"><Check size={12} /> Cheap, no context bloat</span>
              <span className="cons"><X size={12} /> No conversation continuity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation note */}
      <div className="ms-impl-note">
        <h4>Implementation Tip</h4>
        <p>
          Most production systems use a <strong>hybrid approach</strong>: keep recent messages in a rolling window, 
          maintain a running summary of older content, and use RAG for long-term memory. 
          This balances cost, latency, and context preservation.
        </p>
      </div>
    </div>
  )
}