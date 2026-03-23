import { useState } from 'react'
import { Wrench, RefreshCw, Clapperboard, Eye, Lightbulb, Zap, Repeat, Search, Code, BarChart3, BookOpen, ArrowRight } from 'lucide-react'
import './AgentsToolUse.css'

// Pure function to format JSON with syntax highlighting
const formatJson = (obj: object): string => JSON.stringify(obj, null, 2)

// Sample tool definitions for the demo
const TOOL_DEFINITIONS = [
  {
    name: 'get_weather',
    description: 'Get current weather for a location',
    params: { location: { type: 'string', description: 'City name' } }
  },
  {
    name: 'web_search',
    description: 'Search the web for information',
    params: { query: { type: 'string', description: 'Search query' } }
  },
  {
    name: 'execute_code',
    description: 'Run Python code in a sandboxed environment',
    params: { code: { type: 'string', description: 'Python code to execute' } }
  }
]

// Agent loop steps
const LOOP_STEPS = [
  { id: 'observe', label: 'Observe', desc: 'Receive user query', icon: <Eye size={20} /> },
  { id: 'think', label: 'Think', desc: 'Reason about next action', icon: <Lightbulb size={20} /> },
  { id: 'act', label: 'Act', desc: 'Call tool or respond', icon: <Zap size={20} /> },
  { id: 'repeat', label: 'Repeat', desc: 'Continue until done', icon: <Repeat size={20} /> }
]

export default function AgentsToolUse() {
  const [activeTool, setActiveTool] = useState(0)
  const tool = TOOL_DEFINITIONS[activeTool]

  // Build the tool call example
  const toolCallExample = {
    tool_calls: [{
      id: 'call_abc123',
      name: tool.name,
      arguments: tool.name === 'get_weather'
        ? { location: 'San Francisco' }
        : tool.name === 'web_search'
        ? { query: 'latest AI research' }
        : { code: 'print("Hello, world!")' }
    }]
  }

  return (
    <div className="agents-tool-use-wrap">
      {/* 3-Column Concept Cards */}
      <div className="atu-cards">
        <div className="atu-card">
          <div className="atu-card-icon"><Wrench size={24} /></div>
          <h3>Function Calling</h3>
          <p>
            Structured outputs that let models invoke predefined tools.
            Define tools with JSON schemas, specify parameters, and receive
            typed responses the model can act on.
          </p>
          <div className="atu-card-tags">
            <span className="atu-tag">Structured outputs</span>
            <span className="atu-tag">JSON schema</span>
          </div>
        </div>

        <div className="atu-card">
          <div className="atu-card-icon"><RefreshCw size={24} /></div>
          <h3>ReAct Pattern</h3>
          <p>
            Reasoning + Acting in a loop. The model thinks step-by-step,
            decides to use tools, observes results, and iterates until
            reaching a final answer.
          </p>
          <div className="atu-card-tags">
            <span className="atu-tag">Think-Act-Observe</span>
            <span className="atu-tag">Multi-step reasoning</span>
          </div>
        </div>

        <div className="atu-card">
          <div className="atu-card-icon"><Clapperboard size={24} /></div>
          <h3>Tool Orchestration</h3>
          <p>
            Coordinate multiple tools in sequence or parallel. Chain search
            → extract → verify, or run independent queries concurrently
            for faster results.
          </p>
          <div className="atu-card-tags">
            <span className="atu-tag">Sequencing</span>
            <span className="atu-tag">Parallel execution</span>
          </div>
        </div>
      </div>

      {/* Agent Loop Diagram */}
      <div className="atu-loop-section">
        <h3 className="atu-sub-heading">The Agent Loop</h3>
        <div className="atu-loop-diagram">
          {LOOP_STEPS.map((step, i) => (
            <div key={step.id} className="atu-loop-step">
              <div className="atu-loop-node">
                <span className="atu-loop-icon">{step.icon}</span>
                <span className="atu-loop-label">{step.label}</span>
                <span className="atu-loop-desc">{step.desc}</span>
              </div>
              {i < LOOP_STEPS.length - 1 && (
                <div className="atu-loop-arrow"><ArrowRight size={16} /></div>
              )}
            </div>
          ))}
        </div>
        <div className="atu-loop-note">
          The loop continues until the model decides it has enough information to respond.
        </div>
      </div>

      {/* Interactive Function Calling Demo */}
      <div className="atu-demo-section">
        <h3 className="atu-sub-heading">Function Calling Demo</h3>
        <p className="atu-demo-intro">
          Select a tool to see how tool definitions and function calls are structured.
        </p>

        <div className="atu-demo-tabs">
          {TOOL_DEFINITIONS.map((t, i) => (
            <button
              key={t.name}
              className={`atu-demo-tab ${activeTool === i ? 'active' : ''}`}
              onClick={() => setActiveTool(i)}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="atu-demo-panels">
          <div className="atu-demo-panel">
            <div className="atu-panel-label">Tool Definition</div>
            <pre className="atu-code-block">{`{
  "name": "${tool.name}",
  "description": "${tool.description}",
  "parameters": {
    "type": "object",
    "properties": {
${Object.entries(tool.params).map(([key, val]) =>
        `      "${key}": { "type": "${val.type}", "description": "${val.description}" }`
      ).join(',\n')}
    }
  }
}`}</pre>
          </div>

          <div className="atu-demo-panel">
            <div className="atu-panel-label">Tool Call Request</div>
            <pre className="atu-code-block">{formatJson(toolCallExample)}</pre>
          </div>
        </div>
      </div>

      {/* Code Example Block */}
      <div className="atu-example-section">
        <h3 className="atu-sub-heading">Example Response</h3>
        <pre className="atu-code-block atu-code-large">{`// Tool executes and returns result:
{
  "tool_call_id": "call_abc123",
  "output": ${tool.name === 'get_weather'
    ? JSON.stringify({ temp: 68, condition: 'Sunny', location: 'San Francisco' })
    : tool.name === 'web_search'
    ? JSON.stringify({ results: ['Article 1...', 'Article 2...', 'Article 3...'] })
    : JSON.stringify({ output: 'Hello, world!', execution_time_ms: 42 })
  }
}

// Model continues reasoning or provides final answer...`}</pre>
      </div>

      {/* Real-world Examples */}
      <div className="atu-examples-section">
        <h3 className="atu-sub-heading">Real-world Agent Examples</h3>
        <div className="atu-examples-grid">
          <div className="atu-example-item">
            <span className="atu-example-icon"><Search size={20} /></span>
            <div>
              <strong>Web Search Agents</strong>
              <p>Search, browse pages, extract information, cite sources</p>
            </div>
          </div>
          <div className="atu-example-item">
            <span className="atu-example-icon"><Code size={20} /></span>
            <div>
              <strong>Code Execution Agents</strong>
              <p>Run code, debug errors, execute tests, iterate until correct</p>
            </div>
          </div>
          <div className="atu-example-item">
            <span className="atu-example-icon"><BarChart3 size={20} /></span>
            <div>
              <strong>Data Analysis Agents</strong>
              <p>Query databases, aggregate results, generate reports</p>
            </div>
          </div>
          <div className="atu-example-item">
            <span className="atu-example-icon"><BookOpen size={20} /></span>
            <div>
              <strong>Research Assistants</strong>
              <p>Find papers, summarize findings, compare viewpoints</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
