import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();
const reducerFunction = (state, action) => {
    switch (action.type) {
        case "setCart": {
            return { ...state, cart: action.payload };
        }
        case "setWishlist": {
            return { ...state, wishlist: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerFunction, {
        cart: [],
        wishlist: [],
    });
    const fetchCartData = async () => {
        try {
            const res = await fetch("/api/user/cart", {
                method: "GET",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
            });
            if (res.status === 200) {
                const { cart } = await res.json();
                dispatch({ type: "setCart", payload: cart });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchWishlistData = async () => {
        try {
            const res = await fetch("/api/user/wishlist", {
                method: "GET",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
            });
            if (res.status === 200) {
                const { wishlist } = await res.json();
                dispatch({ type: "setWishlist", payload: wishlist });
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCartData();
        fetchWishlistData();
    }, []);
    const addToCartHandler = async (product) => {
        try {
            const res = await fetch("/api/user/cart", {
                method: "POST",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
                body: JSON.stringify({ product }),
            });
            if (res.status === 201) {
                const { cart } = await res.json();
                dispatch({ type: "setCart", payload: cart });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const isItemPresentInCartHandler = (product) => {
        return state.cart.find(({ _id }) => product._id === _id);
    };

    const isItemPresentinWishlistHandler = (product) => {
        return state.wishlist.find(({ _id }) => product._id === _id);
    };

    const incQtyHandler = async (id) => {
        try {
            const bodySent = {
                action: {
                    type: "increment",
                },
            };
            const res = await fetch(`/api/user/cart/${id}`, {
                method: "POST",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
                body: JSON.stringify(bodySent),
            });
            if (res.status === 200) {
                const { cart } = await res.json();
                dispatch({ type: "setCart", payload: cart });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const decQtyHandler = async (id) => {
        try {
            const bodySent = {
                action: {
                    type: "decrement",
                },
            };
            const res = await fetch(`/api/user/cart/${id}`, {
                method: "POST",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
                body: JSON.stringify(bodySent),
            });
            if (res.status === 200) {
                const { cart } = await res.json();
                dispatch({ type: "setCart", payload: cart });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const removeFromCartHandler = async (id) => {
        try {
            const res = await fetch(`/api/user/cart/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
            });
            if (res.status === 200) {
                const { cart } = await res.json();
                dispatch({ type: "setCart", payload: cart });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const removeFromWishlistHandler = async (id) => {
        try {
            const res = await fetch(`/api/user/wishlist/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
            });
            if (res.status === 200) {
                const { wishlist } = await res.json();
                dispatch({ type: "setWishlist", payload: wishlist });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addToWishlistHandler = async (product) => {
        try {
            const res = await fetch("/api/user/wishlist", {
                method: "POST",
                headers: {
                    authorization: `${localStorage.getItem("encodedToken")}`,
                },
                body: JSON.stringify({ product }),
            });
            if (res.status === 201) {
                const { wishlist } = await res.json();
                dispatch({ type: "setWishlist", payload: wishlist });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const items = state.cart.reduce((acc, { qty }) => acc + qty, 0);
    const totalPrice = state.cart.reduce(
        (acc, { price, qty }) => acc + price * qty,
        0
    );
    const totalDiscount = state.cart.reduce(
        (acc, { price, discountedPrice, qty }) =>
            acc + (price - discountedPrice) * qty,
        0
    );
    const netPrice = totalPrice - totalDiscount;

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                addToCartHandler,
                isItemPresentInCartHandler,
                incQtyHandler,
                decQtyHandler,
                removeFromCartHandler,
                wishlist: state.wishlist,
                addToWishlistHandler,
                isItemPresentinWishlistHandler,
                removeFromWishlistHandler,
                items,
                totalPrice,
                totalDiscount,
                netPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
