import React, { useState } from "react";
import "./Checkout.css";
import { useCartContext } from "../../contexts/CartProvider";
import { useAddressContext } from "../../contexts/AddressProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const Checkout = () => {
    const { items, totalPrice, totalDiscount, netPrice } = useCartContext();
    const deliveryCharge = 1;
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
    const [orderPlaced, setOrderPlaced] = useState(false);

    const notify = () => toast("Order Placed Successfully");
    const fillAddressNotify = () => toast("Please select an Address");

    const [selectedAddress, setSelectedAddress] = useState({});
    return orderPlaced ? (
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
                    <strong className="small-heading">Delivery charges</strong>
                    ${deliveryCharge}
                </p>
                <p className="flex-container">
                    <strong className="small-heading">Net Price</strong> $
                    {netPrice + deliveryCharge}
                </p>
                <h3>Address Details</h3>
                <h3>{selectedAddress.name}</h3>
                <p>{`${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.pinCode}`}</p>
                <p>
                    <strong>Mobile no:</strong> {selectedAddress.mobileNo}
                </p>
            </div>
            <Link className="button" to="/">
                Back To Website
            </Link>
        </div>
    ) : (
        <div className="checkout">
            <div className="address">
                <h1>Address Details</h1>
                <ul>
                    {addressData.map((address, i) => (
                        <div className="address-container" key={i}>
                            <input
                                name="address"
                                type="radio"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedAddress(address);
                                    }
                                }}
                            />

                            <div className="address-card">
                                <h1>{address.name}</h1>
                                <p>{`${address.address}, ${address.city}, ${address.pinCode}`}</p>
                                <p>
                                    <strong>Mobile no:</strong>
                                    {address.mobileNo}
                                </p>
                            </div>
                            <button
                                className="cross-button"
                                onClick={() => deleteHandler(i)}
                            >
                                <RxCross1 />
                            </button>
                        </div>
                    ))}
                </ul>
                <button
                    className="button"
                    style={{
                        backgroundColor: showAddress
                            ? "rgb(171, 173, 175)"
                            : "",
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
                                type="number"
                            />
                        </p>
                        <p>
                            <input
                                className="input-field"
                                placeholder="Pincode"
                                value={pinCode}
                                onChange={(e) => setPinCodeHandler(e)}
                                type="number"
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
                            type="submit"
                            onClick={(e) => {
                                addAddressHandler();
                            }}
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
                    <strong className="small-heading">Total Price</strong> $
                    {totalPrice}
                </p>
                <p>
                    <strong className="small-heading">Discount</strong> $
                    {totalDiscount}
                </p>
                <p>
                    <strong className="small-heading">Delivery charges</strong>{" "}
                    ${deliveryCharge}
                </p>
                <p>
                    <strong className="small-heading">Net Price</strong> $
                    {netPrice + deliveryCharge}
                </p>
                <button
                    className="button"
                    onClick={() => {
                        if (Object.keys(selectedAddress).length === 0) {
                            fillAddressNotify();
                        } else {
                            notify();
                            setOrderPlaced(true);
                        }
                    }}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
