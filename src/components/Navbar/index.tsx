import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export const Navbar = () => {
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
            Checkout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
