import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { NAVBAR_LINKS } from "./texts";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>KoGu</div>

        <div className={styles.links}>
          {Object.entries(NAVBAR_LINKS).map(([key, item]) => (
            <NavLink
              key={key}
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
