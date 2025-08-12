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
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your mini-app idea..."
          className="input-field w-full h-24 resize-none"
          disabled={disabled}
        />
        
        <button
          type="submit"
          disabled={!prompt.trim() || disabled}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          <span>{disabled ? 'Generating...' : 'Generate App'}</span>
        </button>
      </form>

      <div className="space-y-2">
        <p className="text-sm text-muted">Try these examples:</p>
        <div className="grid grid-cols-1 gap-2">
          {samplePrompts.map((sample, index) => (
            <button
              key={index}
              onClick={() => !disabled && setPrompt(sample)}
              className="text-left text-sm text-primary hover:text-primary/80 transition-colors p-2 rounded border border-gray-200 hover:border-primary/30 disabled:opacity-50"
              disabled={disabled}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
