import { supabase } from "../supabase";

export async function getReviews(productId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, profiles(first_name, last_name, avatar_url)")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(normalizeReview);
}

export async function addReview({ productId, rating, comment }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("reviews")
    .upsert(
      {
        user_id: user.id,
        product_id: productId,
        rating,
        comment,
      },
      { onConflict: "user_id,product_id" }
    )
    .select("*, profiles(first_name, last_name, avatar_url)")
    .single();

  if (error) throw error;

  // Update the product's average rating
  await updateProductRating(productId);

  return normalizeReview(data);
}

export async function deleteReview(reviewId, productId) {
  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

  if (error) throw error;

  await updateProductRating(productId);
}

async function updateProductRating(productId) {
  const { data: reviews } = await supabase
    .from("reviews")
    .select("rating")
    .eq("product_id", productId);

  const count = reviews?.length ?? 0;
  const avg =
    count > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / count
      : 0;

  await supabase
    .from("products")
    .update({ rating_avg: Math.round(avg * 10) / 10, rating_count: count })
    .eq("id", productId);
}

function normalizeReview(row) {
  return {
    id: row.id,
    userId: row.user_id,
    productId: row.product_id,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
    author: {
      firstName: row.profiles?.first_name ?? "",
      lastName: row.profiles?.last_name ?? "",
      avatarUrl: row.profiles?.avatar_url ?? null,
    },
  };
}
