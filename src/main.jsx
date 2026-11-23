import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProdukProvider } from "./context/ProdukContext";
import { KeranjangProvider } from "./context/KeranjangContext";
import { WishlistProvider } from "./context/WishlistContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProdukProvider>
        <KeranjangProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </KeranjangProvider>
      </ProdukProvider>
    </BrowserRouter>
  </StrictMode>,
);
