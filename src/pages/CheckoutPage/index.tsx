import { useCartProducts } from "../../hooks/useCartProducts";
import { RecommendedSection } from "./RecommendedSection";
import styles from "./styles.module.css";

export const CheckoutPage = () => {
  const {
    cartProducts,
    addToCart,
    removeSingleInstanceFromCart,
    removeAllInstancesFromCart,
    getSingleCartProductPrice,
    getEntireCartProductsPrice,
  } = useCartProducts();

  const handlePurchase = () => {
    // TODO: execute purchase (API call / dialog / navigate / etc.)
  };

  const entireCartProductsPrice = getEntireCartProductsPrice().toFixed(2);

  const isEmpty = cartProducts.length === 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Checkout</h1>
          <p className={styles.subtitle}>
            Review your cart, adjust quantities, and complete your purchase.
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.summaryPill}>
            {/* TODO: replace cartLines.length with total items if you track it */}
            <span className={styles.summaryLabel}>Items</span>
            <span className={styles.summaryValue}>{cartProducts.length}</span>
          </div>

          <div className={styles.summaryPill}>
            <span className={styles.summaryLabel}>Total</span>
            {/* TODO: format as currency if you have a formatter */}
            <span className={styles.summaryValue}>
              ${entireCartProductsPrice}
            </span>
          </div>
        </div>
      </header>

      {isEmpty ? (
        <section className={styles.emptyCard}>
          <div className={styles.emptyTitle}>Your cart is empty</div>
          <div className={styles.emptyText}>
            Add products from the Home page, then return here to complete your
            purchase.
          </div>
        </section>
      ) : (
        <div className={styles.layout}>
          <section className={styles.cartSection}>
            <div className={styles.sectionTitle}>Cart products</div>

            <div className={styles.lines}>
              {cartProducts.map((product) => {
                return (
                  <article key={product.id} className={styles.lineCard}>
                    <div className={styles.lineTop}>
                      <div className={styles.lineTitleWrap}>
                        <div
                          className={styles.productName}
                          title={product.name}
                        >
                          {product.name}
                        </div>

                        <div className={styles.metaRow}>
                          {product.category ? (
                            <span className={styles.badge}>
                              {product.category}
                            </span>
                          ) : null}
                          <span className={styles.metaText}>
                            Seller:{" "}
                            <b className={styles.metaStrong}>
                              {product.seller}
                            </b>
                          </span>
                          <span className={styles.dot} aria-hidden="true" />
                          <span className={styles.metaText}>
                            Uploaded:{" "}
                            <b className={styles.metaStrong}>
                              {product.uploadingDate}
                            </b>
                          </span>
                        </div>
                      </div>

                      <div className={styles.unitPrice}>
                        <div className={styles.unitPriceLabel}>Unit price</div>
                        <div className={styles.unitPriceValue}>
                          ${product.price}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className={styles.description}>
                      {product.description}
                    </div>

                    {/* Bottom row: quantity controls + total calculation */}
                    <div className={styles.lineBottom}>
                      <div className={styles.controls}>
                        <div className={styles.qtyBox}>
                          <div className={styles.qtyLabel}>Quantity</div>
                          <div className={styles.qtyValue}>
                            {product.quantity}
                          </div>
                        </div>

                        <div className={styles.buttons}>
                          <button
                            type="button"
                            className={`${styles.btn} ${styles.btnPrimary}`}
                            onClick={() => addToCart(product)}
                          >
                            + Add one
                          </button>

                          <button
                            type="button"
                            className={`${styles.btn} ${styles.btnSecondary}`}
                            onClick={() =>
                              removeSingleInstanceFromCart(product)
                            }
                          >
                            − Remove one
                          </button>

                          <button
                            type="button"
                            className={`${styles.btn} ${styles.btnDanger}`}
                            onClick={() => removeAllInstancesFromCart(product)}
                          >
                            Remove all
                          </button>
                        </div>
                      </div>

                      <div className={styles.lineTotal}>
                        <div className={styles.lineTotalLabel}>Line total</div>

                        {/* “price × qty = total” */}
                        <div className={styles.lineTotalMath}>
                          <span className={styles.mathItem}>
                            ${product.price}
                          </span>
                          <span className={styles.mathOp}>×</span>
                          <span className={styles.mathItem}>
                            {product.quantity}
                          </span>
                          <span className={styles.mathOp}>=</span>
                          <span className={styles.mathTotal}>
                            ${getSingleCartProductPrice(product).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* RIGHT: purchase summary */}
          <aside className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>Order summary</div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Subtotal</span>
                <span className={styles.summaryRowValue}>
                  ${entireCartProductsPrice}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span className={styles.summaryRowLabel}>Shipping</span>
                {/* TODO: compute shipping or keep as 0 */}
                <span className={styles.summaryRowValue}>$0</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.summaryRowTotal}>
                <span className={styles.summaryRowLabelStrong}>Total</span>
                <span className={styles.summaryRowValueStrong}>
                  ${entireCartProductsPrice}
                </span>
              </div>

              <button
                type="button"
                className={styles.buyButton}
                onClick={handlePurchase}
                // TODO: disable if invalid/empty/loading
                // disabled={isEmpty || isPurchasing || ...}
              >
                Buy now
              </button>

              <div className={styles.summaryHint}>
                By clicking “Buy now”, you confirm your purchase.{" "}
                {/* TODO: adjust text */}
              </div>
            </div>
          </aside>
          <div style={{ marginTop: "100px" }}></div>
          <RecommendedSection />
        </div>
      )}
    </div>
  );
};
