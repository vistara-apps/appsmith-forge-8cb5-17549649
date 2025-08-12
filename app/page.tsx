'use client'

import { useMiniKit, useAddFrame, useOpenUrl, usePrimaryButton } from '@coinbase/onchainkit/minikit'
import { useEffect, useState } from 'react'
import { Plus, Sparkles, Grid } from 'lucide-react'
import { PromptInput } from './components/PromptInput'
import { AppCard } from './components/AppCard'
import { AwaitingGeneration } from './components/AwaitingGeneration'
import { EmptyState } from './components/EmptyState'

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
        <header className="flex justify-between items-center mb-8" role="banner">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg" aria-hidden="true">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text tracking-tight">Appsmith Forge</h1>
              <p className="text-sm text-muted font-medium">Create mini-apps instantly</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label="Save frame to Farcaster"
              >
                SAVE
              </button>
            )}
            <button
              onClick={() => openUrl('https://base.org')}
              className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors min-h-[44px] px-3 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
              aria-label="Visit Base blockchain website"
            >
              BASE
            </button>
          </div>
        </header>

        <main className="space-y-6" role="main">
          <section className="card animate-fade-in" aria-labelledby="create-app-heading">
            <div className="text-center mb-6">
              <h2 id="create-app-heading" className="text-3xl font-bold text-text mb-3 tracking-tight">Turn Ideas Into Apps</h2>
              <p className="text-muted text-lg leading-relaxed">Describe your vision and watch it transform into a functional mini-app</p>
            </div>
            
            <PromptInput 
              onGenerate={handleGenerateApp}
              disabled={isGenerating}
            />
          </section>

          {isGenerating && (
            <AwaitingGeneration prompt={currentPrompt} />
          )}

          {generatedApps.length > 0 && (
            <section className="space-y-4" aria-labelledby="your-apps-heading">
              <div className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-primary" aria-hidden="true" />
                <h3 id="your-apps-heading" className="text-lg font-semibold text-text">Your Apps</h3>
              </div>
              
              <div role="list" aria-label="Generated applications">
                {generatedApps.map((app) => (
                  <div key={app.id} role="listitem">
                    <AppCard 
                      app={app}
                      onCustomize={(id) => console.log('Customize app:', id)}
                      onMonetize={(id) => console.log('Monetize app:', id)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {generatedApps.length === 0 && !isGenerating && (
            <EmptyState />
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
