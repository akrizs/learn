import { useState } from 'react'
import './SystemPrompts.css'

type PromptType = 'simple' | 'bad' | 'good' | 'few-shot'

interface Example {
  type: PromptType
  label: string
}

const EXAMPLES: Example[] = [
  { type: 'simple', label: 'Simple Prompt' },
  { type: 'bad', label: 'Bad Example' },
  { type: 'good', label: 'Good Example' },
  { type: 'few-shot', label: 'Few-shot' },
]

const PROMPT_CONTENT: Record<PromptType, { title: string; prompt: string; response: string }> = {
  simple: {
    title: 'Simple System Prompt',
    prompt: 'You are a helpful coding assistant.',
    response: 'User: How do I reverse a string in Python?\n\nAssistant: You can use slicing with [::-1] to reverse a string.\n\n```python\ns = "hello"\nreversed_s = s[::-1]\n```',
  },
  bad: {
    title: 'Bad System Prompt',
    prompt: 'Be helpful. Answer questions. Be good at coding.',
    response: 'User: Write me a function to sort a list\n\nAssistant: Sure! Here\'s a sorting function:\n\n```python\ndef sort_list(lst):\n    return sorted(lst)\n```\n\nThe vague prompt leads to generic, sometimes incomplete answers.',
  },
  good: {
    title: 'Good System Prompt',
    prompt: `You are an expert Python developer.
- Write clean, well-documented code with type hints
- Use Python 3.10+ features when appropriate
- Include docstrings for all functions
- Prioritize readability and maintainability
- Ask clarifying questions if the request is ambiguous`,
    response: 'User: Write me a function to sort a list\n\nAssistant: I\'d be happy to help! Could you clarify:\n1. What type of sorting? (ascending/descending)\n2. In-place or return new list?\n3. Any performance constraints?\n\nHere\'s a general solution:\n\n```python\nfrom typing import TypeVar\nT = TypeVar("T")\n\ndef sort_list(items: list[T], reverse: bool = False) -> list[T]:\n    """Sort a list and return a new sorted list."""\n    return sorted(items, reverse=reverse)\n```',
  },
  'few-shot': {
    title: 'Few-shot in System Prompt',
    prompt: `You are a code reviewer. Analyze PRs and provide feedback.

Example format:
## Summary
[Brief description of changes]

## Issues
- [List issues found]`,
    response: 'User: Analyze this PR: Added user authentication\n\n## Summary\nAdded JWT-based authentication system with login/logout functionality.\n\n## Issues\n- Missing rate limiting on login endpoint\n- No password reset functionality\n- Tests cover only happy path',
  },
}

const BEST_PRACTICES = [
  {
    title: 'Be Specific',
    description: 'Clear, detailed instructions reduce ambiguity and improve consistency.',
  },
  {
    title: 'Use Examples',
    description: 'Few-shot examples demonstrate the exact format and style expected.',
  },
  {
    title: 'Define Boundaries',
    description: 'Explicitly state what the model should and should not do.',
  },
  {
    title: 'Set Tone & Role',
    description: 'Define the persona and communication style for consistent responses.',
  },
]

function SystemPrompts() {
  const [activeTab, setActiveTab] = useState<PromptType>('simple')

  const currentPrompt = PROMPT_CONTENT[activeTab]

  return (
    <div className="system-prompts">
      {/* Best Practices Cards */}
      <div className="sp-cards">
        {BEST_PRACTICES.map((practice, idx) => (
          <div key={idx} className="sp-card">
            <h4>{practice.title}</h4>
            <p>{practice.description}</p>
          </div>
        ))}
      </div>

      {/* Interactive Playground */}
      <div className="sp-playground">
        <div className="sp-header">
          <h3>System Prompt Playground</h3>
          <p>Compare different system prompt approaches</p>
        </div>

        {/* Tabs */}
        <div className="sp-tabs">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.type}
              className={`sp-tab ${activeTab === ex.type ? 'active' : ''}`}
              onClick={() => setActiveTab(ex.type)}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Prompt Display */}
        <div className="sp-prompt-box">
          <div className="sp-label">System Prompt</div>
          <pre className="sp-prompt">{currentPrompt.prompt}</pre>
        </div>

        {/* Response Display */}
        <div className="sp-response-box">
          <div className="sp-label">Example Response</div>
          <pre className="sp-response">{currentPrompt.response}</pre>
        </div>
      </div>
    </div>
  )
}

export default SystemPrompts
