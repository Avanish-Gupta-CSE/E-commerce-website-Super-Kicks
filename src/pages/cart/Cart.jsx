import { Link } from "react-router-dom";
import { AddToWishlistButton } from "../../components/AddtoWishlistButton";
import { useCartContext } from "../../contexts/CartProvider";
import "./cart.css";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

export const Cart = () => {
  const {
    cart,
    incQtyHandler,
    decQtyHandler,
    removeFromCartHandler,
    items,
    totalPrice,
    totalDiscount,
    netPrice,
  } = useCartContext();
  const removedNotify = () => toast("Removed from Cart");

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h2 className="cart-empty-title">Your cart is empty</h2>
        <p className="cart-empty-text">Looks like you haven&apos;t added anything yet.</p>
        <Link to="/products" className="button">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-page-title">Shopping Cart ({items} items)</h1>
      <div className="cart">
        <ul className="cart-list">
          {cart.map((product) => {
            const {
              productImage,
              productName,
              discountedPrice,
              price,
              _id,
              qty,
            } = product;
            return (
              <li key={_id} className="cart-item">
                <div className="cart-item-image-wrap">
                  <img src={productImage} alt={productName} />
                </div>

                <div className="cart-item-body">
                  <div className="cart-item-top">
                    <h3 className="cart-item-name">{productName}</h3>
                    <button
                      className="cart-item-remove"
                      onClick={() => {
                        removedNotify();
                        removeFromCartHandler(_id);
                      }}
                      aria-label={`Remove ${productName} from cart`}
                    >
                      <RxCross1 />
                    </button>
                  </div>

                  <div className="cart-item-price">
                    <span className="cart-item-current">${discountedPrice}</span>
                    {discountedPrice !== price && (
                      <span className="cart-item-original">${price}</span>
                    )}
                  </div>

                  <div className="cart-item-bottom">
                    <div className="cart-item-qty">
                      <button
                        className="qty-button"
                        disabled={qty <= 1}
                        onClick={() => decQtyHandler(product)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        className="qty-button"
                        onClick={() => incQtyHandler(product)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <AddToWishlistButton product={product} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal ({items} items)</span>
            <span>${totalPrice}</span>
          </div>
          <div className="cart-summary-row">
            <span>Discount</span>
            <span className="text-green-600">-${totalDiscount}</span>
          </div>
          <div className="cart-summary-divider" />
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>${netPrice}</span>
          </div>
          <Link className="button cart-summary-cta" to="/checkout">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
