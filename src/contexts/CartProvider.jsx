import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";
import * as cartApi from "../lib/api/cart";

const CartContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setCart":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(reducerFunction, { cart: [] });

  const fetchCartData = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch({ type: "setCart", payload: [] });
      return;
    }
    try {
      const cart = await cartApi.getCart();
      dispatch({ type: "setCart", payload: cart });
    } catch (error) {
      console.error("[Cart] Failed to fetch cart:", error.message);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const addToCartHandler = useCallback(
    async (product) => {
      try {
        await cartApi.addToCart(product._id);
        await fetchCartData();
      } catch (error) {
        console.error("[Cart] Failed to add item:", error.message);
        toast.error("Failed to add item to cart");
      }
    },
    [fetchCartData]
  );

  const isItemPresentInCartHandler = useCallback(
    (product) => state.cart.find(({ _id }) => product._id === _id),
    [state.cart]
  );

  const incQtyHandler = useCallback(
    async (product) => {
      const item = state.cart.find(({ _id }) => _id === product._id);
      if (!item) return;
      try {
        await cartApi.updateCartItem(item.cartItemId, item.qty + 1);
        await fetchCartData();
      } catch (error) {
        console.error("[Cart] Failed to increment:", error.message);
      }
    },
    [state.cart, fetchCartData]
  );

  const decQtyHandler = useCallback(
    async (product) => {
      const item = state.cart.find(({ _id }) => _id === product._id);
      if (!item) return;
      try {
        if (item.qty <= 1) {
          await cartApi.removeFromCart(item.cartItemId);
        } else {
          await cartApi.updateCartItem(item.cartItemId, item.qty - 1);
        }
        await fetchCartData();
      } catch (error) {
        console.error("[Cart] Failed to decrement:", error.message);
      }
    },
    [state.cart, fetchCartData]
  );

  const removeFromCartHandler = useCallback(
    async (productId) => {
      const item = state.cart.find(({ _id }) => _id === productId);
      if (!item) return;
      try {
        await cartApi.removeFromCart(item.cartItemId);
        await fetchCartData();
      } catch (error) {
        console.error("[Cart] Failed to remove item:", error.message);
        toast.error("Failed to remove item from cart");
      }
    },
    [state.cart, fetchCartData]
  );

  const clearCartHandler = useCallback(async () => {
    try {
      await cartApi.clearCart();
      dispatch({ type: "setCart", payload: [] });
    } catch (error) {
      console.error("[Cart] Failed to clear cart:", error.message);
    }
  }, []);

  const items = useMemo(
    () => state.cart.reduce((acc, { qty }) => acc + qty, 0),
    [state.cart]
  );

  const totalPrice = useMemo(
    () =>
      state.cart.reduce((acc, { price, qty }) => acc + Number(price) * qty, 0),
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

  const netPrice = useMemo(
    () => totalPrice - totalDiscount,
    [totalPrice, totalDiscount]
  );

  const value = useMemo(
    () => ({
      cart: state.cart,
      addToCartHandler,
      isItemPresentInCartHandler,
      incQtyHandler,
      decQtyHandler,
      removeFromCartHandler,
      clearCartHandler,
      items,
      totalPrice,
      totalDiscount,
      netPrice,
    }),
    [
      state.cart,
      addToCartHandler,
      isItemPresentInCartHandler,
      incQtyHandler,
      decQtyHandler,
      removeFromCartHandler,
      clearCartHandler,
      items,
      totalPrice,
      totalDiscount,
      netPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
