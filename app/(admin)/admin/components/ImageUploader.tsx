"use client";

import { useState, useRef } from "react";
import { uploadImageAction } from "../actions/upload";

interface ImageUploaderProps {
  name?: string;
  defaultValue?: string | null;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ 
  name = "image_url", 
  defaultValue = "", 
  folder = "general",
  label = "Upload Image"
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const result = await uploadImageAction(formData);

    setIsUploading(false);
    
    if (result.error) {
      setError(result.error);
      setPreview(defaultValue || null); // Revert on error
    } else if (result.url) {
      setPreview(result.url); // Use remote URL
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700">{label}</label>
      
      {/* Hidden input to store the actual URL value for form submission */}
      <input type="hidden" name={name} value={preview || ""} />
      
      <div className="flex items-start gap-4">
        <div 
          className={`w-32 h-32 flex-shrink-0 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden relative ${
            preview ? "border-slate-200" : "border-slate-300 bg-slate-50"
          }`}
        >
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <span className="text-slate-400 text-xs text-center p-4">No image selected</span>
          )}
        </div>
        
        <div className="flex flex-col gap-2 pt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
            id={`file-upload-${name}`}
          />
          <label 
            htmlFor={`file-upload-${name}`}
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2 rounded text-sm font-medium cursor-pointer transition text-center"
          >
            {isUploading ? "Uploading..." : "Choose Image"}
          </label>
          
          {preview && (
            <button 
              type="button" 
              onClick={clearImage}
              className="text-red-600 hover:text-red-800 text-sm font-medium text-left"
            >
              Remove
            </button>
          )}
          
          {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
        </div>
      </div>
    </div>
  );
}
