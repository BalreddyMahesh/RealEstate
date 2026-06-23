import styles from "./Loader.module.css";

const Loader = ({ type = "page" }) => {
  if (type === "skeleton") {
    return (
      <div className={styles.skeletonCard}>
        <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
        <div className={styles.skeletonBody}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeleton} ${styles.skeletonText}`} />
          <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.short}`} />
          <div className={styles.skeletonRow}>
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
            <div className={`${styles.skeleton} ${styles.skeletonChip}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageLoader}>
      <div className={styles.loaderInner}>
        <div className={styles.logoMark}>D</div>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default Loader;
