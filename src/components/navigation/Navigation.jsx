import { NavLink } from "react-router-dom";
import "./navigation.css";
import { useDataContext } from "../../contexts/DataProvider";
import { useLoginContext } from "../../contexts/LoginProvider";
import { FaShoePrints } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useCartContext } from "../../contexts/CartProvider";

export const Navigation = () => {
    const { login, userName } = useLoginContext();
    const { searchHandler } = useDataContext();
    const { cart, wishlist } = useCartContext();

    return (
        <>
            <div className="nav-bar desktop">
                <NavLink className={"heading-link"} to={"/"}>
                    <strong>
                        <FaShoePrints /> Super-Kicks
                    </strong>
                </NavLink>
                <input
                    className="search-bar"
                    onChange={(e) => searchHandler(e)}
                    placeholder="Search"
                    type="text"
                />
                <div className="links">
                    <NavLink
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : "",
                        })}
                        className={"text-link"}
                        to={"/products"}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : "",
                        })}
                        className={"text-link icon"}
                        to={"/cart"}
                    >
                        <AiOutlineShoppingCart />
                        <span className="item-no">{cart.length}</span>
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : "",
                        })}
                        className={"text-link icon"}
                        to={"/wishlist"}
                    >
                        <AiOutlineHeart />
                        <span className="item-no">{wishlist.length}</span>
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => ({
                            fontWeight: isActive ? "bold" : "",
                        })}
                        className={"text-link"}
                        to={"/login"}
                    >
                        {login ? "Logout" : "Login"}
                    </NavLink>
                </div>
                {login && <strong>Hello {userName}</strong>}
            </div>

            <div className="nav-bar mobile">
                <>
                    <div className="links">
                        <NavLink className={"heading-link"} to={"/"}>
                            <strong>
                                <FaShoePrints />
                            </strong>
                        </NavLink>
                        <NavLink
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "bold" : "",
                            })}
                            className={"text-link"}
                            to={"/products"}
                        >
                            Products
                        </NavLink>
                        <NavLink
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "bold" : "",
                            })}
                            className={"text-link icon"}
                            to={"/cart"}
                        >
                            <AiOutlineShoppingCart />
                            <span className="item-no">{cart.length}</span>
                        </NavLink>
                        <NavLink
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "bold" : "",
                            })}
                            className={"text-link icon"}
                            to={"/wishlist"}
                        >
                            <AiOutlineHeart />
                            <span className="item-no">{wishlist.length}</span>
                        </NavLink>
                        <NavLink
                            style={({ isActive }) => ({
                                fontWeight: isActive ? "bold" : "",
                            })}
                            className={"text-link"}
                            to={"/login"}
                        >
                            {login ? "Logout" : "Login"}
                        </NavLink>
                    </div>
                    <input
                        className="search-bar"
                        onChange={(e) => searchHandler(e)}
                        placeholder="Search"
                        type="text"
                    />
                </>
            </div>
        </>
    );
};
