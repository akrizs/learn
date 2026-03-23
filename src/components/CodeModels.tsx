import { useState, useMemo } from 'react'
import { Hexagon, Sparkles, Bug, Eye, GitPullRequest, FileText, Zap } from 'lucide-react'
import './CodeModels.css'

// Benchmark definitions for code models
const CODE_BENCHMARKS = [
  { id: 'humaneval', name: 'HumanEval', description: 'Python code generation' },
  { id: 'swe-bench', name: 'SWE-bench', description: 'Real-world software engineering' },
  { id: 'livecodebench', name: 'LiveCodeBench', description: 'Recent coding challenges' },
]

// Provider colors
const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: '#f97316',
  OpenAI: '#10b981',
  DeepSeek: '#8b5cf6',
  Meta: '#f59e0b',
  HuggingFace: '#3b82f6',
  Alibaba: '#06b6d4',
}

// Code model benchmark data - March 2026
interface CodeModelData {
  model: string
  provider: string
  humaneval: number
  'swe-bench': number
  livecodebench: number
  languages: string
  specialties: string
}

const CODE_MODEL_DATA: CodeModelData[] = [
  { model: 'Claude Sonnet 4.6', provider: 'Anthropic', humaneval: 97.6, 'swe-bench': 80.8, livecodebench: 78.2, languages: '50+', specialties: 'SWE leader, autonomous agents' },
  { model: 'Claude Haiku 4.5', provider: 'Anthropic', humaneval: 92.4, 'swe-bench': 68.6, livecodebench: 62.4, languages: '50+', specialties: 'Fast code completion' },
  { model: 'GPT-5.4', provider: 'OpenAI', humaneval: 94.2, 'swe-bench': 76.5, livecodebench: 71.8, languages: '50+', specialties: 'Multilingual, Codex powered' },
  { model: 'GPT-4.1', provider: 'OpenAI', humaneval: 91.5, 'swe-bench': 68.2, livecodebench: 64.5, languages: '50+', specialties: 'Code completion, context aware' },
  { model: 'DeepSeek Coder V2', provider: 'DeepSeek', humaneval: 92.8, 'swe-bench': 65.4, livecodebench: 58.2, languages: '100+', specialties: 'Open source, longest context' },
  { model: 'CodeLlama 70B', provider: 'Meta', humaneval: 84.8, 'swe-bench': 48.2, livecodebench: 42.6, languages: '50+', specialties: 'Open source, fine-tuned variants' },
  { model: 'Llama 4 70B', provider: 'Meta', humaneval: 82.4, 'swe-bench': 52.4, livecodebench: 46.8, languages: '50+', specialties: 'Mobile deployment capable' },
  { model: 'StarCoder 2 15B', provider: 'HuggingFace', humaneval: 78.2, 'swe-bench': 38.4, livecodebench: 34.2, languages: '80+', specialties: 'Open source, permissionless' },
  { model: 'Qwen 2.5 Coder 32B', provider: 'Alibaba', humaneval: 88.6, 'swe-bench': 58.2, livecodebench: 52.4, languages: '92+', specialties: 'Fast inference, bilingual' },
]

const PROVIDERS = [...new Set(CODE_MODEL_DATA.map((d) => d.provider))]

type SortKey = 'model' | 'provider' | 'score'

// Pure function for score tier
const getScoreTier = (score: number): 'excellent' | 'good' | 'needs-improvement' => {
  if (score >= 90) return 'excellent'
  if (score >= 70) return 'good'
  return 'needs-improvement'
}

function CodeModelsCards() {
  const cards = [
    {
      icon: <Hexagon size={20} />,
      title: 'Code Generation',
      description: 'Specialized training on code repositories (GitHub), multi-language support',
      tags: 'Python, JS, Rust, Go, TypeScript',
    },
    {
      icon: <Eye size={20} />,
      title: 'Code Understanding',
      description: 'Code completion, bug detection, code review, documentation generation',
      tags: 'Static analysis, context-aware suggestions',
    },
    {
      icon: <Sparkles size={20} />,
      title: 'Code Agents',
      description: 'Autonomous coding assistants, repository-level tasks, test generation, refactoring',
      tags: 'Multi-step, tool use, self-correction',
    },
  ]

  return (
    <div className="code-models-cards">
      {cards.map((card) => (
        <div key={card.title} className="code-models-card">
          <div className="code-models-card-icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p className="code-models-card-desc">{card.description}</p>
          <p className="code-models-card-tags">{card.tags}</p>
        </div>
      ))}
    </div>
  )
}

