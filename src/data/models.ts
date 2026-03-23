export interface ModelCost {
  input: number
  output: number
  cache_read?: number
  cache_write?: number
}

export interface Model {
  id: string
  name: string
  provider: string
  cost: ModelCost
  context?: number
}

export const MODELS: Model[] = [
  // OpenAI - GPT-5 Series
  { id: 'gpt-5.4', name: 'GPT-5.4', provider: 'OpenAI', cost: { input: 2.5, output: 15, cache_read: 1.25 }, context: 256000 },
  { id: 'gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI', cost: { input: 1.75, output: 14, cache_read: 0.875 }, context: 128000 },
  { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', cost: { input: 5, output: 15 }, context: 256000 },
  { id: 'gpt-5-nano', name: 'GPT-5 Nano', provider: 'OpenAI', cost: { input: 0.05, output: 0.4 }, context: 400000 },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', provider: 'OpenAI', cost: { input: 1.5, output: 6 }, context: 256000 },
  { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'OpenAI', cost: { input: 2, output: 8 }, context: 1000000 },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'OpenAI', cost: { input: 0.4, output: 1.6 }, context: 1000000 },
  { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', provider: 'OpenAI', cost: { input: 0.1, output: 0.4 }, context: 1000000 },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', cost: { input: 2.5, output: 10, cache_read: 1.25 }, context: 128000 },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'OpenAI', cost: { input: 0.15, output: 0.6, cache_read: 0.075 }, context: 128000 },
  { id: 'o4-mini', name: 'o4-mini', provider: 'OpenAI', cost: { input: 1.1, output: 4.4, cache_read: 0.275 }, context: 200000 },
  { id: 'o3', name: 'o3', provider: 'OpenAI', cost: { input: 2, output: 8, cache_read: 0.5 }, context: 200000 },
  { id: 'o3-mini', name: 'o3-mini', provider: 'OpenAI', cost: { input: 1.1, output: 4.4, cache_read: 0.55 }, context: 200000 },

  // Anthropic - Claude 4 Series
  { id: 'claude-opus-4.6', name: 'Claude Opus 4.6', provider: 'Anthropic', cost: { input: 5, output: 25, cache_read: 0.5, cache_write: 6.25 }, context: 200000 },
  { id: 'claude-sonnet-4.6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', cost: { input: 3, output: 15, cache_read: 0.3, cache_write: 3.75 }, context: 200000 },
  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', provider: 'Anthropic', cost: { input: 0.8, output: 4, cache_read: 0.08, cache_write: 1 }, context: 200000 },

  // Google - Gemini 3 Series
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro', provider: 'Google', cost: { input: 1.25, output: 10, cache_read: 0.31 }, context: 1000000 },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash', provider: 'Google', cost: { input: 0.075, output: 0.3, cache_read: 0.019 }, context: 1000000 },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', cost: { input: 1.25, output: 10, cache_read: 0.31 }, context: 1048576 },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', cost: { input: 0.15, output: 0.6, cache_read: 0.038 }, context: 1048576 },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', cost: { input: 0.1, output: 0.4, cache_read: 0.025 }, context: 1000000 },

  // DeepSeek
  { id: 'deepseek-v3.2', name: 'DeepSeek V3.2', provider: 'DeepSeek', cost: { input: 0.28, output: 0.42, cache_read: 0.028 }, context: 128000 },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', cost: { input: 0.55, output: 2.19, cache_read: 0.055 }, context: 128000 },

  // xAI - Grok 4 Series
  { id: 'grok-4', name: 'Grok 4', provider: 'xAI', cost: { input: 3, output: 15 }, context: 256000 },
  { id: 'grok-4-mini', name: 'Grok 4 Mini', provider: 'xAI', cost: { input: 0.3, output: 0.5 }, context: 256000 },
  { id: 'grok-3', name: 'Grok 3', provider: 'xAI', cost: { input: 3, output: 15 }, context: 131072 },

  // Meta - Llama 4
  { id: 'llama-4-405b', name: 'Llama 4 405B', provider: 'Meta', cost: { input: 3.5, output: 3.5 }, context: 128000 },
  { id: 'llama-4-70b', name: 'Llama 4 70B', provider: 'Meta', cost: { input: 0.27, output: 0.85 }, context: 128000 },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta', cost: { input: 0.18, output: 0.4 }, context: 128000 },

  // Mistral
  { id: 'mistral-large-3', name: 'Mistral Large 3', provider: 'Mistral', cost: { input: 2, output: 6 }, context: 128000 },
  { id: 'mistral-small-3', name: 'Mistral Small 3', provider: 'Mistral', cost: { input: 0.1, output: 0.3 }, context: 128000 },

  // Qwen (Alibaba)
  { id: 'qwen-3.5-72b', name: 'Qwen 3.5 72B', provider: 'Alibaba', cost: { input: 0.7, output: 1.4 }, context: 131072 },
  { id: 'qwen-3.5-32b', name: 'Qwen 3.5 32B', provider: 'Alibaba', cost: { input: 0.2, output: 0.4 }, context: 131072 },
]

export const PROVIDERS = [...new Set(MODELS.map((m) => m.provider))]
