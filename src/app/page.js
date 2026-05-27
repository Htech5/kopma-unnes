import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LatestActivitySection from "../components/LatestActivitySection";
import LazySection from "../components/LazySection";
import JsonLd from "@/components/JsonLd";

const LatestMagazineSection = dynamic(
  () => import("../components/LatestMagazineSection"),
  { ssr: false }
);

const StatistikSection = dynamic(
  () => import("../components/StatistikSection"),
  { ssr: false }
);

const PeranKamiSection = dynamic(
  () => import("../components/PeranKamiSection"),
  { ssr: false }
);

const UnitUsahaSection = dynamic(
  () => import("../components/UnitUsahaSection"),
  { ssr: false }
);

export const revalidate = 3600;

export const metadata = {
  title: "KOPMA UNNES – Koperasi Mahasiswa Universitas Negeri Semarang",
  description:
    "KOPMA UNNES adalah Koperasi Mahasiswa UNNES yang berdiri sejak 1982. Melayani Counter JNE, KOPMART, Toga Wisuda, Konsinyasi, dan Kedai Wareg Senyum di kampus UNNES Semarang.",
  keywords: [
    "KOPMA UNNES",
    "koperasi mahasiswa UNNES",
    "koperasi mahasiswa Universitas Negeri Semarang",
    "UKM UNNES",
  ],
  openGraph: {
    title: "KOPMA UNNES – Koperasi Mahasiswa Universitas Negeri Semarang",
    description:
      "KOPMA UNNES melayani mahasiswa UNNES melalui berbagai unit usaha: KOPMART, Counter JNE, Toga Wisuda, Konsinyasi, dan Kedai Wareg Senyum.",
    url: "https://ukmkopmaunnes.com",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/BANGUNGAN.webp",
        width: 1200,
        height: 630,
        alt: "Gedung KOPMA UNNES – Koperasi Mahasiswa Universitas Negeri Semarang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOPMA UNNES – Koperasi Mahasiswa Universitas Negeri Semarang",
    description:
      "KOPMA UNNES melayani mahasiswa UNNES melalui berbagai unit usaha: KOPMART, Counter JNE, Toga Wisuda, dan lebih banyak lagi.",
    images: ["https://ukmkopmaunnes.com/images/BANGUNGAN.webp"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KOPMA UNNES",
  alternateName: "Koperasi Mahasiswa Universitas Negeri Semarang",
  url: "https://ukmkopmaunnes.com",
  logo: "https://ukmkopmaunnes.com/images/kopma-unnes 2.png",
  foundingDate: "1982-05-07",
  description:
    "KOPMA UNNES adalah Koperasi Mahasiswa UNNES yang berdiri sejak 7 Mei 1982, bergerak di bidang unit usaha kampus termasuk KOPMART, Counter JNE, Toga Wisuda, dan Konsinyasi.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kampus Universitas Negeri Semarang",
    addressLocality: "Semarang",
    addressRegion: "Jawa Tengah",
    postalCode: "50229",
    addressCountry: "ID",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+6282146734835",
    email: "kopmaunnes@gmail.com",
    contactType: "customer service",
    availableLanguage: "Indonesian",
  },
  sameAs: [
    "https://www.instagram.com/kopmaunnes/",
    "https://www.facebook.com/profile.php?id=100064372937687",
    "https://www.youtube.com/@kopmaunnes6978",
    "https://www.tiktok.com/@kopmaunnes",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KOPMA UNNES",
  url: "https://ukmkopmaunnes.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ukmkopmaunnes.com/?s={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <Navbar />

      <main className="utama-page utama-page--flush">
        <section className="utama-shared" aria-labelledby="utama-hero-title">
          <div className="utama-shared__background" aria-hidden="true">
            <Image
              src="/images/BANGUNGAN.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={60}
              className="utama-shared__building"
            />
          </div>

          <section className="utama-hero">
            <div className="utama-hero__content">
              <div className="utama-hero__text">
                <p className="utama-hero__eyebrow">Welcome To,</p>

                <h1 id="utama-hero-title" className="utama-hero__title">
                  KOPMA UNNES
                </h1>

                <p className="utama-hero__description">
                  Koperasi Mahasiswa Unnes lahir berawal dari perlunya pemenuhan
                  kebutuhan kesejahteraan mahasiswa melalui unit usaha yang
                  dikelola oleh mahasiswa sendiri. Keinginan tersebut semakin
                  berkembang setelah munculnya gagasan perlunya wadah untuk
                  menyalurkan aspirasi agar dapat tampil dan layak menjadi mitra
                  universitas. KOPMA UNNES berdiri pada tanggal 7 Mei 1982,
                  sebagai satu bentuk koperasi kampus mahasiswa Universitas
                  Negeri Semarang.
                </p>

                <Link href="/profil" className="utama-hero__button">
                  See Details
                </Link>
              </div>

              <div className="utama-hero__visual" aria-hidden="true">
                <div className="utama-hero__maskot">
                  <Image
                    src="/images/MASKOT.webp"
                    alt=""
                    fill
                    sizes="(max-width: 992px) 250px, 360px"
                    quality={70}
                    className="utama-hero__maskot-image"
                  />
                </div>
              </div>
            </div>
          </section>

          <LatestActivitySection />
        </section>

        <LazySection minHeight={400}>
          <LatestMagazineSection />
        </LazySection>

        <LazySection minHeight={300}>
          <StatistikSection />
        </LazySection>

        <LazySection minHeight={400}>
          <PeranKamiSection />
        </LazySection>

        <LazySection minHeight={400}>
          <UnitUsahaSection />
        </LazySection>
      </main>

      <Footer />
    </>
  );
}
