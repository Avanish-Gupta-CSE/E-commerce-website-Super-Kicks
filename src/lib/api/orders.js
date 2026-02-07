import { supabase } from "../supabase";

export async function createOrder({ cartItems, shippingAddress, total }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total,
      shipping_address: shippingAddress,
      status: "confirmed",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item._id,
    quantity: item.qty,
    price_at_purchase: item.discountedPrice,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return normalizeOrder(order);
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image_url))")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(normalizeOrder);
}

export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image_url, price, discounted_price))")
    .eq("id", orderId)
    .single();

  if (error) throw error;

  return normalizeOrder(data);
}

function normalizeOrder(row) {
  return {
    id: row.id,
    status: row.status,
    total: Number(row.total),
    shippingAddress: row.shipping_address,
    createdAt: row.created_at,
    items: (row.order_items || []).map((item) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.products?.name ?? "Unknown",
      productImage: item.products?.image_url ?? "",
      quantity: item.quantity,
      priceAtPurchase: Number(item.price_at_purchase),
    })),
  };
}
