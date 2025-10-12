import { FormEvent, useState } from 'react'

import { Searchbar } from '../../components/search/Searchbar'
import styles from './HomePage.module.css'
import { FilterBar, type FilterItem } from './components/FilterBar'
import { HomeHeroBanner } from './components/HomeHeroBanner'

const ITEMS: FilterItem[] = [
  { key: 'urgent', label: 'Urgent' }, // standalone
  // joined "status" segment:
  { key: 'unread', label: 'Unread', segment: 'readStatus' },
  { key: 'inProgress', label: 'In Progress', segment: 'readStatus' },
  // another standalone
  { key: 'expired', label: 'Expired' },
  // joined "platform" segment:
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

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <HomeHeroBanner onHelp={() => { }} onLogout={() => { }} />
        <Searchbar query={query} onQueryChange={setQuery} onSubmit={submitSearch} />
        <FilterBar
          items={ITEMS}
          selectedKeys={selected}
          onToggle={toggle}
          onClear={() => setSelected([])}
        />

        <header className={styles.header}>
          <h1>Explore Articles</h1>
          <p>Search and filter active versus expired content.</p>
        </header>

        <div className={styles.panes}>
          <article className={styles.pane}>
            <h2>Active Articles</h2>
            <p>Visible list of articles that have not expired.</p>
          </article>

          <article className={styles.pane}>
            <h2>Expired Articles</h2>
            <p>Archive of content that has reached its expiration.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
