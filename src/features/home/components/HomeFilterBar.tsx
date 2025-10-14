import { FilterBar } from './FilterBar/FilterBar'
import { useHomeSearch } from '../providers/HomeSearchProvider'
import { HOME_FILTERS } from '../constants'

type HomeFilterBarProps = {
  className?: string
  showClear?: boolean
}

export const HomeFilterBar = ({
  className,
  showClear = true,
}: HomeFilterBarProps) => {
  const { selectedFilters, toggleFilter, clearFilters } = useHomeSearch()

  return (
    <FilterBar
      items={HOME_FILTERS}
      selectedKeys={selectedFilters}
      onToggle={toggleFilter}
      onClear={showClear ? clearFilters : undefined}
      className={className}
    />
  )
}
