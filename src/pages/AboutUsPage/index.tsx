import styles from "./styles.module.css";

export const AboutUsPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>About us</h1>
      <p className={styles.text}>
        KoGu is a small demo shop UI. Here you can explain what you sell, why
        it’s awesome, and what makes your marketplace different.
      </p>
    </div>
  );
};
