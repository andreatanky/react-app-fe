import styles from './HomePage.module.css'

export const HomePage = () => (
  <section className={styles.container}>
    <header className={styles.header}>
      <h1>Explore Articles</h1>
      <p>Search and filter active versus expired content.</p>
    </header>

    <div className={styles.panes}>
      <article className={styles.pane}>
        <h2>Active Articles</h2>
        <p>Visible list of articles that have not expired.</p>
      </article>

      <article className={styles.pane}>
        <h2>Expired Articles</h2>
        <p>Archive of content that has reached its expiration.</p>
      </article>
    </div>
  </section>
)

