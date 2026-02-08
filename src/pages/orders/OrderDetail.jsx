import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrderContext } from "../../contexts/OrderProvider";
import "./Orders.css";

export const OrderDetail = () => {
  const { orderId } = useParams();
  const { currentOrder, ordersLoading, fetchOrderById } = useOrderContext();

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);

  if (ordersLoading || !currentOrder) {
    return <p className="div-margin">Loading order details...</p>;
  }

  const { id, status, total, shippingAddress, createdAt, items } = currentOrder;

  return (
    <div className="order-detail-container">
      <Link className="back-link" to="/orders">
        &larr; Back to Orders
      </Link>
      <h1>Order #{id.slice(0, 8)}</h1>

      <div className="order-meta">
        <p>
          <strong>Status:</strong>{" "}
          <span className="status-badge">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </p>
        <p>
          <strong>Placed:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>
      </div>

      {shippingAddress && (
        <div className="shipping-info">
          <h2>Shipping Address</h2>
          <p>{shippingAddress.name}</p>
          <p>
            {shippingAddress.address}, {shippingAddress.city},{" "}
            {shippingAddress.pinCode}
          </p>
          <p>Mobile: {shippingAddress.mobileNo}</p>
        </div>
      )}

      <div className="order-items-section">
        <h2>Items</h2>
        <ul className="order-items-list">
          {items.map((item) => (
            <li key={item.id} className="order-item">
              <img
                src={item.productImage}
                alt={item.productName}
                className="order-item-image"
                loading="lazy"
              />
              <div className="order-item-details">
                <h3>{item.productName}</h3>
                <p>Qty: {item.quantity}</p>
                <p>${item.priceAtPurchase.toFixed(2)} each</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
