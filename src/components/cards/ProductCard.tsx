import type { KeyboardEvent } from 'react'

import { Product } from '../../models/Product'
import { isDesktopOnlyProduct } from '../../utils/productUtils'
import Label from '../labels/Label'
import ProductCardFooter from './ProductCardFooter'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  product: Product
  onProductClick: (id: string) => void
  className?: string
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
})

const formatDate = (raw: string) => {
  const parsed = Date.parse(raw)
  if (Number.isNaN(parsed)) {
    return null
  }
  return dateFormatter.format(new Date(parsed))
}

const pluralise = (value: number, unit: string) =>
  `${value} ${unit}${value === 1 ? '' : 's'}`;

const isExpired = (rawExpiry: string) => {
  const parsed = Date.parse(rawExpiry)
  if (Number.isNaN(parsed)) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return parsed < today.getTime()
}

const getProgressPercent = (value: number) => {
  if (!Number.isFinite(value)) return 0
  if (value <= 1) return Math.round(value * 100)
  return Math.round(Math.min(value, 100))
}

export const ProductCard = ({
  product,
  onProductClick,
  className,
}: ProductCardProps) => {
  const publishedDisplay = formatDate(product.publishedDate)
  const progressPercent = getProgressPercent(product.readProgress)
  const readDurationLabel = pluralise(product.readingDuration, 'minute')
  const isRead = product.isRead
  const showDesktopLabel = isDesktopOnlyProduct(product.classification)
  const pieChartDegrees = [progressPercent, 100 - progressPercent]
  const expired = isExpired(product.expiryDate)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onProductClick(product.systemDocId)
    }
  }

  const cardClasses = [styles.card]
  if (expired) {
    cardClasses.push(styles.expired)
  } else if (isRead) {
    cardClasses.push(styles.read)
  } else {
    cardClasses.push(styles.unread)
  }

  if (className) cardClasses.push(className)

  const titleClasses = [styles.title]
  if (expired) {
    titleClasses.push(styles.titleClamp)
  }

  return (
    <article
      className={cardClasses.join(' ')}
      onClick={() => onProductClick(product.systemDocId)}
      onKeyDown={handleKeyDown}
    >
      {!expired && !isRead ? (
        <img
          className={styles.background}
          src="card_background_dark.svg"
          alt=""
        />
      ) : null}

      <div className={styles.content}>
        <div className={styles.metaRow}>
          {publishedDisplay ? (
            <span className={styles.metaItem}>Published {publishedDisplay}</span>
          ) : null}

          {expired ? (
            <>
              {publishedDisplay ? (
                <img
                  className={styles.metaSeparator}
                  src="interpunct.svg"
                  alt=""
                  aria-hidden="true"
                />
              ) : null}
              <span className={styles.metaItem}>Expired</span>
            </>
          ) : null}

          <span className={styles.spacer} />
          <div className={styles.badges}>
            {product.isUrgent ? (
              <Label
                text="Urgent"
                backgroundColor="var(--color-secondary)"
                textColor="var(--color-on-primary, #0f172a)"
              />
            ) : null}
          </div>
        </div>

        <h3 className={titleClasses.join(' ')}>{product.title}</h3>

        <ProductCardFooter
          showDesktopLabel={showDesktopLabel}
          isRead={isRead}
          progressPercent={progressPercent}
          readDurationLabel={readDurationLabel}
          pieChartDegrees={pieChartDegrees}
        />
      </div>
    </article>
  )
}

export default ProductCard
