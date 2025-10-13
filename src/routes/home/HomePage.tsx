import { FormEvent, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import ProductCard from '../../components/cards/ProductCard'
import { fetchActiveProducts, fetchExpiredProducts } from '../../mocks/api/productsApi'
import { Searchbar } from '../../components/search/Searchbar'
import styles from './HomePage.module.css'
import { FilterBar, type FilterItem } from './components/FilterBar'
import { HomeHeroBanner } from './components/HomeHeroBanner'
import CompactNavBar from './components/CompactNavBar'

const ITEMS: FilterItem[] = [
  { key: 'urgent', label: 'Urgent' },
  { key: 'unread', label: 'Unread', segment: 'readStatus' },
  { key: 'inProgress', label: 'In Progress', segment: 'readStatus' },
  { key: 'expired', label: 'Expired' },
  { key: 'desktopOnly', label: 'Desktop Only', segment: 'platform' },
]

export const HomePage = () => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [showCompactNav, setShowCompactNav] = useState(false)
  const filterSectionRef = useRef<HTMLDivElement | null>(null)
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
    console.log('search submit:', query, selected)
  }

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key],
    )
  }

  const handleProductClick = (id: string) => {
    console.log('product click:', id)
  }

  const handleSearchAction = () => {
    filterSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  return (
    <div className={styles.page}>
      <CompactNavBar
        visible={showCompactNav}
        onSearchAction={handleSearchAction}
        onHelp={handleHelp}
        onLogout={handleLogout}
        query={query}
        onQueryChange={setQuery}
        onSearchSubmit={submitSearch}
        filterItems={ITEMS}
        selectedFilters={selected}
        onToggleFilter={toggle}
        onClearFilters={() => setSelected([])}
      />
      <section className={styles.container}>
        <HomeHeroBanner onHelp={handleHelp} onLogout={handleLogout} />

        <div ref={filterSectionRef} className={styles.searchSectionWrapper}>
          <div className={styles.searchSection}>
            <Searchbar query={query} onQueryChange={setQuery} onSubmit={submitSearch} />
            <FilterBar
              items={ITEMS}
              selectedKeys={selected}
              onToggle={toggle}
              onClear={() => setSelected([])}
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
