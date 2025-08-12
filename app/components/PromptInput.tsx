'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface PromptInputProps {
  onGenerate: (prompt: string) => void
  disabled?: boolean
}

export function PromptInput({ onGenerate, disabled }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && !disabled) {
      onGenerate(prompt.trim())
      setPrompt('')
    }
  }

  const samplePrompts = [
    'Create a poll app for favorite crypto projects',
    'Build a simple NFT gallery viewer',
    'Make a tip jar for content creators',
    'Create a voting app for community decisions'
  ]

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-label="App generation form">
        <div className="relative">
          <label htmlFor="app-prompt" className="sr-only">
            Describe your mini-app idea
          </label>
          <textarea
            id="app-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your mini-app idea in detail..."
            className="input-field w-full h-28 resize-none text-base leading-relaxed focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            disabled={disabled}
            maxLength={500}
            aria-describedby="char-count"
          />
          <div id="char-count" className="absolute bottom-3 right-3 text-xs text-muted" aria-live="polite">
            {prompt.length}/500
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!prompt.trim() || disabled}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-describedby={disabled ? "generating-status" : undefined}
        >
          <Sparkles className={`w-5 h-5 ${disabled ? 'animate-spin' : ''}`} aria-hidden="true" />
          <span>{disabled ? 'Generating Your App...' : 'Generate App'}</span>
        </button>
        {disabled && (
          <div id="generating-status" className="sr-only" aria-live="polite">
            App generation in progress
          </div>
        )}
      </form>

      <div className="space-y-3" role="region" aria-labelledby="examples-heading">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-full" aria-hidden="true"></div>
          <p id="examples-heading" className="text-sm font-medium text-muted">Try these examples:</p>
        </div>
        <div className="grid grid-cols-1 gap-3" role="list" aria-label="Example prompts">
          {samplePrompts.map((sample, index) => (
            <button
              key={index}
              onClick={() => !disabled && setPrompt(sample)}
              className="group text-left text-sm p-4 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={disabled}
              role="listitem"
              aria-label={`Use example prompt: ${sample}`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 group-hover:bg-primary transition-colors" aria-hidden="true"></div>
                <span className="text-text group-hover:text-primary transition-colors font-medium">{sample}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
