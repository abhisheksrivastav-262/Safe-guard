"use server";

import { uploadImage, deleteImage } from "@/lib/supabase/storage";

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File | null;
  const folder = formData.get("folder") as string || "general";
  
  if (!file) {
    return { error: "No file provided" };
  }
  
  try {
    const url = await uploadImage(file, folder);
    return { url };
  } catch (error: any) {
    return { error: error.message || "Failed to upload image" };
  }
}

export async function deleteImageAction(url: string) {
  try {
    await deleteImage(url);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete image" };
  }
}
