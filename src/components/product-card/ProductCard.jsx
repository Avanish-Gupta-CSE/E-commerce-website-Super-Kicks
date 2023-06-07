import { AddToWishlistButton } from "../AddtoWishlistButton";
import { AddToCartButton } from "../AddToCartButton";
import "./productCard.css";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

export const ProductCard = ({ product }) => {
    const {
        productImage,
        productName,
        discountedPrice,
        price,
        _id,
        outOfStock,
        rating,
    } = product;
    return (
        <div className="product-card">
            <div className="flex-container">
                <strong>
                    {rating}
                    <AiFillStar className="star" />
                </strong>
                <AddToWishlistButton
                    className="wishlist-button"
                    product={product}
                />
            </div>

            <Link className="link" to={`/products/${_id}`}>
                <img src={productImage} alt={productName} />
                <h3>{productName}</h3>
                <p className="price">
                    <strong>Price:</strong> ${discountedPrice}{" "}
                    {discountedPrice !== price ? (
                        <span className="cut-price">${price}</span>
                    ) : null}
                </p>
                {outOfStock ? <h3 className="out-of-stock">Out of Stock</h3> : <h3>In Stock</h3>}
            </Link>
            <AddToCartButton product={product} />
        </div>
    );
};
