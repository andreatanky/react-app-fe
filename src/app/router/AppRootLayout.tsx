import type { PropsWithChildren } from 'react'

import styles from './AppRootLayout.module.css'

export const AppRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
