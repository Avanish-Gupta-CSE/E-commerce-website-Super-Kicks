import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useCartContext } from "../../contexts/CartProvider";
import { useAddressContext } from "../../contexts/AddressProvider";
import { useOrderContext } from "../../contexts/OrderProvider";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const DELIVERY_CHARGE = 1;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, items, totalPrice, totalDiscount, netPrice, clearCartHandler } =
    useCartContext();
  const {
    addressData,
    setNameHandler,
    setAddressHandler,
    setCityHandler,
    setPinCodeHandler,
    setMobileNoHandler,
    addAddressHandler,
    name,
    address,
    mobileNo,
    pinCode,
    city,
    deleteHandler,
    showAddressBoxHandler,
    showAddress,
  } = useAddressContext();
  const { placeOrder } = useOrderContext();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (Object.keys(selectedAddress).length === 0) {
      toast.warn("Please select an address");
      return;
    }

    setPlacing(true);
    try {
      const order = await placeOrder({
        cartItems: cart,
        shippingAddress: selectedAddress,
        total: netPrice + DELIVERY_CHARGE,
      });
      await clearCartHandler();
      setPlacedOrder(order);
      setOrderPlaced(true);
    } catch {
      // toast handled in OrderProvider
    } finally {
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="summary-container">
        <h1>Order Placed Successfully</h1>
        <div className="summary">
          <h2>Summary</h2>
          <p className="flex-container">
            <strong className="small-heading">No of items</strong>
            {items}
          </p>
          <p className="flex-container">
            <strong className="small-heading">Total Price</strong> $
            {totalPrice}
          </p>
          <p className="flex-container">
            <strong className="small-heading">Discount</strong> $
            {totalDiscount}
          </p>
          <p className="flex-container">
            <strong className="small-heading">Delivery charges</strong> $
            {DELIVERY_CHARGE}
          </p>
          <p className="flex-container">
            <strong className="small-heading">Net Price</strong> $
            {netPrice + DELIVERY_CHARGE}
          </p>
          <h3>Address Details</h3>
          <h3>{selectedAddress.name}</h3>
          <p>{`${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.pinCode}`}</p>
          <p>
            <strong>Mobile no:</strong> {selectedAddress.mobileNo}
          </p>
        </div>
        <div className="summary-actions">
          <Link className="button" to="/">
            Back To Website
          </Link>
          <Link className="button" to="/orders">
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="address">
        <h1>Address Details</h1>
        <ul>
          {addressData.map((addr) => (
            <div className="address-container" key={addr.id}>
              <input
                name="address"
                type="radio"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAddress(addr);
                  }
                }}
              />
              <div className="address-card">
                <h2>{addr.name}</h2>
                <p>{`${addr.address}, ${addr.city}, ${addr.pinCode}`}</p>
                <p>
                  <strong>Mobile no:</strong> {addr.mobileNo}
                </p>
              </div>
              <button
                className="cross-button"
                onClick={() => deleteHandler(addr.id)}
              >
                <RxCross1 />
              </button>
            </div>
          ))}
        </ul>
        <button
          className="button"
          style={{
            backgroundColor: showAddress ? "rgb(171, 173, 175)" : "",
            cursor: showAddress ? "not-allowed" : "pointer",
          }}
          disabled={showAddress}
          onClick={() => showAddressBoxHandler(true)}
        >
          Add Address
        </button>
        {showAddress && (
          <div className="input-address-container">
            <h3>Add new Address</h3>
            <p>
              <input
                className="input-field"
                placeholder="Name"
                value={name}
                onChange={(e) => setNameHandler(e)}
                type="text"
              />
            </p>
            <p>
              <input
                className="input-field"
                placeholder="Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobileNoHandler(e)}
                type="tel"
              />
            </p>
            <p>
              <input
                className="input-field"
                placeholder="Pincode"
                value={pinCode}
                onChange={(e) => setPinCodeHandler(e)}
                type="text"
              />
            </p>
            <p>
              <input
                className="input-field"
                placeholder="City"
                value={city}
                onChange={(e) => setCityHandler(e)}
                type="text"
              />
            </p>
            <p>
              <input
                className="input-field"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddressHandler(e)}
                type="text"
              />
            </p>
            <button
              className="button"
              type="button"
              onClick={addAddressHandler}
            >
              Add
            </button>
            <button
              className="button"
              onClick={() => showAddressBoxHandler(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="bill">
        <h1>Price Details</h1>
        <p>
          <strong className="small-heading">No of items</strong>
          {items}
        </p>
        <p>
          <strong className="small-heading">Total Price</strong> ${totalPrice}
        </p>
        <p>
          <strong className="small-heading">Discount</strong> ${totalDiscount}
        </p>
        <p>
          <strong className="small-heading">Delivery charges</strong> $
          {DELIVERY_CHARGE}
        </p>
        <p>
          <strong className="small-heading">Net Price</strong> $
          {netPrice + DELIVERY_CHARGE}
        </p>
        <button
          className="button"
          onClick={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
