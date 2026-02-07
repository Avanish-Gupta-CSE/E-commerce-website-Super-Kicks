import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartProvider";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

export const AddToCartButton = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { isItemPresentInCartHandler, addToCartHandler } = useCartContext();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      toast.success("Added to Cart");
      addToCartHandler(product);
    } else {
      toast.warn("Please login first");
    }
  };

  return !isItemPresentInCartHandler(product) ? (
    <button
      disabled={product.outOfStock}
      className={`button ${product.outOfStock ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={handleAddToCart}
      aria-label={`Add ${product.productName} to cart`}
    >
      Add to Cart
    </button>
  ) : (
    <Link className="button" to="/cart" aria-label="Go to cart">
      Go to Cart
    </Link>
  );
};
