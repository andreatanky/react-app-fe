import type { PropsWithChildren } from 'react'

import styles from './AppRootLayout.module.css'
import { ScrollRestorationEffect } from '../providers/ScrollRestorationProvider'

export const AppRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <ScrollRestorationEffect />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
