import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100vw",
        backgroundColor: "lightgrey",
      }}
    >
      <NavLink to="/">HomePage</NavLink>
      <NavLink to="/aboutUs">AboutUsPage</NavLink>
      <NavLink to="/checkout">CheckoutPage</NavLink>
    </nav>
  );
};
