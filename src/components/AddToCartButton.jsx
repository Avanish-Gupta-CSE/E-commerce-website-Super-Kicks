import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartProvider";
import { useLoginContext } from "../contexts/LoginProvider";
import { toast } from "react-toastify";

export const AddToCartButton = ({ product }) => {
    const loginNotify = () => toast("Please Login First");

    const { login } = useLoginContext();
    const { isItemPresentInCartHandler, addToCartHandler } = useCartContext();
    let counter = 0;
    const notify = () => toast("Added to Cart");
    return !isItemPresentInCartHandler(product) ? (
        <button
            disabled={product.outOfStock}
            style={{
                backgroundColor: product.outOfStock ? "#abadaf" : "",
                cursor: product.outOfStock ? "no-drop" : "pointer",
                }}
            className="button"
            onClick={() => {
                if (login) {
                    counter++;
                    if (counter === 1) {
                        notify();
                        return addToCartHandler(product);
                    }
                } else {
                    loginNotify();
                }
            }}
        >
            Add to cart
        </button>
    ) : (
        <>
            <Link className="button" to={"/cart"}>Go to Cart</Link>
        </>
    );
};
