import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Counter JNE KOPMA UNNES – Layanan Pengiriman Paket di Kampus UNNES",
  description:
    "Counter JNE resmi di kampus UNNES Semarang. Layanan pengiriman Regular, YES (esok hari), dan OKE ke seluruh Indonesia. Cek ongkir dan kirim paket sekarang!",
  keywords: [
    "counter JNE UNNES",
    "JNE kampus UNNES",
    "pengiriman paket UNNES Semarang",
    "JNE KOPMA",
    "cek ongkir JNE Semarang",
  ],
  openGraph: {
    title: "Counter JNE KOPMA UNNES – Layanan Pengiriman di Kampus UNNES",
    description:
      "Kirim paket mudah dari kampus UNNES lewat Counter JNE KOPMA. Tersedia layanan Regular, YES, dan OKE ke seluruh Indonesia.",
    url: "https://ukmkopmaunnes.com/jne-kopma",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/JNE-logo.png",
        width: 1200,
        height: 630,
        alt: "Counter JNE KOPMA UNNES – Layanan Pengiriman di Kampus UNNES Semarang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Counter JNE KOPMA UNNES – Pengiriman Paket di Kampus UNNES",
    description:
      "Kirim paket dari kampus UNNES lewat Counter JNE KOPMA. Layanan Regular, YES, dan OKE tersedia.",
    images: ["https://ukmkopmaunnes.com/images/JNE-logo.png"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/jne-kopma",
  },
};

const jneSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Counter JNE KOPMA UNNES",
  description:
    "Counter JNE resmi di kampus UNNES Semarang. Layanan pengiriman Regular, YES, dan OKE ke seluruh Indonesia.",
  url: "https://ukmkopmaunnes.com/jne-kopma",
  image: "https://ukmkopmaunnes.com/images/JNE-logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kampus Universitas Negeri Semarang",
    addressLocality: "Semarang",
    addressRegion: "Jawa Tengah",
    postalCode: "50229",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.0527,
    longitude: 110.4085,
  },
  parentOrganization: {
    "@type": "Organization",
    name: "KOPMA UNNES",
    url: "https://ukmkopmaunnes.com",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ukmkopmaunnes.com" },
      { "@type": "ListItem", position: 2, name: "Counter JNE", item: "https://ukmkopmaunnes.com/jne-kopma" },
    ],
  },
};

const jneFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa saja layanan pengiriman di Counter JNE KOPMA UNNES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Counter JNE KOPMA UNNES menyediakan tiga layanan: Regular (estimasi 3-4 hari), YES/Yakin Esok Sampai (estimasi besok), dan OKE dengan tarif ekonomis (estimasi 1-2 hari).",
      },
    },
    {
      "@type": "Question",
      name: "Di mana lokasi Counter JNE KOPMA UNNES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Counter JNE KOPMA UNNES berlokasi di dalam kampus Universitas Negeri Semarang (UNNES), Semarang, Jawa Tengah.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara cek ongkir di Counter JNE KOPMA UNNES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kamu bisa cek ongkir langsung di website resmi JNE pada halaman https://www.jne.co.id/id/tracking/trace atau datang langsung ke Counter JNE KOPMA UNNES di kampus UNNES.",
      },
    },
  ],
};


const serviceItems = [
  {
    id: "delivery",
    title: "Delivery",
    image: "/images/motor.png",
    alt: "Layanan delivery JNE KOPMA",
  },
  {
    id: "packaging",
    title: "Packaging",
    image: "/images/paket.png",
    alt: "Layanan packaging JNE KOPMA",
  },
];

const paketItems = [
  {
    id: "regular",
    title: "REGULAR",
    description:
      "Layanan pengiriman ke seluruh wilayah Indonesia dengan waktu penyampaian sesuai estimasi waktu pengantaran yang telah ditentukan.",
    estimate: "(Estimasi pengiriman 3-4 hari)",
  },
  {
    id: "yes",
    title: "YES",
    description: "Pengiriman dengan waktu penyampaian di tujuan esok hari.",
    estimate: "(Estimasi pengiriman besok)",
  },
  {
    id: "oke",
    title: "OKE",
    description:
      "Layanan pengiriman ke seluruh wilayah Indonesia dengan tarif ekonomis.",
    estimate: "(Estimasi pengiriman 1-2 hari)",
  },
];

export default function JneKopmaPage() {
  return (
    <>
      <JsonLd data={jneSchema} />
      <JsonLd data={jneFaqSchema} />
      <Navbar />

      <main className="jne-page jne-page--flush">
        {/* ── HERO ── */}
        <section className="jne-hero">
          <div className="jne-hero__inner">
            <div className="jne-hero__text">
              <h1 className="jne-hero__title">
                JNE KOPMA
                <br />
                UNNES
              </h1>

              <a
                href="https://maps.app.goo.gl/s51EG4NFcNkJkARK6"
                target="_blank"
                rel="noopener noreferrer"
                className="jne-hero__cta"
              >
                <span>Hubungi</span>
                <span>Kami</span>
                <span className="jne-hero__cta-icon">➜</span>
              </a>
            </div>
          </div>

          {/* Logo diletakkan di luar inner agar position absolute relatif ke .jne-hero */}
          <div className="jne-hero__logo-badge">
            <Image
              src="/images/JNE-logo.png"
              alt="Logo JNE"
              width={180}
              height={180}
              className="jne-hero__logo-image"
              priority
            />
          </div>

          {/* fill #ececec agar curve menyatu dengan background halaman */}
          <div className="jne-hero__curve" aria-hidden="true">
            <svg
              viewBox="0 0 1200 90"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 90 C 180 88, 290 84, 390 70 C 520 52, 610 28, 790 14 C 900 4, 1020 0, 1200 2 L 1200 90 Z"
                fill="#ececec"
              />
            </svg>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="jne-services">
          <div className="jne-services__inner">
            <h2 className="jne-section-title">Our Service</h2>

            <div className="jne-services__grid">
              {serviceItems.map((item) => (
                <article key={item.id} className="jne-service-card">
                  <div className="jne-service-card__image-wrap">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={220}
                      height={220}
                      className="jne-service-card__image"
                    />
                  </div>
                  <h3 className="jne-service-card__title">{item.title}</h3>
                </article>
              ))}
            </div>

            <div className="jne-paket-grid">
              {paketItems.map((item) => (
                <article key={item.id} className="jne-paket-card">
                  <h3 className="jne-paket-card__title">{item.title}</h3>
                  <p className="jne-paket-card__description">
                    {item.description}
                    {item.estimate && (
                      <>
                        <br />
                        {item.estimate}
                      </>
                    )}
                  </p>
                  <a
                    href="https://www.jne.co.id/id/tracking/trace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jne-paket-card__button"
                  >
                    Cek Ongkir
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
