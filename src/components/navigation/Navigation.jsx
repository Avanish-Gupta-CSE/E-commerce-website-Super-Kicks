import { NavLink, useNavigate } from "react-router-dom";
import "./navigation.css";
import { useDataContext } from "../../contexts/DataProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { useCartContext } from "../../contexts/CartProvider";
import { useWishlistContext } from "../../contexts/WishlistProvider";
import { FaShoePrints } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

export const Navigation = () => {
  const { isAuthenticated, userName, signOut } = useAuth();
  const { searchHandler } = useDataContext();
  const { cart } = useCartContext();
  const { wishlist } = useWishlistContext();
  const navigate = useNavigate();

  const handleAuthClick = (e) => {
    if (isAuthenticated) {
      e.preventDefault();
      signOut();
    }
  };

  return (
    <>
      <nav className="nav-bar desktop" aria-label="Main navigation">
        <NavLink className="heading-link" to="/">
          <strong>
            <FaShoePrints aria-hidden="true" /> Super Kicks
          </strong>
        </NavLink>
        <input
          className="search-bar"
          onChange={(e) => searchHandler(e)}
          placeholder="Search sneakers..."
          type="search"
          aria-label="Search products"
        />
        <div className="links">
          <NavLink
            className={({ isActive }) =>
              `text-link ${isActive ? "font-bold" : ""}`
            }
            to="/products"
          >
            Products
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-link icon ${isActive ? "font-bold" : ""}`
            }
            to="/cart"
            aria-label={`Cart with ${cart.length} items`}
          >
            <AiOutlineShoppingCart aria-hidden="true" />
            <span className="item-no">{cart.length}</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-link icon ${isActive ? "font-bold" : ""}`
            }
            to="/wishlist"
            aria-label={`Wishlist with ${wishlist.length} items`}
          >
            <AiOutlineHeart aria-hidden="true" />
            <span className="item-no">{wishlist.length}</span>
          </NavLink>
          {isAuthenticated && (
            <NavLink
              className={({ isActive }) =>
                `text-link icon ${isActive ? "font-bold" : ""}`
              }
              to="/profile"
              aria-label="User profile"
            >
              <AiOutlineUser aria-hidden="true" />
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) =>
              `text-link ${isActive ? "font-bold" : ""}`
            }
            to="/login"
            onClick={handleAuthClick}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
        </div>
        {isAuthenticated && (
          <strong className="text-sm">Hello, {userName}</strong>
        )}
      </nav>

      <nav className="nav-bar mobile" aria-label="Mobile navigation">
        <div className="links">
          <NavLink className="heading-link" to="/">
            <strong>
              <FaShoePrints aria-hidden="true" />
            </strong>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-link ${isActive ? "font-bold" : ""}`
            }
            to="/products"
          >
            Products
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-link icon ${isActive ? "font-bold" : ""}`
            }
            to="/cart"
            aria-label={`Cart with ${cart.length} items`}
          >
            <AiOutlineShoppingCart aria-hidden="true" />
            <span className="item-no">{cart.length}</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-link icon ${isActive ? "font-bold" : ""}`
            }
            to="/wishlist"
            aria-label={`Wishlist with ${wishlist.length} items`}
          >
            <AiOutlineHeart aria-hidden="true" />
            <span className="item-no">{wishlist.length}</span>
          </NavLink>
          {isAuthenticated && (
            <NavLink
              className={({ isActive }) =>
                `text-link icon ${isActive ? "font-bold" : ""}`
              }
              to="/profile"
              aria-label="User profile"
            >
              <AiOutlineUser aria-hidden="true" />
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) =>
              `text-link ${isActive ? "font-bold" : ""}`
            }
            to="/login"
            onClick={handleAuthClick}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
        </div>
        <input
          className="search-bar"
          onChange={(e) => searchHandler(e)}
          placeholder="Search sneakers..."
          type="search"
          aria-label="Search products"
        />
      </nav>
    </>
  );
};
