import { HomeTopNav } from './HomeTopNav'
import styles from './HomeHeroBanner.module.css'

type HomeHeroBannerProps = {
  onHelp: () => void
  onLogout: () => void
}

export const HomeHeroBanner = ({
  onHelp,
  onLogout,
}: HomeHeroBannerProps) => (
  <div className={styles.wrapper}>
    <HomeTopNav onHelp={onHelp} onLogout={onLogout} />
    <img
      className={styles.logo}
      src="/dailynews_logo.png"
      alt="DailyNews"
      width={460}
      height={56}
    />
  </div>
)
