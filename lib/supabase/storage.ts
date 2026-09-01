import { createServiceClient } from "./server";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(file: File, folder: string = "general") {
  const supabase = await createServiceClient();
  
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${uuidv4()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from("safe_guard_media")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
    
  if (error) {
    console.error("Storage upload error:", error);
    throw error;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from("safe_guard_media")
    .getPublicUrl(fileName);
    
  return publicUrl;
}

export async function deleteImage(url: string) {
  if (!url || !url.includes("safe_guard_media")) return;
  
  const supabase = await createServiceClient();
  // Extract path from public URL
  // e.g. https://dhqzxgtmsjgxkwalrstm.supabase.co/storage/v1/object/public/safe_guard_media/folder/file.jpg
  try {
    const urlParts = url.split("/safe_guard_media/");
    if (urlParts.length !== 2) return;
    
    const filePath = urlParts[1];
    
    const { error } = await supabase.storage
      .from("safe_guard_media")
      .remove([filePath]);
      
    if (error) {
      console.error("Storage delete error:", error);
    }
  } catch (e) {
    console.error("Error deleting image", e);
  }
}

export async function listImages() {
  const supabase = await createServiceClient();
  // Since list() only works per folder, we might need to list all folders,
  // or we can just query the Gallery items. For a real media library,
  // it's easier to create a `media` table in the database that stores references
  // to uploaded files, or just use the Supabase JS SDK.
  
  // For simplicity, let's assume we just want to get files in 'general' folder
  const { data, error } = await supabase.storage
    .from("safe_guard_media")
    .list("general", {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });
    
  if (error) {
    console.error("Storage list error:", error);
    return [];
  }
  
  // Generate public URLs for each
  return data
    .filter(file => file.name !== ".emptyFolderPlaceholder")
    .map(file => {
      const { data: { publicUrl } } = supabase.storage
        .from("safe_guard_media")
        .getPublicUrl(`general/${file.name}`);
      return {
        name: file.name,
        url: publicUrl,
        created_at: file.created_at,
        id: file.id
      };
    });
}
