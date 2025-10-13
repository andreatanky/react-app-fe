import { PropsWithChildren, useEffect, useState } from 'react'
import { StoreApi } from 'zustand'

import {
  AuthStore,
  AuthStoreContext,
  createAuthStore,
  type AuthState,
} from '../store/authStore'

type AuthProviderProps = PropsWithChildren<{
  store?: StoreApi<AuthStore>
  initialState?: Partial<AuthState>
}>

export const AuthProvider = ({
  store,
  initialState,
  children,
}: AuthProviderProps) => {
  const [storeApi, setStoreApi] = useState<StoreApi<AuthStore>>(
    () => store ?? createAuthStore(initialState),
  )

  useEffect(() => {
    if (store) {
      setStoreApi(store)
    }
  }, [store])

  return (
    <AuthStoreContext.Provider value={storeApi}>
      {children}
    </AuthStoreContext.Provider>
  )
}
