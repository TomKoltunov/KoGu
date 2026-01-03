import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCartProducts } from "../../hooks/useCartProducts";

export const Navbar = () => {
  const { cartProducts, resetCart } = useCartProducts();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>KoGu</div>

        <div className={styles.links}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/aboutUs"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            About us
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <span className={styles.cartLink}>
              <ShoppingCartOutlinedIcon fontSize="small" />
              <span className={styles.cartCount}>({cartProducts.length})</span>
            </span>
          </NavLink>
          <button
            type="button"
            className={styles.resetButton}
            onClick={resetCart}
            disabled={cartProducts.length === 0}
          >
            Reset cart
          </button>
        </div>
      </div>
    </nav>
  );
};
