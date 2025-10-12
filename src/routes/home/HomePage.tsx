import { FormEvent, useState } from 'react'
import Grid from '@mui/material/Grid'

import ProductCard from '../../components/cards/ProductCard'
import type { Product } from '../../models/Product'
import { Searchbar } from '../../components/search/Searchbar'
import styles from './HomePage.module.css'
import { FilterBar, type FilterItem } from './components/FilterBar'
import { HomeHeroBanner } from './components/HomeHeroBanner'

const ITEMS: FilterItem[] = [
  { key: 'urgent', label: 'Urgent' },
  { key: 'unread', label: 'Unread', segment: 'readStatus' },
  { key: 'inProgress', label: 'In Progress', segment: 'readStatus' },
  { key: 'expired', label: 'Expired' },
  { key: 'desktopOnly', label: 'Desktop Only', segment: 'platform' },
]

const MOCK_ACTIVE_PRODUCTS: Product[] = [
  {
    systemDocId: 'prod-1',
    title: 'Exciting Discoveries in Renewable Energy',
    publishedDate: '2025-01-26',
    expiryDate: '2025-02-09',
    readProgress: 0,
    readingDuration: 7,
    isRead: false,
    classification: 4,
    isUrgent: true,
  },
  {
    systemDocId: 'prod-2',
    title: 'Technology Advancements: Revolutionizing Communication',
    publishedDate: '2025-01-24',
    expiryDate: '2025-02-07',
    readProgress: 1,
    readingDuration: 5,
    isRead: true,
    classification: 5,
    isUrgent: false,
  },
  {
    systemDocId: 'prod-3',
    title: 'How Enthusiasts Are Leading a Market Revival',
    publishedDate: '2025-01-21',
    expiryDate: '2025-02-04',
    readProgress: 0,
    readingDuration: 6,
    isRead: false,
    classification: 3,
    isUrgent: false,
  },
  {
    systemDocId: 'prod-2',
    title: 'Technology Advancements: Revolutionizing Communication Technology Advancements: Revolutionizing Communication Technology Advancements: Revolutionizing Communication',
    publishedDate: '2025-01-24',
    expiryDate: '2025-02-07',
    readProgress: 60,
    readingDuration: 5,
    isRead: true,
    classification: 3,
    isUrgent: false,
  }
]

export const HomePage = () => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])

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

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <HomeHeroBanner onHelp={() => { }} onLogout={() => { }} />

        <div className={styles.searchSectionWrapper}>
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
          <Grid size={8}>
            <article className={styles.pane}>
              <h2>Active</h2>
              <div className={styles.productList}>
                {MOCK_ACTIVE_PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.systemDocId}
                    product={product}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            </article>
          </Grid>

          <Grid size={4}>
            <article className={styles.pane}>
              <h2>Expired</h2>
            </article>
          </Grid>
        </Grid>
      </section>
    </div>
  )
}

