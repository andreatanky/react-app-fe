import { createContext, useContext } from 'react'
import { StoreApi, useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

export type AuthStatus = 'unauthenticated' | 'loading' | 'authenticated'

export interface AuthUser {
  sub: string
  name?: string
  email?: string
  avatarUrl?: string
}

export interface AuthTokens {
  accessToken?: string
  idToken?: string
  refreshToken?: string
  expiresAt?: number
}

export interface AuthState {
  status: AuthStatus
  user: AuthUser | null
  tokens: AuthTokens | null
}

interface AuthActions {
  beginAuthentication: () => void
  completeAuthentication: (payload: {
    user: AuthUser
    tokens: AuthTokens
  }) => void
  reset: () => void
}

export type AuthStore = AuthState & AuthActions

export const createAuthStore = (
  initialState?: Partial<AuthState>,
): StoreApi<AuthStore> =>
  createStore<AuthStore>((set) => ({
    status: initialState?.status ?? 'unauthenticated',
    user: initialState?.user ?? null,
    tokens: initialState?.tokens ?? null,
    beginAuthentication: () => set({ status: 'loading' }),
    completeAuthentication: ({ user, tokens }) =>
      set({
        status: 'authenticated',
        user,
        tokens,
      }),
    reset: () =>
      set({
        status: 'unauthenticated',
        user: null,
        tokens: null,
      }),
  }))

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null)

export const useAuthStore = <T,>(selector: (state: AuthStore) => T): T => {
  const store = useContext(AuthStoreContext)

  if (!store) {
    throw new Error('useAuthStore must be used within an AuthProvider')
  }

  return useStore(store, selector)
}

export const useAuthStoreApi = (): StoreApi<AuthStore> => {
  const store = useContext(AuthStoreContext)

  if (!store) {
    throw new Error('useAuthStoreApi must be used within an AuthProvider')
  }

  return store
}

export const selectors = {
  status: (state: AuthStore) => state.status,
  user: (state: AuthStore) => state.user,
  tokens: (state: AuthStore) => state.tokens,
}
