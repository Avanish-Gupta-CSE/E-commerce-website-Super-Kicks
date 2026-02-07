import { useParams } from "react-router-dom";
import { useDataContext } from "../../contexts/DataProvider";
import "./ProductDetails.css";
import { AddToWishlistButton } from "../../components/AddtoWishlistButton";
import { AddToCartButton } from "../../components/AddToCartButton";
import { ReviewSection } from "../../components/reviews/ReviewSection";

export const ProductDetails = () => {
  const { products } = useDataContext();
  const { productId } = useParams();

  const product = products.find(({ _id }) => _id === productId);

  if (!product) {
    return <p className="div-margin">Loading product...</p>;
  }

  const {
    _id,
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
    rating,
    ratingCount,
  } = product;

  return (
    <div className="product-details-page">
      <div className="product-details">
        <img
          src={productImage}
          alt={`${productName} - ${color} ${categoryName}`}
          loading="lazy"
        />
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
            {discountedPrice !== price ? (
              <span className="cut-price">${price}</span>
            ) : null}
          </p>
          {rating > 0 && (
            <p>
              <strong>Rating: </strong>
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))} {rating.toFixed(1)}
              {ratingCount > 0 && (
                <span className="rating-count"> ({ratingCount} reviews)</span>
              )}
            </p>
          )}
          <p>
            {onSale ? <strong className="tags">On Sale</strong> : null}
            {outOfStock ? (
              <strong className="tags out-of-stock">Out Of Stock</strong>
            ) : null}
            {trending ? <strong className="tags">Trending</strong> : null}
          </p>
          <AddToCartButton product={product} />
          &emsp;
          <AddToWishlistButton product={product} details />
        </div>
      </div>
      <ReviewSection productId={_id} />
    </div>
  );
};
