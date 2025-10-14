import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import Grid from '@mui/material/Grid'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import ProductCard from '../product/components/cards/ProductCard'
import { fetchActiveProducts, fetchExpiredProducts } from '../../mocks/api/productsApi'
import styles from './HomePage.module.css'
import CompactNavBar from './components/CompactNavBar/CompactNavBar'
import CompactSearchBar from './components/SearchMode/CompactSearchBar'
import { HomeTopNav } from './components/HomeTopNav/HomeTopNav'
import dailyNewsLogo from '@/assets/images/dailynews_logo.png';
import { useHomeScrollRestoration } from './ScrollRestorationProvider'
import { HomeFilterBar } from './components/HomeFilterBar'
import { HomeSearchInput } from './components/HomeSearchInput'
import { useIsIntersecting } from './hooks/useIsIntersecting'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import { useHomeSearch } from './hooks/useHomeSearch'

export const HomePage = () => {
  useHomeScrollRestoration()
  const navigate = useNavigate()
  const { query, selectedFilters, isSearchMode, enterSearchMode, exitSearchMode } =
    useHomeSearch()
  const filterSectionRef = useRef<HTMLDivElement | null>(null)
  const compactSearchBarRef = useRef<HTMLDivElement | null>(null)
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

  const submitSearch = useCallback(
    (_event: FormEvent) => {
      console.log('search submit:', query, selectedFilters)
    },
    [query, selectedFilters],
  )

  const handleProductClick = (id: string) => {
    navigate({
      to: '/reading',
      search: (prev) => ({
        ...prev,
        productId: id,
      }),
    })
  }

  const enterSearchModeWithScroll = useCallback(
    ({ scrollToSearchSection = true } = {}) => {
      if (isSearchMode) {
        return
      }
      enterSearchMode()

      if (!scrollToSearchSection || typeof window === 'undefined') {
        return
      }

      const scrollToSearchBar = () => {
        const target = searchModeCompactBarEndRef.current
        const searchBarEl = compactSearchBarRef.current
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
    },
    [enterSearchMode, isSearchMode],
  )

  const handleSearchAction = () => {
    enterSearchModeWithScroll()
  }

  const handleSearchInputActivate = () => {
    enterSearchModeWithScroll({ scrollToSearchSection: false })
  }

  const handleExitSearch = () => {
    exitSearchMode()
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

  const filterObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ threshold: 0 }),
    [],
  )
  const isFilterSectionIntersecting = useIsIntersecting(
    filterSectionRef,
    filterObserverOptions,
  )
  const showCompactNav = !isFilterSectionIntersecting

  const infiniteScrollObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin: '120px' }),
    [],
  )

  useInfiniteScroll(
    sentinelRef,
    fetchNextPage,
    infiniteScrollObserverOptions,
    !hasNextPage || isFetchingNextPage,
  )

  const showBackdrop = isSearchMode && query.trim().length === 0

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
      {isSearchMode ? (
        <CompactSearchBar
          visible
          onSearchSubmit={submitSearch}
          onExitSearch={handleExitSearch}
          ref={compactSearchBarRef}
        />
      ) : (
        <CompactNavBar
          visible={showCompactNav}
          onSearchAction={handleSearchAction}
          onHelp={handleHelp}
          onLogout={handleLogout}
        />
      )}
      <section className={[styles.container, showBackdrop ? styles.containerBlurred : ''].filter(Boolean).join(' ')}>
        <div className={styles.wrapperLanding}>
          {!isSearchMode && <HomeTopNav onHelp={handleHelp} onLogout={handleLogout} />}
          <img
            className={styles.logo}
            src={dailyNewsLogo}
            alt="DailyNews"
            width={460}
            height={56}
          />
        </div>
        <div ref={filterSectionRef} className={styles.searchSectionWrapper}>
          <div className={[styles.searchSection, isSearchMode ? styles.searchSectionHidden : ''].filter(Boolean).join(' ')}>
            <HomeSearchInput
              onSubmit={submitSearch}
              onActivate={handleSearchInputActivate}
            />
            <div ref={searchModeCompactBarEndRef} />
            <HomeFilterBar />
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
