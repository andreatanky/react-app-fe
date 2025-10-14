import type { FormEvent } from 'react'

import { FilterBar, type FilterItem } from '../FilterBar/FilterBar'
import styles from './CompactSearchBar.module.css'
import { Searchbar } from '../../../../components/search/Searchbar';

type CompactSearchBarProps = {
    visible: boolean
    query: string
    onQueryChange: (value: string) => void
    onSearchSubmit: (event: FormEvent) => void
    filterItems: FilterItem[]
    selectedFilters: string[]
    onToggleFilter: (key: string) => void
    onClearFilters?: () => void
    onExitSearch: () => void
}

export const CompactSearchBar = ({
    visible,
    query,
    onQueryChange,
    onSearchSubmit,
    filterItems,
    selectedFilters,
    onToggleFilter,
    onClearFilters,
    onExitSearch
}: CompactSearchBarProps) => (
    <div
        data-compact-search-bar
        className={[styles.container, visible ? styles.visible : '', styles.expanded].filter(Boolean).join(' ')}
    >
        <div className={styles.content}>
            <div className={[styles.topRow, styles.topRowSearch].join(' ')}>
                <button
                    type="button"
                    className={styles.closeButton}
                    aria-label="Cancel search"
                    onClick={onExitSearch}
                />
            </div>
            <hr className={styles.divider} />
            <div className={styles.searchRow}>
                <Searchbar
                    query={query}
                    onQueryChange={onQueryChange}
                    onSubmit={onSearchSubmit}
                    backgroundColor="var(--color-on-surface)"
                />
            </div>
            <div className={styles.bottomRow}>
                <FilterBar
                    items={filterItems}
                    selectedKeys={selectedFilters}
                    onToggle={onToggleFilter}
                    onClear={onClearFilters}
                />
            </div>
        </div>
    </div>
)

export default CompactSearchBar
