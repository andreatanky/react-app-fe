import { type ReactNode } from 'react'

import Label from '../labels/Label'
import PieChart from '../piechart/PieChart'
import styles from './ProductCard.module.css'

type ProductCardFooterProps = {
  showDesktopLabel: boolean
  isRead: boolean
  progressPercent: number
  readDurationLabel: string
  pieChartDegrees: number[]
}

export const ProductCardFooter = ({
  showDesktopLabel,
  isRead,
  progressPercent,
  readDurationLabel,
  pieChartDegrees,
}: ProductCardFooterProps) => {
  const segments: ReactNode[] = []

  if (!isRead) {
    segments.push(
      <span className={styles.metaItem} key="status-unread">
        <span>Unread</span>
      </span>,
    )
  } else if (progressPercent >= 100) {
    segments.push(
      <span className={styles.metaItem} key="status-read">
        <img className={styles.icon} src="task_alt.svg" alt="Complete" />
        <span>Read</span>
      </span>,
    )
  } else {
    segments.push(
      <span className={styles.metaItem} key="status-progress">
        <PieChart degrees={pieChartDegrees} />
        <span>In Progress</span>
      </span>,
    )
  }

  segments.push(
    <span key="duration">
      {readDurationLabel}
    </span>,
  )

  return (
    <div className={styles.footer}>
      {showDesktopLabel ? (
        <Label
          className={styles.desktopOnlyLabel}
          text="Desktop Only"
          backgroundColor="var(--color-on-surface-variant)"
          textColor="var(--color-surface)"
        />
      ) : null}

      <div className={styles.readStatusContainer}>
        {segments.map((segment, index) => (
          <span className={styles.footerItem} key={index}>
            {index > 0 ? (
              <img
                className={styles.separator}
                src="interpunct.svg"
                alt=""
                aria-hidden="true"
              />
            ) : null}
            {segment}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProductCardFooter
