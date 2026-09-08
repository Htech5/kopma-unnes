// Fetch server-ke-server langsung ke backend, tidak lewat /api/* milik sendiri.
// Browser jadi tidak pernah memanggil origin sendiri untuk data, sehingga
// challenge/rate-limit di CDN depan situs tidak bisa memblokir isi halaman.

const DEFAULT_BASE = "https://api.ukmkopmaunnes.com";

// ponytail: fallback ke backend produksi supaya prerender saat build tidak
// menghasilkan halaman kosong kalau env belum terbaca. Hapus kalau backend pindah.
const EVENTS_BASE = process.env.API_EVENTS_BASE_URL || DEFAULT_BASE;
const MAGAZINE_BASE = process.env.API_MAGAZINE_BASE_URL || DEFAULT_BASE;
const BACKEND_BASE = process.env.API_BACKEND_URL || DEFAULT_BASE;

const REVALIDATE = 3600;

async function getJson(url) {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} dari ${url}`);

  return res.json();
}

function buildImageUrl(apiBase, path) {
  if (!path || typeof path !== "string") return null;
  if (/^https?:\/\//i.test(path)) return path;

  const cleanBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}

export function mapEvent(item) {
  return {
    id: item.id,
    judul: item.title,
    foto: buildImageUrl(
      EVENTS_BASE,
      item.main_image || item.top_image || item.middle_image || null
    ),
    isi: [item.content_top, item.content_bottom].filter(Boolean).join("<br /><br />"),
    ringkasan: item.content_top
      ? item.content_top.replace(/<[^>]*>/g, "").slice(0, 160).trim()
      : "",
    tanggal: item.created_at,
    slug: item.slug,
    category_id: item.category_id,
    category_name: item.category_name || null,
  };
}

// Backend mengembalikan seluruh event sekaligus; paginasi dilakukan di sini,
// sama seperti yang sebelumnya dikerjakan route /api/acara.
export async function getAcara(page = 1, limit = 6) {
  const rows = await getJson(`${EVENTS_BASE}/api/events`);
  if (!Array.isArray(rows)) throw new Error("Format data event tidak valid");

  const mapped = rows.map(mapEvent);
  const start = (page - 1) * limit;

  return {
    data: mapped.slice(start, start + limit),
    total: mapped.length,
    totalPages: Math.max(1, Math.ceil(mapped.length / limit)),
    page,
    limit,
  };
}

export async function getAcaraAll() {
  const { data } = await getAcara(1, Number.MAX_SAFE_INTEGER);

  return data;
}

export async function getInventaris() {
  const json = await getJson(`${BACKEND_BASE}/api/inventaris`);
  const list = Array.isArray(json) ? json : json.data ?? json.items ?? [];

  return Array.isArray(list) ? list : [];
}

export async function getMagazines() {
  const json = await getJson(`${MAGAZINE_BASE}/api/magazines`);

  return Array.isArray(json) ? json : [];
}
