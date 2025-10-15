// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './lib/queryClient'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
  // </StrictMode>,
)
