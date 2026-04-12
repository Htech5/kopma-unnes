import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InventarisClient from "./InventarisClient";


export const revalidate = 300;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ukmkopmaunnes.com";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "";

const PAGE_TITLE = "Inventaris | KOPMA UNNES";
const PAGE_DESCRIPTION =
  "Daftar penyewaan inventaris KOPMA UNNES — temukan nama barang, gambar, harga sewa, stok, dan stok tersedia secara lengkap.";

function getInventarisEndpoint() {
  if (!API_BASE_URL) return null;

  try {
    return new URL("/api/inventaris", API_BASE_URL).toString();
  } catch {
    return null;
  }
}

function normalizeItems(payload) {
  const list = Array.isArray(payload)
    ? payload
    : payload?.data ?? payload?.items ?? [];

  if (!Array.isArray(list)) return [];

  return list.map((item, index) => ({
    id: item?.id ?? `inv-${index}`,
    nama: typeof item?.nama === "string" ? item.nama.trim() : "",
    gambar: typeof item?.gambar === "string" ? item.gambar.trim() : "",
    harga: item?.harga ?? null,
    stok: item?.stok ?? null,
    stok_tersedia: item?.stok_tersedia ?? null,
  }));
}

async function getInventarisData() {
  const endpoint = getInventarisEndpoint();
  if (!endpoint) return [];

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error("[InventarisPage] fetch failed:", res.status);
      return [];
    }

    const json = await res.json();
    return normalizeItems(json);
  } catch (error) {
    console.error("[InventarisPage] fetch error:", error);
    return [];
  }
}

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/inventaris`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/inventaris`,
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default async function InventarisPage() {
  const items = await getInventarisData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Inventaris KOPMA UNNES",
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/inventaris`,
    inLanguage: "id-ID",
    isPartOf: {
      "@type": "WebSite",
      name: "KOPMA UNNES",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Daftar Inventaris KOPMA UNNES",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 20).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.nama || `Inventaris ${index + 1}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="inventaris-page keanggotaan-page--flush">
        <InventarisClient initialItems={items} />
      </main>
      <Footer />
    </>
  );
}