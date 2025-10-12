import { Link, useRouterState } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

import styles from './AppRootLayout.module.css'

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

  return (
    <div className={styles.container}>
      <header className={styles.navbar}>
        <div className={styles.brand}>Article Hub</div>

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
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  )
}

