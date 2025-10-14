import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type HomeSearchContextValue = {
  query: string
  setQuery: (value: string) => void
  selectedFilters: string[]
  toggleFilter: (key: string) => void
  clearFilters: () => void
  isSearchMode: boolean
  enterSearchMode: () => void
  exitSearchMode: () => void
}

const HomeSearchContext = createContext<HomeSearchContextValue | undefined>(
  undefined,
)

type CachedState = {
  query: string
  selectedFilters: string[]
  isSearchMode: boolean
}

let cachedState: CachedState | undefined

const getCachedState = () => cachedState
const setCachedState = (state: CachedState) => {
  cachedState = state
}

export const HomeSearchProvider = ({ children }: PropsWithChildren) => {
  const initialState = getCachedState()

  const [query, setQueryState] = useState(initialState?.query ?? '')
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    initialState?.selectedFilters ?? [],
  )
  const [isSearchMode, setIsSearchMode] = useState(
    initialState?.isSearchMode ?? false,
  )

  const setQuery = useCallback((value: string) => {
    setQueryState(value)
  }, [])

  const toggleFilter = useCallback((key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key)
        ? prev.filter((value) => value !== key)
        : [...prev, key],
    )
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedFilters([])
  }, [])

  const enterSearchMode = useCallback(() => {
    setIsSearchMode(true)
  }, [])

  const exitSearchMode = useCallback(() => {
    setIsSearchMode(false)
  }, [])

  useEffect(() => {
    setCachedState({
      query,
      selectedFilters,
      isSearchMode,
    })
  }, [isSearchMode, query, selectedFilters])

  const value = useMemo<HomeSearchContextValue>(
    () => ({
      query,
      setQuery,
      selectedFilters,
      toggleFilter,
      clearFilters,
      isSearchMode,
      enterSearchMode,
      exitSearchMode,
    }),
    [
      clearFilters,
      enterSearchMode,
      exitSearchMode,
      isSearchMode,
      query,
      selectedFilters,
      setQuery,
      toggleFilter,
    ],
  )

  return (
    <HomeSearchContext.Provider value={value}>
      {children}
    </HomeSearchContext.Provider>
  )
}

export const useHomeSearch = () => {
  const context = useContext(HomeSearchContext)
  if (!context) {
    throw new Error('useHomeSearch must be used within a HomeSearchProvider')
  }
  return context
}
