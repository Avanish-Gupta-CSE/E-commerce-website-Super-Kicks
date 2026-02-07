import { toast } from "react-toastify";
import { useWishlistContext } from "../contexts/WishlistProvider";
import { useAuth } from "../contexts/AuthProvider";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const AddToWishlistButton = ({ product, details }) => {
  const {
    isItemPresentInWishlistHandler,
    addToWishlistHandler,
    removeFromWishlistHandler,
  } = useWishlistContext();
  const { isAuthenticated } = useAuth();

  const handleAdd = () => {
    if (isAuthenticated) {
      toast.success("Added to Wishlist");
      addToWishlistHandler(product);
    } else {
      toast.warn("Please login first");
    }
  };

  const handleRemove = () => {
    toast.info("Removed from Wishlist");
    removeFromWishlistHandler(product._id);
  };

  return !isItemPresentInWishlistHandler(product) ? (
    <button
      className={details ? "button" : "heart-icon"}
      onClick={handleAdd}
      aria-label={`Add ${product.productName} to wishlist`}
    >
      {details ? "Add to Wishlist" : <AiOutlineHeart />}
    </button>
  ) : (
    <button
      className={details ? "button" : "heart-icon"}
      onClick={handleRemove}
      aria-label={`Remove ${product.productName} from wishlist`}
    >
      {details ? "Remove from Wishlist" : <AiFillHeart />}
    </button>
  );
};
