import { useState, useMemo } from 'react'
import { Diamond } from 'lucide-react'
import './LLMEvaluation.css'

// Benchmark definitions - updated with current benchmarks
const BENCHMARKS = [
  { id: 'mmlu', name: 'MMLU', description: 'Massive Multitask Language Understanding', subjects: '57 subjects, broad knowledge' },
  { id: 'mmlu-pro', name: 'MMLU-Pro', description: 'Harder variant with 10 options', subjects: 'Graduate-level knowledge' },
  { id: 'humaneval', name: 'HumanEval', description: 'Python code generation', subjects: 'Pass@1 metrics' },
  { id: 'gpqa', name: 'GPQA Diamond', description: 'Graduate-level reasoning', subjects: 'PhD-level science questions' },
  { id: 'swe-bench', name: 'SWE-bench', description: 'Real-world software engineering', subjects: 'GitHub issues resolved' },
  { id: 'hellaswag', name: 'HellaSwag', description: 'Commonsense reasoning', subjects: 'Story completion' },
]

// Provider colors matching PricingTable
const PROVIDER_COLORS: Record<string, string> = {
  OpenAI: '#10b981',
  Anthropic: '#f97316',
  Google: '#3b82f6',
  DeepSeek: '#8b5cf6',
  xAI: '#ec4899',
  Meta: '#f59e0b',
  Mistral: '#a855f7',
  Alibaba: '#06b6d4',
}

// Sample benchmark data - March 2026 scores
interface BenchmarkResult {
  model: string
  provider: string
  mmlu: number
  'mmlu-pro': number
  humaneval: number
  gpqa: number
  'swe-bench': number
  hellaswag: number
}

const BENCHMARK_DATA: BenchmarkResult[] = [
  // OpenAI
  { model: 'GPT-5.4', provider: 'OpenAI', mmlu: 92.1, 'mmlu-pro': 78.4, humaneval: 94.2, gpqa: 66.8, 'swe-bench': 76.5, hellaswag: 96.8 },
  { model: 'GPT-5.2', provider: 'OpenAI', mmlu: 93.0, 'mmlu-pro': 79.2, humaneval: 93.2, gpqa: 67.2, 'swe-bench': 75.8, hellaswag: 97.1 },
  { model: 'GPT-4.1', provider: 'OpenAI', mmlu: 90.2, 'mmlu-pro': 75.8, humaneval: 91.5, gpqa: 62.4, 'swe-bench': 68.2, hellaswag: 95.4 },
  { model: 'o4-mini', provider: 'OpenAI', mmlu: 88.4, 'mmlu-pro': 72.1, humaneval: 95.8, gpqa: 64.8, 'swe-bench': 72.4, hellaswag: 94.2 },
  { model: 'o3', provider: 'OpenAI', mmlu: 89.1, 'mmlu-pro': 73.5, humaneval: 96.1, gpqa: 68.2, 'swe-bench': 74.8, hellaswag: 94.8 },
  
  // Anthropic
  { model: 'Claude Opus 4.6', provider: 'Anthropic', mmlu: 91.8, 'mmlu-pro': 79.1, humaneval: 94.7, gpqa: 68.2, 'swe-bench': 80.8, hellaswag: 96.5 },
  { model: 'Claude Sonnet 4.6', provider: 'Anthropic', mmlu: 89.5, 'mmlu-pro': 76.4, humaneval: 97.6, gpqa: 64.5, 'swe-bench': 78.2, hellaswag: 95.8 },
  { model: 'Claude Haiku 4.5', provider: 'Anthropic', mmlu: 78.2, 'mmlu-pro': 68.5, humaneval: 88.4, gpqa: 52.1, 'swe-bench': 58.6, hellaswag: 88.4 },
  
  // Google
  { model: 'Gemini 3 Pro', provider: 'Google', mmlu: 91.5, 'mmlu-pro': 77.8, humaneval: 91.6, gpqa: 65.4, 'swe-bench': 76.2, hellaswag: 96.7 },
  { model: 'Gemini 2.5 Pro', provider: 'Google', mmlu: 90.8, 'mmlu-pro': 76.2, humaneval: 88.4, gpqa: 63.8, 'swe-bench': 72.4, hellaswag: 95.2 },
  { model: 'Gemini 3 Flash', provider: 'Google', mmlu: 88.4, 'mmlu-pro': 74.5, humaneval: 86.2, gpqa: 58.4, 'swe-bench': 65.8, hellaswag: 93.8 },
  
  // DeepSeek
  { model: 'DeepSeek R1', provider: 'DeepSeek', mmlu: 88.9, 'mmlu-pro': 71.2, humaneval: 97.4, gpqa: 65.8, 'swe-bench': 71.2, hellaswag: 94.1 },
  { model: 'DeepSeek V3.2', provider: 'DeepSeek', mmlu: 87.2, 'mmlu-pro': 68.4, humaneval: 92.8, gpqa: 58.2, 'swe-bench': 65.4, hellaswag: 92.8 },
  
  // xAI
  { model: 'Grok 4', provider: 'xAI', mmlu: 89.4, 'mmlu-pro': 73.8, humaneval: 97.0, gpqa: 64.2, 'swe-bench': 74.2, hellaswag: 95.2 },
  
  // Meta
  { model: 'Llama 4 405B', provider: 'Meta', mmlu: 86.5, 'mmlu-pro': 70.2, humaneval: 84.8, gpqa: 58.4, 'swe-bench': 58.2, hellaswag: 91.2 },
  { model: 'Llama 4 70B', provider: 'Meta', mmlu: 84.2, 'mmlu-pro': 67.8, humaneval: 82.4, gpqa: 54.2, 'swe-bench': 52.4, hellaswag: 89.8 },
  
  // Mistral
  { model: 'Mistral Large 3', provider: 'Mistral', mmlu: 82.4, 'mmlu-pro': 65.2, humaneval: 82.4, gpqa: 52.4, 'swe-bench': 48.2, hellaswag: 87.4 },
  
  // Qwen
  { model: 'Qwen 3.5 72B', provider: 'Alibaba', mmlu: 88.5, 'mmlu-pro': 72.4, humaneval: 91.2, gpqa: 62.8, 'swe-bench': 68.4, hellaswag: 93.2 },
]

