import JsonLd from "@/components/JsonLd";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfilClient from "../../components/ProfilClient";

export const metadata = {
  title: "Profil KOPMA UNNES – Sejarah, Visi & Misi Koperasi Mahasiswa UNNES",
  description:
    "Kenali lebih dekat KOPMA UNNES: sejarah berdiri sejak 7 Mei 1982, visi misi organisasi, dan perannya sebagai UKM bisnis berbadan hukum di Universitas Negeri Semarang.",
  keywords: [
    "profil KOPMA UNNES",
    "sejarah KOPMA UNNES",
    "visi misi KOPMA UNNES",
    "koperasi mahasiswa UNNES",
  ],
  openGraph: {
    title: "Profil KOPMA UNNES – Sejarah, Visi & Misi Koperasi Mahasiswa UNNES",
    description:
      "KOPMA UNNES berdiri sejak 7 Mei 1982 sebagai organisasi bisnis berbadan hukum di lingkungan Universitas Negeri Semarang.",
    url: "https://ukmkopmaunnes.com/profil",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/kopma-unnes 2.png",
        width: 1200,
        height: 630,
        alt: "Logo KOPMA UNNES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profil KOPMA UNNES – Sejarah, Visi & Misi",
    description:
      "KOPMA UNNES berdiri sejak 7 Mei 1982 sebagai organisasi bisnis mahasiswa berbadan hukum di UNNES Semarang.",
    images: ["https://ukmkopmaunnes.com/images/kopma-unnes 2.png"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/profil",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Profil KOPMA UNNES – Sejarah, Visi & Misi",
  url: "https://ukmkopmaunnes.com/profil",
  description:
    "Profil lengkap KOPMA UNNES: sejarah berdiri sejak 7 Mei 1982, visi misi, dan perannya sebagai UKM bisnis berbadan hukum di Universitas Negeri Semarang.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ukmkopmaunnes.com" },
      { "@type": "ListItem", position: 2, name: "Profil", item: "https://ukmkopmaunnes.com/profil" },
    ],
  },
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Video Profil KOPMA UNNES 2025",
  description:
    "Video profil resmi KOPMA UNNES tahun 2025, menampilkan sejarah, visi misi, dan unit usaha Koperasi Mahasiswa Universitas Negeri Semarang.",
  thumbnailUrl: "https://img.youtube.com/vi/MvR_LSEqV4U/maxresdefault.jpg",
  uploadDate: "2025-01-01",
  embedUrl: "https://www.youtube.com/embed/MvR_LSEqV4U",
  contentUrl: "https://www.youtube.com/watch?v=MvR_LSEqV4U",
  publisher: {
    "@type": "Organization",
    name: "KOPMA UNNES",
    logo: {
      "@type": "ImageObject",
      url: "https://ukmkopmaunnes.com/images/kopma-unnes 2.png",
    },
  },
};


export default function ProfilPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <JsonLd data={videoSchema} />
      <Navbar />
      <main className="profil-page profil-page--flush">
        <ProfilClient />
      </main>
      <Footer />
    </>
  );
}