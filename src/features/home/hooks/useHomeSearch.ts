import { useHomeSearchStore } from '../store/useHomeSearchStore'
import { useShallow } from 'zustand/react/shallow'

export const useHomeSearch = () => {
  return useHomeSearchStore(
    useShallow((state) => ({
      query: state.query,
      selectedFilters: state.selectedFilters,
      isSearchMode: state.isSearchMode,
      setQuery: state.setQuery,
      toggleFilter: state.toggleFilter,
      clearFilters: state.clearFilters,
      enterSearchMode: state.enterSearchMode,
      exitSearchMode: state.exitSearchMode,
    })),
  )
}
