import { supabase } from "../supabase";

export async function getWishlist() {
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("*, products(*, categories(name, slug))")
    .order("id");

  if (error) throw error;

  return data.map(normalizeWishlistItem);
}

export async function addToWishlist(productId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("wishlist_items")
    .upsert(
      { user_id: user.id, product_id: productId },
      { onConflict: "user_id,product_id" }
    )
    .select("*, products(*, categories(name, slug))")
    .single();

  if (error) throw error;

  return normalizeWishlistItem(data);
}

export async function removeFromWishlist(productId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) throw error;
}

function normalizeWishlistItem(row) {
  const p = row.products;
  return {
    wishlistItemId: row.id,
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
  };
}
