import type { FormEvent } from 'react'

import { FilterBar, type FilterItem } from '../FilterBar/FilterBar'
import styles from './CompactBar.module.css'
import dailyNewsLogo from '@/assets/images/dailynews_logo.png';
import { Searchbar } from '../../../../components/search/Searchbar';

type CompactNavBarProps = {
    visible: boolean
    onSearchAction: () => void
    onHelp: () => void
    onLogout: () => void
    query: string
    onQueryChange: (value: string) => void
    onSearchSubmit: (event: FormEvent) => void
    filterItems: FilterItem[]
    selectedFilters: string[]
    onToggleFilter: (key: string) => void
    onClearFilters?: () => void
    isSearchState: boolean
    setIsSearchState: (value: boolean) => void
}

export const CompactNavBar = ({
    visible,
    onSearchAction,
    onHelp,
    onLogout,
    query,
    onQueryChange,
    onSearchSubmit,
    filterItems,
    selectedFilters,
    onToggleFilter,
    onClearFilters,
    isSearchState = false,
    setIsSearchState
}: CompactNavBarProps) => (
    <div className={[styles.container, visible ? styles.visible : '', isSearchState ? styles.expanded : ''].filter(Boolean).join(' ')}>
        <div className={styles.content}>
            <div className={[styles.topRow, isSearchState ? styles.topRowSearch : ''].filter(Boolean).join(' ')}>
                {isSearchState ? (
                    <button
                        type="button"
                        className={styles.closeButton}
                        aria-label="Cancel search"
                        onClick={() => {
                            setIsSearchState(false)
                        }}
                    />
                ) : (
                    <>
                        <img src={dailyNewsLogo} alt="DailyNews" className={styles.logo} />
                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={styles.actionButton}
                                onClick={() => {
                                    setIsSearchState(true)
                                    onSearchAction()
                                }}
                            >
                                Search
                            </button>
                            <button type="button" className={styles.actionButton} onClick={onHelp}>
                                Help &amp; FAQ
                            </button>
                            <button type="button" className={styles.actionButton} onClick={onLogout}>
                                Log Out
                            </button>
                        </div>
                    </>
                )}
            </div>


            <hr className={styles.divider} />
            {isSearchState && (
                <div className={styles.searchRow}>
                    <Searchbar query={query} onQueryChange={onQueryChange} onSubmit={onSearchSubmit} />
                </div>
            )}
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

export default CompactNavBar
