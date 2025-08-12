'use client'

import { ExternalLink, Settings, DollarSign } from 'lucide-react'

interface App {
  id: string
  prompt: string
  type: string
  deployedUrl: string
  createdAt: string
  monetizationEnabled: boolean
}

interface AppCardProps {
  app: App
  onCustomize: (id: string) => void
  onMonetize: (id: string) => void
}

export function AppCard({ app, onCustomize, onMonetize }: AppCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="card animate-slide-up">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-text mb-1 line-clamp-2">{app.prompt}</h4>
          <p className="text-sm text-muted">Created {formatDate(app.createdAt)}</p>
        </div>
        
        {app.monetizationEnabled && (
          <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded text-xs">
            <DollarSign className="w-3 h-3" />
            <span>Monetized</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => window.open(app.deployedUrl, '_blank')}
          className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-text px-3 py-2 rounded text-sm transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View App</span>
        </button>
        
        <button
          onClick={() => onCustomize(app.id)}
          className="flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded text-sm transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
        
        {!app.monetizationEnabled && (
          <button
            onClick={() => onMonetize(app.id)}
            className="flex items-center justify-center bg-accent/10 hover:bg-accent/20 text-accent px-3 py-2 rounded text-sm transition-colors"
          >
            <DollarSign className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
