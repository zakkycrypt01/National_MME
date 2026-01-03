'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface LandingDataContextType {
  landingData: any
  isLoading: boolean
}

const LandingDataContext = createContext<LandingDataContextType>({
  landingData: null,
  isLoading: true,
})

export function LandingDataProvider({ children }: { children: ReactNode }) {
  const [landingData, setLandingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/landing')
      .then(res => res.json())
      .then(data => {
        setLandingData(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error loading landing data:', err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading || !landingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <LandingDataContext.Provider value={{ landingData, isLoading }}>
      {children}
    </LandingDataContext.Provider>
  )
}

export function useLandingData() {
  const context = useContext(LandingDataContext)
  if (!context) {
    throw new Error('useLandingData must be used within LandingDataProvider')
  }
  return context
}
