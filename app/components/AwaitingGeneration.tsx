'use client'

import { Loader2, Sparkles } from 'lucide-react'

interface AwaitingGenerationProps {
  prompt: string
}

export function AwaitingGeneration({ prompt }: AwaitingGenerationProps) {
  return (
    <div className="card animate-fade-in">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        
        <div>
          <h3 className="font-semibold text-text mb-2">Generating Your App</h3>
          <p className="text-sm text-muted mb-3">Creating: "{prompt}"</p>
          
          <div className="space-y-2 text-xs text-muted">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Analyzing prompt...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-100"></div>
              <span>Generating code...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
              <span>Deploying app...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
