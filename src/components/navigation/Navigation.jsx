import { NavLink, useNavigate } from "react-router-dom";
import "./navigation.css";
import { useDataContext } from "../../contexts/DataProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { useCartContext } from "../../contexts/CartProvider";
import { useWishlistContext } from "../../contexts/WishlistProvider";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

const SneakerLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="logo-icon"
  >
    <path d="M21.5 13.5c-.3-.8-1-1.3-1.8-1.5l-2.2-.5c-.5-.1-1-.4-1.3-.8l-1.7-2.3c-.6-.8-1.5-1.2-2.5-1.2H9.5c-1.2 0-2.3.6-3 1.5L4.8 11c-.3.4-.7.7-1.2.8l-1 .3c-.9.3-1.6 1.1-1.6 2.1v1.3c0 1 .7 1.9 1.7 2.1l.8.2c.3.5.9.9 1.5.9s1.2-.4 1.5-.9h9.8c.3.5.9.9 1.5.9s1.2-.4 1.5-.9l1.2-.3c1-.3 1.7-1.1 1.7-2.1v-1c0-.4-.1-.7-.2-1ZM5 17.3c-.5 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8Zm12.8 0c-.5 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8ZM20 15c0 .4-.3.7-.6.8l-.9.2h-.1c-.2-.7-.8-1.2-1.6-1.2s-1.4.5-1.6 1.2H6.8c-.2-.7-.8-1.2-1.6-1.2s-1.4.5-1.6 1.2l-.5-.1c-.4-.1-.6-.4-.6-.8v-1.3c0-.4.3-.7.6-.8l1-.3c.7-.2 1.4-.6 1.8-1.2l1.7-2.3c.4-.6 1.1-.9 1.8-.9H12c.6 0 1.2.3 1.6.8l1.7 2.3c.5.6 1.2 1 2 1.2l2.2.5c.3.1.5.3.6.6v1.2Z" />
  </svg>
);

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
        <NavLink className="heading-link logo-link" to="/">
          <SneakerLogo />
          <strong>Super Kicks</strong>
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
          <NavLink className="heading-link logo-link" to="/">
            <SneakerLogo />
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
