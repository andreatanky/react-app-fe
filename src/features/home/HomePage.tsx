import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import ProductCard from '../product/components/cards/ProductCard'
import { fetchActiveProducts, fetchExpiredProducts } from '../../mocks/api/productsApi'
import { Searchbar } from '../../components/search/Searchbar'
import styles from './HomePage.module.css'
import { FilterBar, type FilterItem } from './components/FilterBar/FilterBar'
import CompactNavBar from './components/CompactNavBar/CompactNavBar'
import CompactSearchBar from './components/SearchMode/CompactSearchBar'
import { HomeTopNav } from './components/HomeTopNav/HomeTopNav'
import dailyNewsLogo from '@/assets/images/dailynews_logo.png';
import { useHomeScrollRestoration } from './ScrollRestorationProvider'

const ITEMS: FilterItem[] = [
  { key: 'urgent', label: 'Urgent' },
  { key: 'unread', label: 'Unread', segment: 'readStatus' },
  { key: 'inProgress', label: 'In Progress', segment: 'readStatus' },
  { key: 'expired', label: 'Expired' },
  { key: 'desktopOnly', label: 'Desktop Only', segment: 'platform' },
]

export const HomePage = () => {
  useHomeScrollRestoration()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showCompactNav, setShowCompactNav] = useState(false)
  const [isSearchState, setIsSearchState] = useState(false)
  const filterSectionRef = useRef<HTMLDivElement | null>(null)
  const searchModeCompactBarEndRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const {
    data: activeData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading: isLoadingActive,
  } = useInfiniteQuery({
    queryKey: ['active-products'],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => fetchActiveProducts({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const { data: expiredProducts = [], isLoading: isLoadingExpired } = useQuery({
    queryKey: ['expired-products'],
    queryFn: fetchExpiredProducts,
  })

  const visibleActiveProducts =
    activeData?.pages.flatMap((page) => page.items) ?? []

  const submitSearch = (_event: FormEvent) => {
    console.log('search submit:', query, selectedFilters)
  }

  const toggle = (key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key],
    )
  }

  const handleProductClick = (id: string) => {
    navigate({
      to: '/reading',
      search: (prev) => ({
        ...prev,
        productId: id,
      }),
    })
  }

  const enterSearchMode = ({ scrollToSearchSection = true } = {}) => {
    if (isSearchState) {
      return
    }
    setIsSearchState(true)

    if (!scrollToSearchSection || typeof window === 'undefined') {
      return
    }

    const scrollToSearchBar = () => {
      const target = searchModeCompactBarEndRef.current
      const searchBarEl = document.querySelector<HTMLElement>('[data-compact-search-bar]')
      if (!target || !searchBarEl) {
        return
      }

      const searchBarHeight = searchBarEl.getBoundingClientRect().height
      const targetTop = target.getBoundingClientRect().top + window.scrollY
      const scrollTop = Math.max(targetTop - searchBarHeight, 0)

      window.scrollTo({ top: scrollTop, behavior: 'smooth' })
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToSearchBar)
    })
  }

  const handleSearchAction = () => {
    enterSearchMode()
  }

  const handleSearchInputActivate = () => {
    enterSearchMode({ scrollToSearchSection: false })
  }

  const handleExitSearch = () => {
    setIsSearchState(false)
  }

  const handleOverlayKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleExitSearch()
    }
  }

  const handleHelp = () => {
    console.log('help click')
  }

  const handleLogout = () => {
    console.log('logout')
  }

  useEffect(() => {
    const target = filterSectionRef.current
    if (!target) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCompactNav(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '120px' },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const showBackdrop = isSearchState && query.trim().length === 0

  return (
    <div className={styles.page}>
      {showBackdrop && (
        <div
          className={styles.pageOverlay}
          role="button"
          tabIndex={0}
          aria-label="Exit search mode"
          onClick={handleExitSearch}
          onKeyDown={handleOverlayKeyDown}
        />
      )}
      {isSearchState ? (
        <CompactSearchBar
          visible
          query={query}
          onQueryChange={setQuery}
          onSearchSubmit={submitSearch}
          filterItems={ITEMS}
          selectedFilters={selectedFilters}
          onToggleFilter={toggle}
          onClearFilters={() => setSelectedFilters([])}
          onExitSearch={handleExitSearch}
        />
      ) : (
        <CompactNavBar
          visible={showCompactNav}
          onSearchAction={handleSearchAction}
          onHelp={handleHelp}
          onLogout={handleLogout}
          filterItems={ITEMS}
          selectedFilters={selectedFilters}
          onToggleFilter={toggle}
          onClearFilters={() => setSelectedFilters([])}
        />
      )}
      <section className={[styles.container, showBackdrop ? styles.containerBlurred : ''].filter(Boolean).join(' ')}>
        <div className={styles.wrapperLanding}>
          {!isSearchState && <HomeTopNav onHelp={handleHelp} onLogout={handleLogout} />}
          <img
            className={styles.logo}
            src={dailyNewsLogo}
            alt="DailyNews"
            width={460}
            height={56}
          />
        </div>
        <div ref={filterSectionRef} className={styles.searchSectionWrapper}>
          <div className={[styles.searchSection, isSearchState ? styles.searchSectionHidden : ''].filter(Boolean).join(' ')}>
            <Searchbar
              query={query}
              onQueryChange={setQuery}
              onSubmit={submitSearch}
              onActivate={handleSearchInputActivate}
            />
            <div ref={searchModeCompactBarEndRef} />
            <FilterBar
              items={ITEMS}
              selectedKeys={selectedFilters}
              onToggle={toggle}
              onClear={() => setSelectedFilters([])}
            />
          </div>
        </div>

        <Grid
          container
          spacing={3}
          className={styles.panes}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <article className={styles.pane}>
              <h2>Active</h2>
              <div>
                {visibleActiveProducts.map((product) => (
                  <ProductCard
                    key={product.systemDocId}
                    product={product}
                    onProductClick={handleProductClick}
                  />
                ))}
                <div ref={sentinelRef} />
                <p className={styles.lazyStatus}>
                  {isLoadingActive
                    ? 'Loading articles...'
                    : isFetchingNextPage
                      ? 'Loading more articles...'
                      : hasNextPage
                        ? ''
                        : 'Loaded all articles'}
                </p>
              </div>
            </article>
          </Grid>
          <Grid sx={{ display: { xs: 'none', md: 'block' } }} size={{ md: 4 }}>
            <article className={styles.pane}>
              <h2>Expired</h2>
              <div>
                {(isLoadingExpired ? [] : expiredProducts).slice(0, 5).map((product) => (
                  <ProductCard
                    key={product.systemDocId}
                    product={product}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            </article>
            <p>View all expired</p>
          </Grid>
        </Grid>
      </section>
    </div>
  )
}
