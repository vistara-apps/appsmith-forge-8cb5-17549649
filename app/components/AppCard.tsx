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
    <div className="card animate-slide-up group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">{app.prompt}</h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-muted">Created {formatDate(app.createdAt)}</p>
          </div>
        </div>
        
        {app.monetizationEnabled && (
          <div className="flex items-center space-x-1 bg-gradient-to-r from-accent/10 to-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium border border-accent/20">
            <DollarSign className="w-3 h-3" />
            <span>Monetized</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => window.open(app.deployedUrl, '_blank')}
          className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-text px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View App</span>
        </button>
        
        <button
          onClick={() => onCustomize(app.id)}
          className="flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary px-4 py-3 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 hover:shadow-md group"
          title="Customize app"
        >
          <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
        </button>
        
        {!app.monetizationEnabled && (
          <button
            onClick={() => onMonetize(app.id)}
            className="flex items-center justify-center bg-accent/10 hover:bg-accent/20 text-accent px-4 py-3 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 hover:shadow-md"
            title="Enable monetization"
          >
            <DollarSign className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
