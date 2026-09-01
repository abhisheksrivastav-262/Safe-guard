import { listImages } from "@/lib/supabase/storage";
import ImageUploader from "../components/ImageUploader";

export default async function MediaPage() {
  const images = await listImages();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0A1931]">Media Library</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Upload New Image</h2>
        <div className="max-w-md">
          {/* Note: This uploader currently uploads to the 'general' folder by default */}
          <ImageUploader name="dummy" label="Select an image to upload directly to your library" folder="general" />
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Once uploaded, images will appear below. You can copy their URLs to use in your content.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Uploaded Files</h2>
        </div>
        
        {images.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No media found in the library.
          </div>
        ) : (
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {images.map((img) => (
              <div key={img.name} className="group relative border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                <div className="aspect-square w-full">
                  <img 
                    src={img.url} 
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 border-t border-slate-200">
                  <p className="text-[10px] text-slate-600 truncate font-medium" title={img.name}>
                    {img.name}
                  </p>
                </div>
                
                {/* Overlay actions on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <a 
                    href={img.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-xs font-bold px-3 py-1.5 rounded hover:bg-slate-100 transition"
                  >
                    View
                  </a>
                  {/* Delete functionality would require a Client Component wrapper for the button, 
                      leaving as view-only for the core display for now */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
