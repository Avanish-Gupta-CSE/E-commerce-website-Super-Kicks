import { toast } from "react-toastify";
import { useCartContext } from "../contexts/CartProvider";
import { useLoginContext } from "../contexts/LoginProvider";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const AddToWishlistButton = ({ product, details }) => {
  const {
    isItemPresentInWishlistHandler,
    addToWishlistHandler,
    removeFromWishlistHandler,
  } = useCartContext();
  const { login } = useLoginContext();

  const handleAdd = () => {
    if (login) {
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
