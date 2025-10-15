import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import Grid from '@mui/material/Grid'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import { useNavigate } from '@tanstack/react-router'

import ProductCard from '../product/components/cards/ProductCard'
import CompactNavBar from './components/CompactNavBar/CompactNavBar'
import CompactSearchBar from './components/SearchMode/CompactSearchBar'
import { HomeTopNav } from './components/HomeTopNav/HomeTopNav'
import dailyNewsLogo from '@/assets/images/dailynews_logo.png'
import { useHomeScrollRestoration } from './ScrollRestorationProvider'
import { HomeFilterBar } from './components/HomeFilterBar'
import { HomeSearchInput } from './components/HomeSearchInput'
import { useStickyVisibility } from './hooks/useStickyVisibility'
import { useInfiniteScrollTrigger } from './hooks/useInfiniteScrollTrigger'
import { useHomeSearch } from './hooks/useHomeSearch'
import { useActiveProductsFeed } from './hooks/useActiveProductsFeed'
import { useExpiredProducts } from './hooks/useExpiredProducts'
import { Page } from './styled/Page'
import {
  StyledContainer,
  WrapperLanding,
  Logo,
  SearchSectionWrapper,
  SearchSection,
  SearchModePlaceholder,
  SearchModeBreadcrumb,
  SearchModeRoot,
  SearchModeTrail,
  SearchModeDelimiter,
  SearchModeQuery,
} from './styled/layout'
import { Pane, Panes, LazyStatus } from './styled/feeds'
import { PageOverlay } from './styled/overlay'

export const HomePage = () => {
  useHomeScrollRestoration()
  const navigate = useNavigate()
  const { query, selectedFilters, isSearchMode, enterSearchMode, exitSearchMode } =
    useHomeSearch()
  const muiTheme = useMuiTheme()
  const filterSectionRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const {
    items: activeProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingActive,
  } = useActiveProductsFeed()

  const { products: expiredProducts, isLoading: isLoadingExpired } =
    useExpiredProducts()

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

  const handleSearchAction = useCallback(() => {
    if (!isSearchMode) {
      enterSearchMode()
    }
  }, [enterSearchMode, isSearchMode])

  const handleSearchInputActivate = handleSearchAction

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

  const stickyObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ threshold: 0 }),
    [],
  )
  const showCompactNav = useStickyVisibility(
    filterSectionRef,
    !isSearchMode,
    stickyObserverOptions,
  )

  const infiniteScrollObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin: '120px' }),
    [],
  )

  const shouldFetchMore = useInfiniteScrollTrigger(
    sentinelRef,
    hasNextPage && !isFetchingNextPage,
    infiniteScrollObserverOptions,
  )

  useEffect(() => {
    if (shouldFetchMore) {
      fetchNextPage()
    }
  }, [fetchNextPage, shouldFetchMore])

  useEffect(() => {
    if (isSearchMode && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isSearchMode])

  const trimmedQuery = query.trim()
  const showBackdrop = isSearchMode && trimmedQuery.length === 0 && selectedFilters.length === 0

  return (
    <Page>
      {showBackdrop && (
        <PageOverlay
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
        />
      ) : (
        <CompactNavBar
          visible={showCompactNav}
          onSearchAction={handleSearchAction}
          onHelp={handleHelp}
          onLogout={handleLogout}
        />
      )}
      <StyledContainer blurred={showBackdrop}>
        {isSearchMode ? (
          <SearchModePlaceholder />
        ) : (
          <>
            <WrapperLanding>
              <HomeTopNav onHelp={handleHelp} onLogout={handleLogout} />
              <Logo src={dailyNewsLogo} alt="DailyNews" width={460} height={56} />
            </WrapperLanding>
            <SearchSectionWrapper ref={filterSectionRef}>
              <SearchSection>
                <HomeSearchInput
                  onSubmit={submitSearch}
                  onActivate={handleSearchInputActivate}
                  backgroundColor={muiTheme.palette.surface.containerHigh}
                />
                <HomeFilterBar />
              </SearchSection>
            </SearchSectionWrapper>
          </>
        )}

        <Panes container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Pane>
              <h2>Active</h2>
              <div>
                {activeProducts.map((product) => (
                  <ProductCard
                    key={product.systemDocId}
                    product={product}
                    onProductClick={handleProductClick}
                  />
                ))}
                <div ref={sentinelRef} />
                <LazyStatus>
                  {isLoadingActive
                    ? 'Loading articles...'
                    : isFetchingNextPage
                      ? 'Loading more articles...'
                      : hasNextPage
                        ? ''
                        : 'Loaded all articles'}
                </LazyStatus>
              </div>
            </Pane>
          </Grid>
          <Grid sx={{ display: { xs: 'none', md: 'block' } }} size={{ md: 4 }}>
            <Pane>
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
            </Pane>
            <p>View all expired</p>
          </Grid>
        </Panes>
      </StyledContainer>
    </Page>
  )
}
