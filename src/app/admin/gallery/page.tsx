"use client";

import { Plus, Edit3, Trash2, Loader2, X, UploadCloud, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface GalleryPhotoData {
  _id?: string;
  slot: number;
  image: string;
  title: string;
  description: string;
}

export default function GalleryManagement() {
  const [photos, setPhotos] = useState<Record<number, GalleryPhotoData>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) {
        const data: GalleryPhotoData[] = await res.json();
        // Convert to slot-based lookup map
        const photoMap: Record<number, GalleryPhotoData> = {};
        data.forEach((p) => {
          photoMap[p.slot] = p;
        });
        setPhotos(photoMap);
      }
    } catch (e) {
      console.error("Failed to fetch gallery photos", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleOpenEdit = (slotNum: number) => {
    const existing = photos[slotNum];
    setSelectedSlot(slotNum);
    setFormData({
      title: existing?.title || "",
      description: existing?.description || "",
    });
    setImageFile(null);
    setImagePreview(existing?.image || null);
    setIsModalOpen(true);
  };

  const handleClearSlot = async (slotNum: number) => {
    if (!confirm(`Are you sure you want to clear Slot ${slotNum}? The image will be deleted from the server.`)) return;
    try {
      const res = await fetch(`/api/admin/gallery?slot=${slotNum}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPhotos((prev) => {
          const copy = { ...prev };
          delete copy[slotNum];
          return copy;
        });
        setSuccessMessage(`Slot ${slotNum} cleared successfully!`);
        setTimeout(() => setSuccessMessage(""), 3500);
      } else {
        const err = await res.json();
        alert(err.message || "Failed to clear slot");
      }
    } catch (e) {
      console.error(e);
      alert("Server error occurred while clearing slot");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlot === null) return;
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("slot", selectedSlot.toString());
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const result = await res.json();
        setPhotos((prev) => ({
          ...prev,
          [selectedSlot]: result.photo,
        }));
        setIsModalOpen(false);
        setSuccessMessage(`Slot ${selectedSlot} successfully updated!`);
        setTimeout(() => setSuccessMessage(""), 3500);
      } else {
        const err = await res.json();
        alert(err.message || "Failed to save photo");
      }
    } catch (e) {
      console.error(e);
      alert("Error occurred while saving gallery slot");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Homepage Gallery CMS</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage the 8-photo frame grid displayed directly under the Founder card on the home page.
        </p>
      </div>

      {successMessage && (
        <div className="mb-8 px-6 py-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-bold animate-in fade-in slide-in-from-top-4">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((slotNum) => {
            const photo = photos[slotNum];
            return (
              <div
                key={slotNum}
                className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between shadow-sm relative group overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Slot Indicator */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-black tracking-widest uppercase">
                  Slot {slotNum}
                </div>

                {/* Slot Image Content */}
                <div className="w-full aspect-video sm:aspect-square rounded-2xl bg-gray-50 dark:bg-black overflow-hidden relative border border-gray-100 dark:border-gray-800 flex items-center justify-center mb-5 group">
                  {photo ? (
                    <>
                      <img src={photo.image} alt={photo.title || `Slot ${slotNum}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleOpenEdit(slotNum)}
                          className="w-12 h-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => handleOpenEdit(slotNum)}
                      className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 hover:text-primary dark:hover:text-primary transition-colors p-4 w-full h-full"
                    >
                      <UploadCloud className="w-10 h-10 mb-2" />
                      <span className="text-sm font-bold uppercase tracking-wider">Empty Slot</span>
                      <span className="text-xs text-gray-500 mt-1">Click to Upload</span>
                    </button>
                  )}
                </div>

                {/* Details and Actions */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate">
                      {photo?.title || <span className="text-gray-400 font-normal italic">No Title</span>}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1 min-h-[40px]">
                      {photo?.description || <span className="text-gray-400 font-normal italic">No description provided for this slot.</span>}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => handleOpenEdit(slotNum)}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-transparent text-xs font-black uppercase tracking-wider transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> {photo ? "Edit" : "Upload"}
                    </button>
                    {photo ? (
                      <button
                        onClick={() => handleClearSlot(slotNum)}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gray-50 dark:bg-gray-800/40 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear
                      </button>
                    ) : (
                      <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Unused
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && selectedSlot !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
              Manage Gallery Slot {selectedSlot}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Preview / File Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">
                  Photo / Image
                </label>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="w-full aspect-video rounded-xl bg-gray-50 dark:bg-black overflow-hidden relative border border-gray-100 dark:border-gray-800 flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-400 text-xs font-bold uppercase">
                        No Image Selected
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required={!photos[selectedSlot]}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                    <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                      Use a modern horizontal aspect ratio (e.g. 16:9) or standard 4:3 for best grid rendering.
                      Maximum recommended size is 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">
                    Caption / Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium"
                    placeholder="E.g. Annual Team Conference"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-3">
                    Short Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white font-medium resize-none leading-relaxed"
                    placeholder="E.g. Celebrating outstanding sales achievements and leadership milestones with members across India."
                  ></textarea>
                </div>
              </div>

              <button
                disabled={submitting}
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-secondary to-amber-500 text-white rounded-2xl font-black tracking-wide text-xl hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 mt-4 flex justify-center items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...
                  </>
                ) : (
                  "Save Gallery Slot Details"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
