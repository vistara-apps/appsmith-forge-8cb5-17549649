
'use client'

import { useState } from 'react'
import { DollarSign, Zap, Users, Gift } from 'lucide-react'

interface MonetizationToggleProps {
  isEnabled: boolean
  onToggle: (enabled: boolean, config?: MonetizationConfig) => void
  variant?: 'on' | 'off'
}

interface MonetizationConfig {
  type: 'tipping' | 'badges' | 'exclusive' | 'subscription'
  amount?: number
  currency?: 'USDC' | 'ETH'
  description?: string
}

export function MonetizationToggle({ 
  isEnabled, 
  onToggle, 
  variant 
}: MonetizationToggleProps) {
  const [showConfig, setShowConfig] = useState(false)
  const [config, setConfig] = useState<MonetizationConfig>({
    type: 'tipping',
    currency: 'USDC',
    description: ''
  })

  const monetizationTypes = [
    {
      type: 'tipping' as const,
      icon: Gift,
      label: 'Tip Jar',
      description: 'Let users tip you for your app'
    },
    {
      type: 'badges' as const,
      icon: Zap,
      label: 'Buyable Badges',
      description: 'Sell exclusive badges to supporters'
    },
    {
      type: 'exclusive' as const,
      icon: Users,
      label: 'Exclusive Access',
      description: 'Premium features for paying users'
    }
  ]

  const handleToggle = () => {
    if (isEnabled) {
      onToggle(false)
    } else {
      setShowConfig(true)
    }
  }

  const handleSaveConfig = () => {
    onToggle(true, config)
    setShowConfig(false)
  }

  if (showConfig) {
    return (
      <div className="card space-y-4">
        <h3 className="font-semibold text-text">Setup Monetization</h3>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text">
            Monetization Type
          </label>
          <div className="grid grid-cols-1 gap-2">
            {monetizationTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.type}
                  onClick={() => setConfig({ ...config, type: type.type })}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    config.type === type.type
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted">{type.description}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {config.type === 'badges' && (
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Badge Price (USDC)
            </label>
            <input
              type="number"
              value={config.amount || ''}
              onChange={(e) => setConfig({ ...config, amount: Number(e.target.value) })}
              placeholder="5"
              className="input-field w-full"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Description (Optional)
          </label>
          <textarea
            value={config.description || ''}
            onChange={(e) => setConfig({ ...config, description: e.target.value })}
            placeholder="Support this creator and get exclusive perks!"
            className="input-field w-full min-h-[60px]"
          />
        </div>

        <div className="flex space-x-2">
          <button onClick={handleSaveConfig} className="btn-primary flex-1">
            Enable Monetization
          </button>
          <button 
            onClick={() => setShowConfig(false)} 
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 bg-surface border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${isEnabled ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>
          <DollarSign className="w-4 h-4" />
        </div>
        <div>
          <div className="font-medium text-text">
            {isEnabled ? 'Monetization Active' : 'Enable Monetization'}
          </div>
          <div className="text-sm text-muted">
            {isEnabled ? 'Earning from your mini-app' : 'Start earning from your creation'}
          </div>
        </div>
      </div>
      
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isEnabled
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-accent text-white hover:bg-accent/90'
        }`}
      >
        {isEnabled ? 'Disable' : 'Setup'}
      </button>
    </div>
  )
}
