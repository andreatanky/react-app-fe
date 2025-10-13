import Label from '../../../../components/labels/Label'
import styles from './ProductCard.module.css'
import interpunct from '@/assets/icons/interpunct.svg';

type ProductCardHeaderProps = {
  publishedDisplay: string | null
  expired: boolean
  isUrgent: boolean
}

export const ProductCardHeader = ({
  publishedDisplay,
  expired,
  isUrgent,
}: ProductCardHeaderProps) => (
  <div className={styles.metaRow}>
    {publishedDisplay ? (
      <>
        <span className={styles.metaItem}>Published {publishedDisplay}</span>
        <img
          className={styles.separator}
          src={interpunct}
          alt=""
          aria-hidden="true"
        />
      </>
    ) : null}

    <span className={styles.metaItem}>
      {expired ? 'Expired' : 'Expires in 4 days'}
    </span>

    <span className={styles.spacer} />

    <div className={styles.badges}>
      {isUrgent ? (
        <Label
          text="Urgent"
          backgroundColor="var(--color-secondary)"
          textColor="var(--color-on-primary, #0f172a)"
        />
      ) : null}
    </div>
  </div>
)

export default ProductCardHeader