const PROVIDERS = [...new Set(BENCHMARK_DATA.map((d) => d.provider))]

type SortKey = 'model' | 'provider' | 'score'

// Get performance tier based on score
const getScoreTier = (score: number): 'excellent' | 'good' | 'needs-improvement' => {
  if (score >= 90) return 'excellent'
  if (score >= 70) return 'good'
  return 'needs-improvement'
}

export default function LLMEvaluation() {
  const [selectedBenchmark, setSelectedBenchmark] = useState('mmlu')
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

  const getScore = (row: BenchmarkResult): number => {
    return row[selectedBenchmark as keyof BenchmarkResult] as number
  }

  const filtered = useMemo(() => {
    return BENCHMARK_DATA
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
      <span className="llm-sort-icon">{sortAsc ? '↑' : '↓'}</span>
    ) : (
      <span className="llm-sort-icon llm-sort-icon-idle">↕</span>
    )

  const currentBenchmark = BENCHMARKS.find((b) => b.id === selectedBenchmark)!

  // Calculate average scores per provider for comparison cards
  const providerAverages = useMemo(() => {
    const scores: Record<string, number[]> = {}
    BENCHMARK_DATA.forEach((d) => {
      if (!scores[d.provider]) scores[d.provider] = []
      scores[d.provider].push(getScore(d))
    })
    return Object.entries(scores).map(([provider, arr]) => ({
      provider,
      avg: arr.reduce((a, b) => a + b, 0) / arr.length,
    })).sort((a, b) => b.avg - a.avg)
  }, [selectedBenchmark])

  return (
    <div className="llm-evaluation">
      {/* 3-Column Card Grid */}
      <div className="llm-cards">
        {BENCHMARKS.slice(0, 3).map((b) => (
          <div key={b.id} className="llm-card">
            <div className="llm-card-icon"><Diamond size={18} /></div>
            <h3>{b.name}</h3>
            <p className="llm-card-desc">{b.description}</p>
            <p className="llm-card-subjects">{b.subjects}</p>
          </div>
        ))}
      </div>

      {/* Additional benchmarks mention */}
      <div className="llm-mentions">
        <span className="llm-mention-label">Also evaluated:</span>
        {BENCHMARKS.slice(3).map((b) => (
          <span key={b.id} className="llm-mention-tag">{b.name}</span>
        ))}
      </div>

      {/* Benchmark Visualizer */}
      <div className="llm-visualizer">
        <div className="llm-visualizer-header">
          <h3>Benchmark Visualizer</h3>
          <select
            className="llm-benchmark-select"
            value={selectedBenchmark}
            onChange={(e) => setSelectedBenchmark(e.target.value)}
          >
            {BENCHMARKS.map((b) => (
              <option key={b.id} value={b.id}>{b.name} — {b.description}</option>
            ))}
          </select>
        </div>

        {/* Provider filters */}
        <div className="llm-provider-filters">
          {PROVIDERS.map((p) => (
            <button
              key={p}
              className={`llm-provider-btn ${selectedProviders.has(p) ? 'active' : ''}`}
              style={{ '--provider-color': PROVIDER_COLORS[p] ?? '#6b7280' } as React.CSSProperties}
              onClick={() => toggleProvider(p)}
            >
              <span className="llm-provider-dot" />
              {p}
            </button>
          ))}
        </div>

        {/* Sortable table */}
        <div className="llm-table-scroll">
          <table className="llm-table">
            <thead>
              <tr>
                <th className="llm-sortable" onClick={() => handleSort('model')}>
                  Model <SortIcon col="model" />
                </th>
                <th className="llm-sortable" onClick={() => handleSort('provider')}>
                  Provider <SortIcon col="provider" />
                </th>
                <th className="llm-sortable" onClick={() => handleSort('score')}>
                  {currentBenchmark.name} Score <SortIcon col="score" />
                </th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, idx) => {
                const score = getScore(row)
                const tier = getScoreTier(score)
                return (
                  <tr key={`${row.model}-${idx}`}>
                    <td className="llm-model-name">{row.model}</td>
                    <td>
                      <span
                        className="llm-provider-badge"
                        style={{ '--provider-color': PROVIDER_COLORS[row.provider] ?? '#6b7280' } as React.CSSProperties}
                      >
                        {row.provider}
                      </span>
                    </td>
                    <td className="llm-score-cell">{score.toFixed(1)}%</td>
                    <td>
                      <div className="llm-performance-bar">
                        <div
                          className={`llm-performance-fill llm-performance-${tier}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="llm-legend">
          <span className="llm-legend-item">
            <span className="llm-legend-dot llm-legend-excellent" /> Excellent (&gt;90%)
          </span>
          <span className="llm-legend-item">
            <span className="llm-legend-dot llm-legend-good" /> Good (70-90%)
          </span>
          <span className="llm-legend-item">
            <span className="llm-legend-dot llm-legend-needs" /> Needs improvement (&lt;70%)
          </span>
        </div>
      </div>

      {/* Score Distribution Chart */}
      <div className="llm-chart-section">
        <h3>Score Distribution</h3>
        <div className="llm-chart">
          {filtered.map((row) => {
            const score = getScore(row)
            const tier = getScoreTier(score)
            return (
              <div key={row.model} className="llm-chart-row">
                <span className="llm-chart-label">{row.model}</span>
                <div className="llm-chart-bar-wrap">
                  <div
                    className={`llm-chart-bar llm-chart-${tier}`}
                    style={{ width: `${score}%` }}
                  />
                  <span className="llm-chart-value">{score.toFixed(1)}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Provider Comparison Cards */}
      <div className="llm-provider-cards">
        <h3>Provider Comparison</h3>
        <div className="llm-provider-grid">
          {providerAverages.map(({ provider, avg }) => {
            const tier = getScoreTier(avg)
            return (
              <div key={provider} className={`llm-provider-card llm-provider-card-${tier}`}>
                <span
                  className="llm-provider-card-badge"
                  style={{ '--provider-color': PROVIDER_COLORS[provider] ?? '#6b7280' } as React.CSSProperties}
                >
                  {provider}
                </span>
                <span className="llm-provider-card-score">{avg.toFixed(1)}%</span>
                <span className="llm-provider-card-label">avg score</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
