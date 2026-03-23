import { useState, useMemo } from 'react'
import './PromptEngineering.css'

type Technique = 'zero-shot' | 'few-shot' | 'cot'

interface Example {
  label: string
  prompt: string
}

const EXAMPLES: Record<Technique, Example[]> = {
  'zero-shot': [
    { label: 'Classification', prompt: 'Classify this review as positive, negative, or neutral:\n\n"I absolutely love this product! It works perfectly and arrived quickly."' },
    { label: 'Translation', prompt: 'Translate to French:\n\n"Where is the nearest train station?"' },
    { label: 'Summarization', prompt: 'Summarize this text in one sentence:\n\n"Climate change refers to long-term shifts in global temperatures and weather patterns. While natural factors can cause climate variability, human activities have been the primary driver since the Industrial Revolution."' },
  ],
  'few-shot': [
    { label: 'Sentiment', prompt: 'Classify the sentiment of sentences as positive or negative:\n\n"I loved the movie" → Positive\n"The service was terrible" → Negative\n"This exceeded all expectations" → ' },
    { label: 'Formatting', prompt: 'Convert these dates to ISO format:\n\n"January 15, 2024" → "2024-01-15"\n"March 8, 2023" → "2023-03-08"\n"December 31, 2025" → ' },
    { label: 'Reasoning', prompt: 'Complete the analogy:\n\n"hot is to cold as fast is to ___\nslow is to quick as happy is to ___\nbig is to small as tall is to ___' },
  ],
  'cot': [
    { label: 'Math', prompt: 'Solve: If a train travels 120 miles in 2 hours, what is its average speed?\n\nLet\'s think step by step:\n1. Distance = 120 miles\n2. Time = 2 hours\n3. Speed = Distance ÷ Time\n4. Speed = 120 ÷ 2 = 60 mph' },
    { label: 'Logic', prompt: 'All cats are animals. Some animals are black. Is it true that some cats are black?\n\nLet\'s reason through this:\n1. All cats are animals (so every cat is within the set of animals)\n2. Some animals are black (at least one animal is black)\n3. Since cats are animals, it\'s possible that a cat could be black\n4. Therefore, yes, it\'s possible that some cats are black' },
    { label: 'Debug', prompt: 'Why is this function returning the wrong value?\n\n```\nfunction findMax(arr) {\n  let max = 0\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i]\n    }\n  }\n  return max\n}\n```\n\nStep-by-step analysis:\n1. Initialize max = 0\n2. Compare each element to max\n3. If greater, update max\n4. Problem: If array contains negative numbers, max stays 0\n5. Fix: Initialize with first element or use -Infinity' },
  ],
}

const TECHNIQUE_INFO = {
  'zero-shot': { title: 'Zero-shot', desc: 'Direct questions without examples. Best for straightforward tasks when the model has enough context.' },
  'few-shot': { title: 'Few-shot', desc: 'Provide 2-5 examples in the prompt to show the desired format and pattern.' },
  'cot': { title: 'Chain-of-Thought', desc: 'Encourage step-by-step reasoning by asking the model to explain its thinking.' },
}

const formatPrompt = (technique: Technique, base: string): string => {
  switch (technique) {
    case 'zero-shot':
      return base
    case 'few-shot':
      return base.includes('→') ? base : base
    case 'cot':
      return base.includes("step by step") || base.includes("Let's think")
        ? base
        : base + '\n\nLet\'s think step by step:'
  }
}

export default function PromptEngineering() {
  const [technique, setTechnique] = useState<Technique>('zero-shot')
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const preview = useMemo(() => formatPrompt(technique, input), [technique, input])

  const loadExample = (example: Example) => {
    setInput(example.prompt)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(preview)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="prompt-engineering">
      {/* Comparison Table */}
      <div className="technique-table">
        <h3>Technique Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Technique</th>
              <th>Accuracy</th>
              <th>Token Cost</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Zero-shot</strong></td>
              <td>60-70%</td>
              <td>Lowest</td>
              <td>Simple, common tasks</td>
            </tr>
            <tr>
              <td><strong>Few-shot</strong></td>
              <td>80-90%</td>
              <td>Medium</td>
              <td>Format-sensitive tasks</td>
            </tr>
            <tr>
              <td><strong>Chain-of-Thought</strong></td>
              <td>85-95%</td>
              <td>Highest</td>
              <td>Complex reasoning</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Builder */}
      <div className="builder">
        <div className="builder-header">
          <h3>Prompt Template Builder</h3>
          <p>Select a technique and write or load an example prompt</p>
        </div>

        <div className="technique-tabs">
          {(Object.keys(TECHNIQUE_INFO) as Technique[]).map((t) => (
            <button
              key={t}
              className={`technique-tab ${technique === t ? 'active' : ''}`}
              onClick={() => setTechnique(t)}
            >
              {TECHNIQUE_INFO[t].title}
            </button>
          ))}
        </div>

        <div className="technique-description">
          <p>{TECHNIQUE_INFO[technique].desc}</p>
        </div>

        <div className="example-prompts">
          <span className="example-label">Load example:</span>
          {EXAMPLES[technique].map((ex, i) => (
            <button
              key={i}
              className="example-btn"
              onClick={() => loadExample(ex)}
            >
              {ex.label}
            </button>
          ))}
        </div>

        <textarea
          className="prompt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your prompt here or load an example above..."
          rows={6}
        />

        <div className="preview-container">
          <div className="preview-header">
            <span>Formatted Preview</span>
            <button className="copy-btn" onClick={copyToClipboard}>
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          </div>
          <pre className="prompt-preview">
            {preview || 'Your formatted prompt will appear here...'}
          </pre>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="dos-donts">
        <div className="dos">
          <h4>Do</h4>
          <ul>
            <li>Be specific and clear about the desired output format</li>
            <li>Include context relevant to the task</li>
            <li>Use few-shot examples that match the expected difficulty</li>
            <li>Chain-of-thought works best with "Let&apos;s think step by step"</li>
          </ul>
        </div>
        <div className="donts">
          <h4>Don&apos;t</h4>
          <ul>
            <li>Overload prompts with irrelevant information</li>
            <li>Use contradictory or confusing examples</li>
            <li>Rely on single examples for ambiguous tasks</li>
            <li>Assume the model knows your specific domain terminology</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
