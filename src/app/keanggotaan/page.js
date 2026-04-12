import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MagazineSectionWrapper from "./MagazineSectionWrapper";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Keanggotaan KOPMA UNNES – Daftar & Info Anggota Koperasi Mahasiswa",
  description:
    "Informasi lengkap keanggotaan KOPMA UNNES: cara daftar, hak dan kewajiban anggota, majalah resmi, dan manfaat bergabung dengan koperasi mahasiswa UNNES.",
  keywords: [
    "daftar anggota KOPMA UNNES",
    "keanggotaan KOPMA UNNES",
    "koperasi mahasiswa UNNES",
    "majalah KOPMA UNNES",
  ],
  openGraph: {
    title: "Keanggotaan KOPMA UNNES – Daftar & Info Anggota",
    description:
      "Bergabunglah sebagai anggota KOPMA UNNES dan nikmati berbagai manfaat koperasi mahasiswa di Universitas Negeri Semarang.",
    url: "https://ukmkopmaunnes.com/keanggotaan",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/kopma-unnes 2.png",
        width: 1200,
        height: 630,
        alt: "Keanggotaan KOPMA UNNES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keanggotaan KOPMA UNNES – Daftar Sekarang",
    description:
      "Bergabunglah sebagai anggota KOPMA UNNES dan nikmati manfaat koperasi mahasiswa UNNES.",
    images: ["https://ukmkopmaunnes.com/images/kopma-unnes 2.png"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/keanggotaan",
  },
};

const keanggotaanSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Keanggotaan KOPMA UNNES – Daftar & Informasi Anggota",
  description:
    "Informasi lengkap tentang keanggotaan KOPMA UNNES, termasuk cara mendaftar, hak dan kewajiban anggota, serta majalah resmi KOPMA UNNES.",
  url: "https://ukmkopmaunnes.com/keanggotaan",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ukmkopmaunnes.com" },
      { "@type": "ListItem", position: 2, name: "Keanggotaan", item: "https://ukmkopmaunnes.com/keanggotaan" },
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "KOPMA UNNES",
    url: "https://ukmkopmaunnes.com",
    logo: "https://ukmkopmaunnes.com/images/kopma-unnes 2.png",
  },
};

export default function KeanggotaanPage() {
  return (
    <>
      <JsonLd data={keanggotaanSchema} />
      <Navbar />
      <main className="so-page magazine-page keanggotaan-page--flush" id="main-content">
        <MagazineSectionWrapper />
      </main>
      <Footer />
    </>
  );
}
