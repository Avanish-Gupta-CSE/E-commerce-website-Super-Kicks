import { supabase } from "../supabase";

export async function getCart() {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, products(*, categories(name, slug))")
    .order("id");

  if (error) throw error;

  return data.map(normalizeCartItem);
}

export async function addToCart(productId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("cart_items")
    .upsert(
      { user_id: user.id, product_id: productId, quantity: 1 },
      { onConflict: "user_id,product_id" }
    )
    .select("*, products(*, categories(name, slug))")
    .single();

  if (error) throw error;

  return normalizeCartItem(data);
}

export async function updateCartItem(cartItemId, quantity) {
  if (quantity < 1) {
    return removeFromCart(cartItemId);
  }

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId)
    .select("*, products(*, categories(name, slug))")
    .single();

  if (error) throw error;

  return normalizeCartItem(data);
}

export async function removeFromCart(cartItemId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) throw error;
}

export async function clearCart() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

  if (error) throw error;
}

function normalizeCartItem(row) {
  const p = row.products;
  return {
    cartItemId: row.id,
    _id: p.id,
    productName: p.name,
    productDescription: p.description,
    productImage: p.image_url,
    gender: p.gender,
    color: p.color,
    size: p.size,
    categoryName: p.categories?.name ?? "",
    price: Number(p.price),
    discountPercent: p.discount_percent,
    discountedPrice: Number(p.discounted_price),
    onSale: p.on_sale,
    outOfStock: p.out_of_stock,
    rating: Number(p.rating_avg),
    trending: p.trending,
    qty: row.quantity,
  };
}
