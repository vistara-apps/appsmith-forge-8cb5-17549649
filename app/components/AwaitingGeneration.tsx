'use client'

import { useState, useEffect } from 'react'
import { Loader2, Sparkles, Code, Rocket, CheckCircle } from 'lucide-react'

interface AwaitingGenerationProps {
  prompt: string
}

const steps = [
  { id: 1, label: 'Analyzing prompt...', icon: Sparkles, duration: 800 },
  { id: 2, label: 'Generating code...', icon: Code, duration: 1200 },
  { id: 3, label: 'Deploying app...', icon: Rocket, duration: 1000 }
]

export function AwaitingGeneration({ prompt }: AwaitingGenerationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCompletedSteps(prev => [...prev, currentStep])
        setCurrentStep(prev => prev + 1)
      }
    }, steps[currentStep]?.duration || 1000)

    return () => clearTimeout(timer)
  }, [currentStep])

  return (
    <div className="card animate-fade-in">
      <div className="text-center space-y-6">
        {/* Header with spinning loader */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-primary/20 rounded-full animate-pulse"></div>
            </div>
            <div className="p-2 bg-accent/10 rounded-lg">
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-text mb-2">Crafting Your App</h3>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-sm text-muted font-medium">"{prompt}"</p>
          </div>
        </div>
        
        {/* Progress steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isCurrent = currentStep === index
            const IconComponent = step.icon
            
            return (
              <div 
                key={step.id}
                className={`flex items-center justify-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-50 border border-green-200' 
                    : isCurrent 
                    ? 'bg-primary/5 border border-primary/20' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-100' 
                    : isCurrent 
                    ? 'bg-primary/10' 
                    : 'bg-gray-100'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <IconComponent className={`w-4 h-4 ${
                      isCurrent ? 'text-primary animate-pulse' : 'text-gray-400'
                    }`} />
                  )}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isCompleted 
                    ? 'text-green-700' 
                    : isCurrent 
                    ? 'text-primary' 
                    : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
