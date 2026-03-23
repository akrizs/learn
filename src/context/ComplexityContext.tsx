import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Complexity = 'simple' | 'advanced'

interface ComplexityContextType {
  complexity: Complexity
  setComplexity: (c: Complexity) => void
  toggleComplexity: () => void
}

const ComplexityContext = createContext<ComplexityContextType | undefined>(undefined)

export function ComplexityProvider({ children }: { children: ReactNode }) {
  const [complexity, setComplexity] = useState<Complexity>('simple')

  const toggleComplexity = () => {
    setComplexity((prev) => (prev === 'simple' ? 'advanced' : 'simple'))
  }

  return (
    <ComplexityContext.Provider value={{ complexity, setComplexity, toggleComplexity }}>
      {children}
    </ComplexityContext.Provider>
  )
}

export function useComplexity() {
  const context = useContext(ComplexityContext)
  if (!context) {
    throw new Error('useComplexity must be used within ComplexityProvider')
  }
  return context
}
