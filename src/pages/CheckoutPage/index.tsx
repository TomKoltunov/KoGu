import styles from "./styles.module.css";

export const CheckoutPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>
      <p className={styles.text}>
        This is where your cart + payment form will live.
      </p>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Next step</div>
        <div className={styles.cardText}>
          Add your cart list and your PaymentDialog here, and we’ll style it the
          same way.
        </div>
      </div>
    </div>
  );
};
