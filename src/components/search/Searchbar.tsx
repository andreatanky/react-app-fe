import { FormEvent } from 'react'
import styles from './SearchBar.module.css'

export type SearchbarProps = {
    query: string
    onQueryChange: (newQuery: string) => void
    onSubmit: (e: FormEvent) => void
    placeholder?: string
}

export const Searchbar = ({ query, onQueryChange, onSubmit, placeholder = "Search all article titles" }: SearchbarProps) => {

    const submit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(e)
    }

    return <form role="search" className={[styles.container].join(' ')} onSubmit={submit}>
        <span className={styles.icon} aria-hidden="true">
            <img
                className={styles.logo}
                src="/search_icon.svg"
                alt="Search"
            />
        </span>
        <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className={styles.input}
            type="search"
            placeholder={placeholder}
            aria-label="Search articles"
        />
    </form>
}