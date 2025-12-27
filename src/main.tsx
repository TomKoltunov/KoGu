import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProductsProvider } from "./context/CartProductsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProductsProvider>
      <App />
    </CartProductsProvider>
  </StrictMode>
);
