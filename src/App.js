import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/sign-up/Signup";
import { ProductListing } from "./pages/product-listing/ProductsListing";
import Mockman from "mockman-js";
import { Navigation } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { ProductDetails } from "./pages/Product-details/ProductDetails";
import { RequiresAuth } from "./components/RequiresAuth";
import React from "react";
import Checkout from "./pages/checkout/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route
                    path="/products/:productId"
                    element={<ProductDetails />}
                />
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/mockman" element={<Mockman />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />{" "}
        </div>
    );
}

export default App;
