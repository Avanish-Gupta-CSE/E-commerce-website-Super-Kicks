import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import * as ordersApi from "../lib/api/orders";

const OrderContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "setOrders":
      return { ...state, orders: action.payload };
    case "setCurrentOrder":
      return { ...state, currentOrder: action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  orders: [],
  currentOrder: null,
  loading: false,
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  const fetchOrders = useCallback(async () => {
    dispatch({ type: "setLoading", payload: true });
    try {
      const orders = await ordersApi.getOrders();
      dispatch({ type: "setOrders", payload: orders });
    } catch (error) {
      console.error("[Orders] Failed to fetch:", error.message);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }, []);

  const fetchOrderById = useCallback(async (orderId) => {
    dispatch({ type: "setLoading", payload: true });
    try {
      const order = await ordersApi.getOrderById(orderId);
      dispatch({ type: "setCurrentOrder", payload: order });
      return order;
    } catch (error) {
      console.error("[Orders] Failed to fetch order:", error.message);
      toast.error("Failed to load order details");
      return null;
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }, []);

  const placeOrder = useCallback(
    async ({ cartItems, shippingAddress, total }) => {
      try {
        const order = await ordersApi.createOrder({
          cartItems,
          shippingAddress,
          total,
        });
        dispatch({
          type: "setOrders",
          payload: [order, ...state.orders],
        });
        toast.success("Order placed successfully!");
        return order;
      } catch (error) {
        console.error("[Orders] Failed to place order:", error.message);
        toast.error("Failed to place order");
        throw error;
      }
    },
    [state.orders]
  );

  const value = useMemo(
    () => ({
      orders: state.orders,
      currentOrder: state.currentOrder,
      ordersLoading: state.loading,
      fetchOrders,
      fetchOrderById,
      placeOrder,
    }),
    [
      state.orders,
      state.currentOrder,
      state.loading,
      fetchOrders,
      fetchOrderById,
      placeOrder,
    ]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
