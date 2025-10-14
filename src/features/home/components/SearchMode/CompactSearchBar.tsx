import { FormEvent, forwardRef } from 'react'

import { HomeFilterBar } from '../HomeFilterBar'
import { HomeSearchInput } from '../HomeSearchInput'
import styles from './CompactSearchBar.module.css'

type CompactSearchBarProps = {
    visible: boolean
    onSearchSubmit: (event: FormEvent) => void
    onExitSearch: () => void
}

export const CompactSearchBar = forwardRef<HTMLDivElement, CompactSearchBarProps>(({
    visible,
    onSearchSubmit,
    onExitSearch
}, ref) => (
    <div
        data-compact-search-bar
        ref={ref}
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
                <HomeSearchInput
                    onSubmit={onSearchSubmit}
                    backgroundColor="var(--color-on-surface)"
                />
            </div>
            <div className={styles.bottomRow}>
                <HomeFilterBar />
            </div>
        </div>
    </div>
))

CompactSearchBar.displayName = 'CompactSearchBar'

export default CompactSearchBar
