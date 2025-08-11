import React from 'react'
import { BuilderComponent, useIsPreviewing } from '@builder.io/react'
import { BUILDER_API_KEY } from '../builderConfig'

interface BuilderPageProps {
  model: string
  content?: any
  fallback?: React.ReactNode
  apiKey?: string
}

export function BuilderPage({ 
  model, 
  content, 
  fallback, 
  apiKey = BUILDER_API_KEY 
}: BuilderPageProps) {
  const isPreviewing = useIsPreviewing()

  // Show fallback if no Builder.io API key is set
  if (!apiKey || apiKey === 'YOUR_BUILDER_API_KEY_HERE') {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="text-6xl">🏗️</div>
            <h2 className="text-xl font-semibold">Builder.io Setup Required</h2>
            <p className="text-gray-600 text-sm">
              To view this content, please configure your Builder.io API key in the environment variables.
            </p>
            <div className="bg-gray-50 rounded p-3 text-xs text-left">
              <code>VITE_BUILDER_API_KEY=your_api_key_here</code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the Builder.io content
  return (
    <BuilderComponent 
      model={model} 
      content={content}
      apiKey={apiKey}
    />
  )
}

export default BuilderPage
