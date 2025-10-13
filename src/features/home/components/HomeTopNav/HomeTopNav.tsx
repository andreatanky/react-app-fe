import type { HTMLAttributes } from 'react'
import styles from './HomeTopNav.module.css'

type HomeTopNavProps = {
    onHelp: () => void
    onLogout: () => void
} & HTMLAttributes<HTMLElement>

export const HomeTopNav = ({ onHelp, onLogout }: HomeTopNavProps) => {
    return (
        <nav role="navigation" aria-label="Home top navigation">
            <div className={styles.container}>
                <div className={styles.left} />
                <div className={styles.actions}>
                    <button type="button" className={styles.btn} onClick={onHelp} aria-label="Help">
                        Help
                    </button>
                    <button type="button" className={styles.btn} onClick={onLogout} aria-label="Log Out">                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
