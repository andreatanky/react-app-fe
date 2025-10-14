import { FilterBar, type FilterItem } from '../FilterBar/FilterBar'
import styles from './CompactNavBar.module.css'
import dailyNewsLogo from '@/assets/images/dailynews_logo.png';

type CompactNavBarProps = {
    visible: boolean
    onSearchAction: () => void
    onHelp: () => void
    onLogout: () => void
    filterItems: FilterItem[]
    selectedFilters: string[]
    onToggleFilter: (key: string) => void
    onClearFilters?: () => void
}

export const CompactNavBar = ({
    visible,
    onSearchAction,
    onHelp,
    onLogout,
    filterItems,
    selectedFilters,
    onToggleFilter,
    onClearFilters
}: CompactNavBarProps) => (
    <div className={[styles.container, visible ? styles.visible : ''].filter(Boolean).join(' ')}>
        <div className={styles.content}>
            <div className={styles.topRow}>
                <img src={dailyNewsLogo} alt="DailyNews" className={styles.logo} />
                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.actionButton}
                        onClick={onSearchAction}
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
            </div>


            <hr className={styles.divider} />
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
