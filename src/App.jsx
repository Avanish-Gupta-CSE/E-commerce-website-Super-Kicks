import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/sign-up/Signup";
import { ProductListing } from "./pages/product-listing/ProductsListing";
import { Navigation } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { ProductDetails } from "./pages/Product-details/ProductDetails";
import { RequiresAuth } from "./components/RequiresAuth";
import Checkout from "./pages/checkout/Checkout";
import { NotFound } from "./pages/not-found/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
        Skip to main content
      </a>
      <Navigation />
      <ErrorBoundary>
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={
                <RequiresAuth>
                  <Cart />
                </RequiresAuth>
              }
            />
            <Route
              path="/wishlist"
              element={
                <RequiresAuth>
                  <Wishlist />
                </RequiresAuth>
              }
            />
            <Route
              path="/checkout"
              element={
                <RequiresAuth>
                  <Checkout />
                </RequiresAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ErrorBoundary>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
