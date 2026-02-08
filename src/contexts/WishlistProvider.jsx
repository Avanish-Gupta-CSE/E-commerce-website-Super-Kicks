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
import * as wishlistApi from "../lib/api/wishlist";

const WishlistContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setWishlist":
      return { ...state, wishlist: action.payload };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(reducerFunction, { wishlist: [] });

  const fetchWishlistData = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch({ type: "setWishlist", payload: [] });
      return;
    }
    try {
      const wishlist = await wishlistApi.getWishlist();
      dispatch({ type: "setWishlist", payload: wishlist });
    } catch (error) {
      console.error("[Wishlist] Failed to fetch:", error.message);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlistData();
  }, [fetchWishlistData]);

  const addToWishlistHandler = useCallback(
    async (product) => {
      try {
        await wishlistApi.addToWishlist(product._id);
        await fetchWishlistData();
      } catch (error) {
        console.error("[Wishlist] Failed to add item:", error.message);
        toast.error("Failed to add item to wishlist");
      }
    },
    [fetchWishlistData]
  );

  const removeFromWishlistHandler = useCallback(
    async (productId) => {
      try {
        await wishlistApi.removeFromWishlist(productId);
        await fetchWishlistData();
      } catch (error) {
        console.error("[Wishlist] Failed to remove item:", error.message);
        toast.error("Failed to remove item from wishlist");
      }
    },
    [fetchWishlistData]
  );

  const isItemPresentInWishlistHandler = useCallback(
    (product) => state.wishlist.find(({ _id }) => product._id === _id),
    [state.wishlist]
  );

  const value = useMemo(
    () => ({
      wishlist: state.wishlist,
      addToWishlistHandler,
      removeFromWishlistHandler,
      isItemPresentInWishlistHandler,
    }),
    [
      state.wishlist,
      addToWishlistHandler,
      removeFromWishlistHandler,
      isItemPresentInWishlistHandler,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
