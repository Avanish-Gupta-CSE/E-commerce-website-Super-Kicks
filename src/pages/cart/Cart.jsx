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

    return cart.length === 0 ? (
        <h1 className="div-margin">Your Cart is Empty</h1>
    ) : (
        <div className="cart-container">
            <h1>My Cart</h1>
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
                            <div key={_id} className="cart-item">
                                <div className="flex-container-2">
                                    <img src={productImage} alt={productName} />
                                    <AddToWishlistButton product={product} />
                                    <button
                                            className="cross-button mobile"
                                            onClick={() => {
                                                removedNotify();
                                                removeFromCartHandler(_id);
                                            }}
                                        >
                                            <RxCross1 />
                                        </button>
                                </div>

                                <div>
                                    <div className="flex-container">
                                        <h3 className="heading">
                                            {productName}
                                        </h3>{" "}
                                        <button
                                            className="cross-button desktop"
                                            onClick={() => {
                                                removedNotify();
                                                removeFromCartHandler(_id);
                                            }}
                                        >
                                            <RxCross1 />
                                        </button>
                                    </div>

                                    <p>
                                        <strong>Price:</strong> ${discountedPrice}{" "}
                                        <span className="price">${price}</span>
                                    </p>
                                    <p>
                                        <strong>Quantity:</strong>
                                        <button
                                            style={{
                                                backgroundColor: qty <= 1 ? "rgb(171, 173, 175)" : "",
                                                cursor: qty <= 1 ? "not-allowed" : "pointer"
                                                }}
                                            className="decrease-button"
                                            disabled={qty <= 1}
                                            onClick={() => decQtyHandler(_id)}
                                        >
                                            <strong>-</strong>
                                        </button>
                                        {qty}
                                        <button
                                            className="decrease-button"
                                            onClick={() => incQtyHandler(_id)}
                                        >
                                            <strong>+</strong>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </ul>
                <div className="bill">
                    <p>
                        <h2>Price Details</h2>
                    </p>
                    <p><strong>No of items:</strong> {items}</p>
                    <p><strong>Total Price:</strong> ${totalPrice}</p>
                    <p><strong>Discount:</strong> ${totalDiscount}</p>
                    <p><strong>Net Price:</strong> ${netPrice}</p>
                    <Link className="button" to={"/checkout"}>Place Order</Link>
                </div>
            </div>
        </div>
    );
};
