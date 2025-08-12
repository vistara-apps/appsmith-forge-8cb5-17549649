'use client'

import { useMiniKit, useAddFrame, useOpenUrl, usePrimaryButton } from '@coinbase/onchainkit/minikit'
import { useEffect, useState } from 'react'
import { Plus, Sparkles, Grid } from 'lucide-react'
import { PromptInput } from './components/PromptInput'
import { AppCard } from './components/AppCard'
import { AwaitingGeneration } from './components/AwaitingGeneration'

interface GeneratedApp {
  id: string
  prompt: string
  type: string
  deployedUrl: string
  createdAt: string
  monetizationEnabled: boolean
}

export default function AppsmithForge() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedApps, setGeneratedApps] = useState<GeneratedApp[]>([])
  const [currentPrompt, setCurrentPrompt] = useState('')
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
    }
  }

  const handleGenerateApp = async (prompt: string) => {
    setIsGenerating(true)
    setCurrentPrompt(prompt)
    
    // Simulate app generation
    setTimeout(() => {
      const newApp: GeneratedApp = {
        id: Date.now().toString(),
        prompt,
        type: 'poll',
        deployedUrl: `https://miniapp-${Date.now()}.vercel.app`,
        createdAt: new Date().toISOString(),
        monetizationEnabled: false
      }
      
      setGeneratedApps(prev => [newApp, ...prev])
      setIsGenerating(false)
      setCurrentPrompt('')
    }, 3000)
  }

  usePrimaryButton(
    { text: isGenerating ? 'GENERATING...' : 'CREATE NEW APP' },
    () => {
      if (!isGenerating) {
        const samplePrompts = [
          'Create a poll app for favorite crypto projects',
          'Build a simple NFT gallery viewer',
          'Make a tip jar for content creators',
          'Create a voting app for community decisions'
        ]
        const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)]
        handleGenerateApp(randomPrompt)
      }
    }
  )

  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-text">Appsmith Forge</h1>
          </div>
          
          <div className="flex space-x-2">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="bg-accent text-white px-3 py-1 rounded text-sm hover:bg-accent/90 transition-colors"
              >
                SAVE
              </button>
            )}
            <button
              onClick={() => openUrl('https://base.org')}
              className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors"
            >
              BASE
            </button>
          </div>
        </header>

        <main className="space-y-6">
          <div className="card animate-fade-in">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-text mb-2">Create Mini Apps Instantly</h2>
              <p className="text-muted">Describe your app idea and watch it come to life</p>
            </div>
            
            <PromptInput 
              onGenerate={handleGenerateApp}
              disabled={isGenerating}
            />
          </div>

          {isGenerating && (
            <AwaitingGeneration prompt={currentPrompt} />
          )}

          {generatedApps.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-text">Your Apps</h3>
              </div>
              
              {generatedApps.map((app) => (
                <AppCard 
                  key={app.id} 
                  app={app}
                  onCustomize={(id) => console.log('Customize app:', id)}
                  onMonetize={(id) => console.log('Monetize app:', id)}
                />
              ))}
            </div>
          )}

          {generatedApps.length === 0 && !isGenerating && (
            <div className="card text-center">
              <Plus className="w-12 h-12 text-muted mx-auto mb-4" />
              <p className="text-muted">No apps created yet. Use the primary button below to get started!</p>
            </div>
          )}
        </main>

        <footer className="mt-8 text-center">
          <button
            onClick={() => openUrl('https://docs.base.org/minikit')}
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            BUILT WITH MINIKIT
          </button>
        </footer>
      </div>
    </div>
  )
}
