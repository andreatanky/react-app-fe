import { FormEvent, useState } from 'react'
import Grid from '@mui/material/Grid'

import ProductCard from '../../components/cards/ProductCard'
import { MOCK_ACTIVE_PRODUCTS, MOCK_EXPIRED_PRODUCTS } from '../../mocks/products'
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
              <div>
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
              <div>
                {MOCK_EXPIRED_PRODUCTS.slice(0, 5).map((product) => (
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
