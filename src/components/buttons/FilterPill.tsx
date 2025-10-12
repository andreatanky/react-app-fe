import type { ButtonHTMLAttributes } from 'react'
import styles from './FilterPill.module.css'

export type FilterPillProps = {
    selected?: boolean
    onToggle?: () => void
    label: string

    /** visual options (no behavioral state) */
    roundLeft?: boolean
    roundRight?: boolean
    joined?: boolean          // removes outer gaps so pills can touch
    showDivider?: boolean     // vertical divider between joined pills
    className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>

export function FilterPill({
    selected = false,
    onToggle,
    label,
    roundLeft,
    roundRight,
    joined,
    showDivider,
    className,
    ...rest
}: FilterPillProps) {
    return (
        <button
            type="button"
            className={[
                styles.pill,
                selected ? styles.selected : '',
                joined ? styles.joined : '',
                roundLeft ? styles.roundLeft : '',
                roundRight ? styles.roundRight : '',
                showDivider ? styles.withDivider : '',
                className ?? '',
            ].join(' ')}
            aria-pressed={selected}
            onClick={onToggle}
            {...rest}
        >
            <span className={styles.label}>{label}</span>
        </button>
    )
}
