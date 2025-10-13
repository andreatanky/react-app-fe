import { HomeTopNav } from '../HomeTopNav/HomeTopNav'
import styles from './HomeHeroBanner.module.css'
import dailyNewsLogo from '@/assets/images/dailynews_logo.png';

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
      src={dailyNewsLogo}
      alt="DailyNews"
      width={460}
      height={56}
    />
  </div>
)
