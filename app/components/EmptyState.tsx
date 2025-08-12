'use client'

import { Sparkles, Zap, Rocket } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="card text-center animate-fade-in">
      <div className="relative mb-6">
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl"></div>
        </div>
        
        {/* Main icon */}
        <div className="relative flex items-center justify-center">
          <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          
          {/* Floating icons */}
          <div className="absolute -top-2 -right-2 p-2 bg-accent/20 rounded-lg animate-pulse delay-100">
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <div className="absolute -bottom-2 -left-2 p-2 bg-primary/20 rounded-lg animate-pulse delay-200">
            <Rocket className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-text mb-2">Ready to Build Something Amazing?</h3>
          <p className="text-muted leading-relaxed">
            Your creative journey starts here. Describe any app idea and watch our AI bring it to life in seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center justify-center space-x-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-primary font-medium">Instant deployment</span>
          </div>
          <div className="flex items-center justify-center space-x-2 p-3 bg-accent/5 rounded-lg border border-accent/10">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-accent font-medium">Mobile-optimized</span>
          </div>
        </div>
        
        <p className="text-sm text-muted font-medium">
          Use the <span className="text-primary font-semibold">CREATE NEW APP</span> button below to get started
        </p>
      </div>
    </div>
  )
}
