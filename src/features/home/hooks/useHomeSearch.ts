import { useMemo } from 'react'

import { useHomeSearchStore } from '../store/useHomeSearchStore'

export const useHomeSearch = () => {
  const query = useHomeSearchStore((state) => state.query)
  const selectedFilters = useHomeSearchStore((state) => state.selectedFilters)
  const isSearchMode = useHomeSearchStore((state) => state.isSearchMode)
  const setQuery = useHomeSearchStore((state) => state.setQuery)
  const toggleFilter = useHomeSearchStore((state) => state.toggleFilter)
  const clearFilters = useHomeSearchStore((state) => state.clearFilters)
  const enterSearchMode = useHomeSearchStore((state) => state.enterSearchMode)
  const exitSearchMode = useHomeSearchStore((state) => state.exitSearchMode)

  return useMemo(
    () => ({
      query,
      selectedFilters,
      isSearchMode,
      setQuery,
      toggleFilter,
      clearFilters,
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
}
