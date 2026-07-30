const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Validasi di trust boundary: tolak file non-gambar / terlalu besar sebelum
// diteruskan ke backend. Backend tetap wajib memvalidasi ulang (magic byte).
export function validateUpload(formData) {
  for (const value of formData.values()) {
    if (typeof value === "string") continue;
    if (!ALLOWED_IMAGE_TYPES.includes(value.type)) {
      return "File harus berupa gambar (JPEG, PNG, atau WebP)";
    }
    if (value.size > MAX_UPLOAD_BYTES) {
      return "Ukuran file maksimal 5MB";
    }
  }
  return null;
}
