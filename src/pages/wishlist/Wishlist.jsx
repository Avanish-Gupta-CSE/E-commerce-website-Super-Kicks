import { Link } from "react-router-dom";
import { ProductCard } from "../../components/product-card/ProductCard";
import { useWishlistContext } from "../../contexts/WishlistProvider";
import "./Wishlist.css";

export const Wishlist = () => {
  const { wishlist } = useWishlistContext();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="wishlist-empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
        <p className="wishlist-empty-text">Save items you love to buy them later.</p>
        <Link to="/products" className="button">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">
        My Wishlist ({wishlist.length} item{wishlist.length !== 1 ? "s" : ""})
      </h1>
      <ul className="wishlist-grid">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
};
