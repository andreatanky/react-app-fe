import { ReactNode, useMemo, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { StoreApi } from 'zustand'

import { AuthProvider } from '../../features/auth/AuthProvider'
import {
  createAuthStore,
  useAuthStoreApi,
  type AuthStore,
} from '../../features/auth/auth-store'
import { ThemeProvider } from '../../features/theme/ThemeProvider'
import { createAppRouter } from '../router'

type AppProvidersProps = {
  children?: ReactNode
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

const RouterWithContext = () => {
  const authStore = useAuthStoreApi()
  const queryClient = useQueryClient()

  const router = useMemo(
    () =>
      createAppRouter({
        auth: authStore,
        queryClient,
      }),
    [authStore, queryClient],
  )

  return <RouterProvider router={router} />
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const [authStore] = useState<StoreApi<AuthStore>>(() => createAuthStore())
  const [queryClient] = useState<QueryClient>(() => createQueryClient())

  return (
    <ThemeProvider>
      <AuthProvider store={authStore}>
        <QueryClientProvider client={queryClient}>
          <RouterWithContext />
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
