import { supabase } from "../supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(normalizeProduct);
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("id", id)
    .single();

  if (error) throw error;

  return normalizeProduct(data);
}

export async function getProductsByCategory(categorySlug) {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories!inner(name, slug)")
    .eq("categories.slug", categorySlug)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(normalizeProduct);
}

/**
 * Maps Supabase column names to the shape the existing UI components expect.
 * Keeps backward compatibility with the old MirageJS data format.
 */
function normalizeProduct(row) {
  return {
    _id: row.id,
    productName: row.name,
    productDescription: row.description,
    productImage: row.image_url,
    gender: row.gender,
    color: row.color,
    size: row.size,
    categoryName: row.categories?.name ?? "",
    categorySlug: row.categories?.slug ?? "",
    price: Number(row.price),
    discountPercent: row.discount_percent,
    discountedPrice: Number(row.discounted_price),
    onSale: row.on_sale,
    outOfStock: row.out_of_stock,
    rating: Number(row.rating_avg),
    ratingCount: row.rating_count,
    trending: row.trending,
    createdAt: row.created_at,
  };
}
