import { Link, useParams } from "react-router-dom";
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
    return (
      <div className="pdp-loading">
        <p className="text-muted">Loading product...</p>
      </div>
    );
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
    <div className="pdp">
      {/* Breadcrumb */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/products">All Products</Link>
        <span className="pdp-breadcrumb-sep">/</span>
        <span>{categoryName}</span>
        <span className="pdp-breadcrumb-sep">/</span>
        <span className="pdp-breadcrumb-current">{productName}</span>
      </nav>

      <div className="pdp-layout">
        {/* Image */}
        <div className="pdp-image-container">
          <img
            src={productImage}
            alt={`${productName} - ${color} ${categoryName}`}
            loading="lazy"
          />
          {onSale && <span className="pdp-sale-badge">Sale</span>}
        </div>

        {/* Info */}
        <div className="pdp-info">
          <div className="pdp-tags">
            {categoryName && <span className="pdp-tag">{categoryName}</span>}
            {gender && <span className="pdp-tag">{gender}</span>}
            {trending && <span className="pdp-tag pdp-tag-accent">Trending</span>}
            {outOfStock && <span className="pdp-tag pdp-tag-muted">Out Of Stock</span>}
          </div>

          <h1 className="pdp-name">{productName}</h1>

          {rating > 0 && (
            <div className="pdp-rating">
              <span className="pdp-stars">
                {"★".repeat(Math.round(rating))}
                {"☆".repeat(5 - Math.round(rating))}
              </span>
              <span className="pdp-rating-num">{rating.toFixed(1)}</span>
              {ratingCount > 0 && (
                <span className="pdp-review-count">({ratingCount} reviews)</span>
              )}
            </div>
          )}

          <div className="pdp-price">
            <span className="pdp-price-current">${discountedPrice}</span>
            {discountedPrice !== price && (
              <>
                <span className="pdp-price-original">${price}</span>
                <span className="pdp-discount">-{discountPercent}%</span>
              </>
            )}
          </div>

          <p className="pdp-description">{productDescription}</p>

          <div className="pdp-specs">
            <div className="pdp-spec">
              <span className="pdp-spec-label">Color</span>
              <span className="pdp-spec-value">{color}</span>
            </div>
            <div className="pdp-spec">
              <span className="pdp-spec-label">Size</span>
              <span className="pdp-spec-value">{size}</span>
            </div>
            <div className="pdp-spec">
              <span className="pdp-spec-label">Brand</span>
              <span className="pdp-spec-value">{categoryName}</span>
            </div>
          </div>

          <div className="pdp-actions">
            <AddToCartButton product={product} />
            <AddToWishlistButton product={product} details />
          </div>
        </div>
      </div>

      <ReviewSection productId={_id} />
    </div>
  );
};
