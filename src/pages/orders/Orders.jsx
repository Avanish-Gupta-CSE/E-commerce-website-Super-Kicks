import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../contexts/OrderProvider";
import "./Orders.css";

const STATUS_COLORS = {
  confirmed: "#2563eb",
  processing: "#d97706",
  shipped: "#7c3aed",
  delivered: "#16a34a",
  cancelled: "#dc2626",
};

export const Orders = () => {
  const { orders, ordersLoading, fetchOrders } = useOrderContext();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (ordersLoading) {
    return <p className="div-margin">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="div-margin">
        <h1>My Orders</h1>
        <p>You haven&apos;t placed any orders yet.</p>
        <Link className="button" to="/products">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <span className="order-id">Order #{order.id.slice(0, 8)}</span>
                <span
                  className="order-status"
                  style={{ color: STATUS_COLORS[order.status] || "#666" }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <span className="order-date">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="order-summary">
              <span className="order-total">${order.total.toFixed(2)}</span>
              <span className="order-items-count">
                {order.items?.length || 0} item
                {(order.items?.length || 0) !== 1 ? "s" : ""}
              </span>
            </div>
            <Link className="button order-detail-link" to={`/orders/${order.id}`}>
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
