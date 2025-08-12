'use client'

import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'viem/chains'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'default',
          name: 'Appsmith Forge',
          logo: '/logo.png',
        },
      }}
    >
      {children}
    </MiniKitProvider>
  )
}
