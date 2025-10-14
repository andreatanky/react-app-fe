import { FormEvent } from 'react'
import styles from './SearchBar.module.css'
import searchIcon from '@/assets/icons/search_icon.svg';

export type SearchbarProps = {
    query: string
    onQueryChange: (newQuery: string) => void
    onSubmit: (e: FormEvent) => void
    placeholder?: string
    backgroundColor?: string
    onActivate?: () => void
}

export const Searchbar = ({
    query,
    onQueryChange,
    onSubmit,
    placeholder = "Search all article titles",
    backgroundColor,
    onActivate
}: SearchbarProps) => {

    const submit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(e)
    }

    const handleActivate = () => {
        onActivate?.()
    }

    return <form role="search" className={[styles.container].join(' ')} style={backgroundColor ? { background: backgroundColor } : undefined} onSubmit={submit}>
        <span className={styles.icon} aria-hidden="true">
            <img
                className={styles.logo}
                src={searchIcon}
                alt="Search"
            />
        </span>
        <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={handleActivate}
            onClick={handleActivate}
            className={styles.input}
            type="search"
            placeholder={placeholder}
            aria-label="Search articles"
        />
    </form>
}
