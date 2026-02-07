import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { DataProvider } from "./contexts/DataProvider";
import { CartProvider } from "./contexts/CartProvider";
import { WishlistProvider } from "./contexts/WishlistProvider";
import AddressProvider from "./contexts/AddressProvider";
import { OrderProvider } from "./contexts/OrderProvider";
import ScrollToTop from "./helpers/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <WishlistProvider>
              <AddressProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </AddressProvider>
            </WishlistProvider>
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
