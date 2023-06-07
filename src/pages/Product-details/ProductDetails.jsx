import { useParams } from "react-router";
import { useDataContext } from "../../contexts/DataProvider";
import "./ProductDetails.css";
import { AddToWishlistButton } from "../../components/AddtoWishlistButton";
import { AddToCartButton } from "../../components/AddToCartButton";

export const ProductDetails = () => {
    const { products } = useDataContext();
    const { productId } = useParams();
    let product = {};

    product = products.find(({ _id }) => {
        return _id === productId;
    });
    const {
        productImage,
        productName,
        productDescription,
        categoryName,
        color,
        discountPercent,
        discountedPrice,
        price,
        gender,
        size,
        onSale,
        outOfStock,
        trending,
    } = product;
    return (
        <div className="product-details">
            <img src={productImage} alt="productImage" />
            <div className="details">
                <h1>{productName}</h1>
                <p>
                    <strong>Description: </strong>
                    {productDescription}
                </p>
                <p>
                    <strong>Category: </strong>
                    {categoryName}
                </p>
                <p>
                    <strong>Gender: </strong>
                    {gender}
                </p>
                <p>
                    <strong>Size: </strong>
                    {size}
                </p>
                <p>
                    <strong>Color: </strong>
                    {color}
                </p>
                <p>
                    <strong>Discount: </strong>
                    {discountPercent}%
                </p>
                <p>
                    <strong>Price: </strong>${discountedPrice}{" "}
                    {discountedPrice !== price ? <span className="cut-price">${price}</span> : null}
                </p>
                <p>
                    {onSale ? <strong className="tags">On Sale</strong>:null}
                    {outOfStock ? <strong className="tags out-of-stock">Out Of Stock</strong>:null}
                    {trending ? <strong className="tags">Trending</strong>:null}
                </p>
                <AddToCartButton product={product} />
                &emsp;
                <AddToWishlistButton product={product} details />
            </div>
        </div>
    );
};
