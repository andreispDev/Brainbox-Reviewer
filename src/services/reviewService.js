import { supabase } from "../supabase";

export async function getReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
}

export async function createReview(reviewData) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([reviewData])
    .select();

  if (error) {
    console.error("CREATE ERROR:", error);
    throw error;
  }

  return data;
}

export async function updateReview(id, updates) {
  const { data, error } = await supabase
    .from("reviews")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteReview(id) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) throw error;
}
