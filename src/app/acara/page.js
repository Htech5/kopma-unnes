import AcaraPageClient from "./AcaraPageClient";
import { getAcaraAll } from "@/lib/data";

export const revalidate = 3600;

export const metadata = {
  title: "Acara KOPMA UNNES – Kegiatan & Event Koperasi Mahasiswa UNNES",
  description:
    "Daftar kegiatan dan acara resmi KOPMA UNNES. Ikuti berbagai event organisasi, perkoperasian, dan kegiatan mahasiswa di Universitas Negeri Semarang.",
  keywords: [
    "acara KOPMA UNNES",
    "event KOPMA UNNES",
    "kegiatan koperasi mahasiswa UNNES",
  ],
  openGraph: {
    title: "Acara KOPMA UNNES – Kegiatan & Event Terbaru",
    description:
      "Ikuti berbagai acara dan event resmi KOPMA UNNES – koperasi mahasiswa Universitas Negeri Semarang.",
    url: "https://ukmkopmaunnes.com/acara",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/BANGUNGAN.jpg",
        width: 1200,
        height: 630,
        alt: "Acara dan Kegiatan KOPMA UNNES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acara KOPMA UNNES – Kegiatan Terbaru",
    description:
      "Ikuti berbagai acara dan event resmi KOPMA UNNES di kampus Universitas Negeri Semarang.",
    images: ["https://ukmkopmaunnes.com/images/BANGUNGAN.jpg"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/acara",
  },
};

export default async function AcaraPage() {
  let items = [];
  let failed = false;

  try {
    items = await getAcaraAll();
  } catch (error) {
    console.error("[AcaraPage] gagal memuat data awal:", error);
    failed = true;
  }

  return <AcaraPageClient items={items} failed={failed} />;
}