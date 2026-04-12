import AcaraPageClient from "./AcaraPageClient";

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
        url: "https://ukmkopmaunnes.com/images/BANGUNGAN.png",
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
    images: ["https://ukmkopmaunnes.com/images/BANGUNGAN.png"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/acara",
  },
};

export default function AcaraPage() {
  return <AcaraPageClient />;
}