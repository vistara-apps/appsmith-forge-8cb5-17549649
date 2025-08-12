
'use client'

import { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  variant?: 'default'
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className="app-shell">
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  )
}
