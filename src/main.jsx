import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./contexts/DataProvider";
import { LoginProvider } from "./contexts/LoginProvider";
import { CartProvider } from "./contexts/CartProvider";
import AddressProvider from "./contexts/AddressProvider";
import ScrollToTop from "./helpers/ScrollToTop";

// Initialize mock server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <DataProvider>
        <LoginProvider>
          <CartProvider>
            <AddressProvider>
              <App />
            </AddressProvider>
          </CartProvider>
        </LoginProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
