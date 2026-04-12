import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InventarisClient from "./InventarisClient";

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ukmkopmaunnes.com";

const PAGE_TITLE = "Inventaris | KOPMA UNNES";
const PAGE_DESCRIPTION =
  "Daftar penyewaan inventaris KOPMA UNNES — temukan nama barang, gambar, harga sewa, stok, dan stok tersedia secara lengkap.";

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

export default function InventarisPage() {
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
      numberOfItems: 0,
      itemListElement: [],
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
        <InventarisClient />
      </main>
      <Footer />
    </>
  );
}
