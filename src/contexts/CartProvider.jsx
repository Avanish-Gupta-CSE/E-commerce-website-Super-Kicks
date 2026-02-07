import { createContext, useContext, useEffect, useReducer, useMemo, useCallback } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setCart":
      return { ...state, cart: action.payload };
    case "setWishlist":
      return { ...state, wishlist: action.payload };
    default:
      return state;
  }
};

const getAuthHeaders = () => ({
  authorization: `${localStorage.getItem("encodedToken")}`,
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, {
    cart: [],
    wishlist: [],
  });

  const fetchCartData = useCallback(async () => {
    try {
      const res = await fetch("/api/user/cart", {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (res.status === 200) {
        const { cart } = await res.json();
        dispatch({ type: "setCart", payload: cart });
      }
    } catch (error) {
      console.error("[Cart] Failed to fetch cart:", error.message);
    }
  }, []);

  const fetchWishlistData = useCallback(async () => {
    try {
      const res = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: getAuthHeaders(),
      });
      if (res.status === 200) {
        const { wishlist } = await res.json();
        dispatch({ type: "setWishlist", payload: wishlist });
      }
    } catch (error) {
      console.error("[Wishlist] Failed to fetch wishlist:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
    fetchWishlistData();
  }, [fetchCartData, fetchWishlistData]);

  const addToCartHandler = useCallback(async (product) => {
    try {
      const res = await fetch("/api/user/cart", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ product }),
      });
      if (res.status === 201) {
        const { cart } = await res.json();
        dispatch({ type: "setCart", payload: cart });
      }
    } catch (error) {
      console.error("[Cart] Failed to add item:", error.message);
      toast.error("Failed to add item to cart");
    }
  }, []);

  const isItemPresentInCartHandler = useCallback(
    (product) => state.cart.find(({ _id }) => product._id === _id),
    [state.cart]
  );

  const isItemPresentInWishlistHandler = useCallback(
    (product) => state.wishlist.find(({ _id }) => product._id === _id),
    [state.wishlist]
  );

  const incQtyHandler = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/user/cart/${id}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: { type: "increment" } }),
      });
      if (res.status === 200) {
        const { cart } = await res.json();
        dispatch({ type: "setCart", payload: cart });
      }
    } catch (error) {
      console.error("[Cart] Failed to increment:", error.message);
    }
  }, []);

  const decQtyHandler = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/user/cart/${id}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: { type: "decrement" } }),
      });
      if (res.status === 200) {
        const { cart } = await res.json();
        dispatch({ type: "setCart", payload: cart });
      }
    } catch (error) {
      console.error("[Cart] Failed to decrement:", error.message);
    }
  }, []);

  const removeFromCartHandler = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/user/cart/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.status === 200) {
        const { cart } = await res.json();
        dispatch({ type: "setCart", payload: cart });
      }
    } catch (error) {
      console.error("[Cart] Failed to remove item:", error.message);
      toast.error("Failed to remove item from cart");
    }
  }, []);

  const removeFromWishlistHandler = useCallback(async (id) => {
    try {
      const res = await fetch(`/api/user/wishlist/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.status === 200) {
        const { wishlist } = await res.json();
        dispatch({ type: "setWishlist", payload: wishlist });
      }
    } catch (error) {
      console.error("[Wishlist] Failed to remove item:", error.message);
      toast.error("Failed to remove item from wishlist");
    }
  }, []);

  const addToWishlistHandler = useCallback(async (product) => {
    try {
      const res = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ product }),
      });
      if (res.status === 201) {
        const { wishlist } = await res.json();
        dispatch({ type: "setWishlist", payload: wishlist });
      }
    } catch (error) {
      console.error("[Wishlist] Failed to add item:", error.message);
      toast.error("Failed to add item to wishlist");
    }
  }, []);

  const items = useMemo(
    () => state.cart.reduce((acc, { qty }) => acc + qty, 0),
    [state.cart]
  );

  const totalPrice = useMemo(
    () => state.cart.reduce((acc, { price, qty }) => acc + Number(price) * qty, 0),
    [state.cart]
  );

  const totalDiscount = useMemo(
    () =>
      state.cart.reduce(
        (acc, { price, discountedPrice, qty }) =>
          acc + (Number(price) - Number(discountedPrice)) * qty,
        0
      ),
    [state.cart]
  );

  const netPrice = useMemo(() => totalPrice - totalDiscount, [totalPrice, totalDiscount]);

  const value = useMemo(
    () => ({
      cart: state.cart,
      addToCartHandler,
      isItemPresentInCartHandler,
      isItemPresentInWishlistHandler,
      incQtyHandler,
      decQtyHandler,
      removeFromCartHandler,
      wishlist: state.wishlist,
      addToWishlistHandler,
      removeFromWishlistHandler,
      items,
      totalPrice,
      totalDiscount,
      netPrice,
    }),
    [
      state.cart,
      state.wishlist,
      addToCartHandler,
      isItemPresentInCartHandler,
      isItemPresentInWishlistHandler,
      incQtyHandler,
      decQtyHandler,
      removeFromCartHandler,
      addToWishlistHandler,
      removeFromWishlistHandler,
      items,
      totalPrice,
      totalDiscount,
      netPrice,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
