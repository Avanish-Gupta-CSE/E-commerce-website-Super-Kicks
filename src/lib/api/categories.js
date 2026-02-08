import { supabase } from "../supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return data.map(normalizeCategory);
}

function normalizeCategory(row) {
  return {
    _id: row.id,
    categoryName: row.name,
    slug: row.slug,
    description: row.description,
    image: row.image_url,
  };
}
