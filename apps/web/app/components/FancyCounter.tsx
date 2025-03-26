'use client'

import { createContext, useContext, ReactNode } from 'react'
import clsx from 'clsx'
import { useFancyCounter as useFancyCounterHook } from '../hooks/useFancyCounter'

interface FancyCounterContextType {
  count: number
  increment: () => void
  decrement: () => void
  fancyClass: string
}

const FancyCounterContext = createContext<FancyCounterContextType | null>(null)

interface FancyCounterProps {
  children: ReactNode
}

const FancyCounter = ({ children }: FancyCounterProps) => {
  const { count, increment, decrement, fancyClass } = useFancyCounterHook()
  
  return (
    <FancyCounterContext.Provider value={{ count, increment, decrement, fancyClass }}>
      {children}
    </FancyCounterContext.Provider>
  )
}

const useFancyCounterContext = () => {
  const context = useContext(FancyCounterContext)
  if (!context) {
    throw new Error('useFancyCounterContext must be used within FancyCounter')
  }
  return context
}

const Count = () => {
  const { count, fancyClass} = useFancyCounterContext()
  return <h2 className={clsx("text-2xl font-bold mb-4", fancyClass)}>Count is at {count}</h2>
}

interface IncrementBtnProps {
  children: ReactNode
  by?: number
}

const IncrementBtn = ({ children, by = 1 }: IncrementBtnProps) => {
  const { increment } = useFancyCounterContext()
  
  return (
    <button
      onClick={() => {
        for (let i = 0; i < by; i++) {
          increment()
        }
      }}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-fit",
        "bg-blue-500 hover:bg-blue-600 text-white",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      )}
    >
      {children}
    </button>
  )
}

interface DecrementBtnProps {
  children: ReactNode
  by?: number
}

const DecrementBtn = ({ children, by = 1 }: DecrementBtnProps) => {
  const { decrement } = useFancyCounterContext()
  
  return (
    <button
      onClick={() => {
        for (let i = 0; i < by; i++) {
          decrement()
        }
      }}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-fit no",
        "bg-red-500 hover:bg-red-600 text-white",
        "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
      )}
    >
      {children}
    </button>
  )
}

interface FireworksProps {
  at: number
}

const Fireworks = ({ at }: FireworksProps) => {
  const { count } = useFancyCounterContext()
  
  if (count === at) {
    return <span>🎆 Fireworks!</span>
  }
  
  return null
}

FancyCounter.Count = Count
FancyCounter.IncrementBtn = IncrementBtn
FancyCounter.DecrementBtn = DecrementBtn
FancyCounter.Fireworks = Fireworks

export { FancyCounter } 