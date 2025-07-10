'use client'

import ThemeProvider from '@/theme'
import { Providers } from '@/providers'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ClientProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </Providers>
    </QueryClientProvider>
  )
} 