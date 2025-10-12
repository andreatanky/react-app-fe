import { Link, useRouterState } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

import styles from './AppRootLayout.module.css'
import { useTheme } from '../../features/theme/ThemeProvider'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/reading', label: 'Reading' },
  { to: '/help', label: 'Help' },
]

export const AppRootLayout = ({ children }: PropsWithChildren) => {
  const { location } = useRouterState({
    select: (state) => ({
      location: state.location.href,
    }),
  })
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <div className={styles.brand}>Article Hub</div>

        <div className={styles.navContent}>
          <nav className={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = location === item.to || location === `${item.to}/`

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={isActive ? styles.activeLink : styles.link}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Activate ${isDarkMode ? 'light' : 'dark'} theme`}
          >
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  )
}