function CodeModelsTable({
  selectedBenchmark,
  setSelectedBenchmark,
  selectedProviders,
  sortKey,
  sortAsc,
  onSort,
  onToggleProvider,
}: {
  selectedBenchmark: string
  setSelectedBenchmark: (v: string) => void
  selectedProviders: Set<string>
  sortKey: SortKey
  sortAsc: boolean
  onSort: (key: SortKey) => void
  onToggleProvider: (p: string) => void
}) {
  const getScore = (row: CodeModelData): number => {
    return row[selectedBenchmark as keyof CodeModelData] as number
  }

  const filtered = useMemo(() => {
    return CODE_MODEL_DATA
      .filter((d) => selectedProviders.has(d.provider))
      .sort((a, b) => {
        let av: string | number, bv: string | number
        if (sortKey === 'model') { av = a.model; bv = b.model }
        else if (sortKey === 'provider') { av = a.provider; bv = b.provider }
        else { av = getScore(a); bv = getScore(b) }

        if (av < bv) return sortAsc ? -1 : 1
        if (av > bv) return sortAsc ? 1 : -1
        return 0
      })
  }, [selectedProviders, sortKey, sortAsc, selectedBenchmark])

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      <span className="code-models-sort-icon">{sortAsc ? '↑' : '↓'}</span>
    ) : (
      <span className="code-models-sort-icon code-models-sort-icon-idle">↕</span>
    )

  const currentBenchmark = CODE_BENCHMARKS.find((b) => b.id === selectedBenchmark)!

  return (
    <div className="code-models-table-section">
      <div className="code-models-table-header">
        <h3>Benchmark Comparison</h3>
        <select
          className="code-models-benchmark-select"
          value={selectedBenchmark}
          onChange={(e) => setSelectedBenchmark(e.target.value)}
        >
          {CODE_BENCHMARKS.map((b) => (
            <option key={b.id} value={b.id}>{b.name} — {b.description}</option>
          ))}
        </select>
      </div>

      <div className="code-models-provider-filters">
        {PROVIDERS.map((p) => (
          <button
            key={p}
            className={`code-models-provider-btn ${selectedProviders.has(p) ? 'active' : ''}`}
            style={{ '--provider-color': PROVIDER_COLORS[p] ?? '#6b7280' } as React.CSSProperties}
            onClick={() => onToggleProvider(p)}
          >
            <span className="code-models-provider-dot" />
            {p}
          </button>
        ))}
      </div>

      <div className="code-models-table-scroll">
        <table className="code-models-table">
          <thead>
            <tr>
              <th className="code-models-sortable" onClick={() => onSort('model')}>
                Model <SortIcon col="model" />
              </th>
              <th className="code-models-sortable" onClick={() => onSort('provider')}>
                Provider <SortIcon col="provider" />
              </th>
              <th className="code-models-sortable" onClick={() => onSort('score')}>
                {currentBenchmark.name} <SortIcon col="score" />
              </th>
              <th>Languages</th>
              <th>Specialties</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => {
              const score = getScore(row)
              const tier = getScoreTier(score)
              return (
                <tr key={`${row.model}-${idx}`}>
                  <td className="code-models-model-name">{row.model}</td>
                  <td>
                    <span
                      className="code-models-provider-badge"
                      style={{ '--provider-color': PROVIDER_COLORS[row.provider] ?? '#6b7280' } as React.CSSProperties}
                    >
                      {row.provider}
                    </span>
                  </td>
                  <td className="code-models-score-cell">
                    <span className={`code-models-score code-models-score-${tier}`}>
                      {score.toFixed(1)}%
                    </span>
                  </td>
                  <td className="code-models-languages">{row.languages}</td>
                  <td className="code-models-specialties">{row.specialties}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="code-models-legend">
        <span className="code-models-legend-item">
          <span className="code-models-legend-dot code-models-legend-excellent" /> Excellent (&gt;90%)
        </span>
        <span className="code-models-legend-item">
          <span className="code-models-legend-dot code-models-legend-good" /> Good (70-90%)
        </span>
        <span className="code-models-legend-item">
          <span className="code-models-legend-dot code-models-legend-needs" /> Needs improvement (&lt;70%)
        </span>
      </div>
    </div>
  )
}

function CodeModelsUseCases() {
  const useCases = [
    { icon: <Zap size={18} />, title: 'Autocomplete', description: 'Real-time code suggestions' },
    { icon: <Bug size={18} />, title: 'Bug Detection', description: 'Find and fix issues' },
    { icon: <GitPullRequest size={18} />, title: 'Code Review', description: 'Automated PR reviews' },
    { icon: <FileText size={18} />, title: 'Documentation', description: 'Generate docstrings and comments' },
    { icon: <Sparkles size={18} />, title: 'Refactoring', description: 'Improve code quality' },
  ]

  return (
    <div className="code-models-use-cases">
      <h3>Use Cases</h3>
      <div className="code-models-use-cases-grid">
        {useCases.map((uc) => (
          <div key={uc.title} className="code-models-use-case">
            <span className="code-models-use-case-icon">{uc.icon}</span>
            <div>
              <h4>{uc.title}</h4>
              <p>{uc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CodeModels() {
  const [selectedBenchmark, setSelectedBenchmark] = useState('swe-bench')
  const [selectedProviders, setSelectedProviders] = useState<Set<string>>(new Set(PROVIDERS))
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const [sortAsc, setSortAsc] = useState(false)

  const toggleProvider = (p: string) => {
    setSelectedProviders((prev) => {
      const next = new Set(prev)
      if (next.has(p)) {
        if (next.size === 1) return prev
        next.delete(p)
      } else {
        next.add(p)
      }
      return next
    })
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((v) => !v)
    } else {
      setSortKey(key)
      setSortAsc(key === 'score' ? false : true)
    }
  }

  return (
    <div className="code-models">
      <CodeModelsCards />
      <CodeModelsTable
        selectedBenchmark={selectedBenchmark}
        setSelectedBenchmark={setSelectedBenchmark}
        selectedProviders={selectedProviders}
        sortKey={sortKey}
        sortAsc={sortAsc}
        onSort={handleSort}
        onToggleProvider={toggleProvider}
      />
      <CodeModelsUseCases />
    </div>
  )
}
