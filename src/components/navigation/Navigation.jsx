import { NavLink } from "react-router-dom";
import "./navigation.css";
import { useDataContext } from "../../contexts/DataProvider";
import { useLoginContext } from "../../contexts/LoginProvider";
import { FaShoePrints } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useCartContext } from "../../contexts/CartProvider";

export const Navigation = () => {
  const { login, userName } = useLoginContext();
  const { searchHandler } = useDataContext();
  const { cart, wishlist } = useCartContext();

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
          <NavLink
            className={({ isActive }) =>
              `text-link ${isActive ? "font-bold" : ""}`
            }
            to="/login"
          >
            {login ? "Logout" : "Login"}
          </NavLink>
        </div>
        {login && <strong className="text-sm">Hello, {userName}</strong>}
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
          <NavLink
            className={({ isActive }) =>
              `text-link ${isActive ? "font-bold" : ""}`
            }
            to="/login"
          >
            {login ? "Logout" : "Login"}
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
