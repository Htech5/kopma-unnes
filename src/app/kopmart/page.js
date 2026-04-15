import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JsonLd from "@/components/JsonLd"

export const metadata = {
  title: "KOPMART KOPMA UNNES – Toko Kebutuhan Mahasiswa & Almamater UNNES",
  description:
    "KOPMART adalah toko serba ada di kampus UNNES. Jual kebutuhan sehari-hari mahasiswa, almamater UNNES, terima konsinyasi, bayar cash & QRIS. Harga terjangkau, pelayanan ramah.",
  keywords: [
    "KOPMART UNNES",
    "toko mahasiswa UNNES",
    "almamater UNNES",
    "toko kampus UNNES Semarang",
    "KOPMART KOPMA",
  ],
  openGraph: {
    title: "KOPMART KOPMA UNNES – Toko Kebutuhan Mahasiswa di Kampus UNNES",
    description:
      "Belanja kebutuhan mahasiswa, almamater UNNES, dan produk konsinyasi di KOPMART KOPMA UNNES. Harga terjangkau, bayar cash atau QRIS.",
    url: "https://ukmkopmaunnes.com/kopmart",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/kopmart-store.png",
        width: 1200,
        height: 630,
        alt: "Toko KOPMART KOPMA UNNES – Kebutuhan Mahasiswa Universitas Negeri Semarang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOPMART KOPMA UNNES – Toko Kebutuhan Mahasiswa",
    description:
      "Belanja kebutuhan mahasiswa dan almamater UNNES di KOPMART. Harga terjangkau, terima konsinyasi, bayar cash atau QRIS.",
    images: ["https://ukmkopmaunnes.com/images/kopmart-store.png"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/kopmart",
  },
};

const kopmartSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "KOPMART KOPMA UNNES",
  description:
    "KOPMART adalah toko serba ada di kampus UNNES yang menyediakan kebutuhan mahasiswa, almamater UNNES, layanan konsinyasi, dan pembayaran cash atau QRIS.",
  url: "https://ukmkopmaunnes.com/kopmart",
  image: "https://ukmkopmaunnes.com/images/kopmart-store.png",
  priceRange: "Rp",
  paymentAccepted: "Cash, QRIS",
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Produk KOPMART",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Almamater UNNES" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Kebutuhan Sehari-hari Mahasiswa" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Layanan Konsinyasi" } },
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ukmkopmaunnes.com" },
      { "@type": "ListItem", position: 2, name: "KOPMART", item: "https://ukmkopmaunnes.com/kopmart" },
    ],
  },
};

const kopmartFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa saja yang dijual di KOPMART KOPMA UNNES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "KOPMART KOPMA UNNES menjual berbagai kebutuhan mahasiswa sehari-hari, almamater UNNES, dan menerima produk konsinyasi (titip jual) dari anggota maupun umum.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah KOPMART UNNES menerima pembayaran QRIS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, KOPMART KOPMA UNNES menerima pembayaran cash dan QRIS untuk kemudahan transaksi mahasiswa.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara titip jual (konsinyasi) di KOPMART KOPMA UNNES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kamu bisa menghubungi KOPMART KOPMA UNNES langsung atau datang ke toko di kampus UNNES untuk mendaftarkan produk konsinyasi kamu.",
      },
    },
  ],
};
const qualityItems = [
  {
    id: "affordable",
    title: "Harga Terjangkau",
    image: "/images/kopmart-harga.png",
    alt: "Ilustrasi harga terjangkau di KOPMART KOPMA UNNES",
  },
  {
    id: "service",
    title: "Good Service",
    image: "/images/kopmart-service.png",
    alt: "Ilustrasi pelayanan ramah di KOPMART KOPMA UNNES",
  },
  {
    id: "payment",
    title: "Payment",
    subtitle: "Cash or Qris",
    image: "/images/kopmart-payment.png",
    alt: "Ilustrasi pembayaran cash atau QRIS di KOPMART",
  },
  {
    id: "consultation",
    title: "Terima Konsinyasi",
    image: "/images/kopmart-konsinyasi.png",
    alt: "Ilustrasi layanan konsinyasi di KOPMART",
  },
  {
    id: "member",
    title: "Get Point",
    subtitle: "for member",
    image: "/images/kopmart-member.png",
    alt: "Ilustrasi keuntungan point member KOPMART",
  },
];

const supplyItems = [
  {
    id: "almamater",
    title: "Almamater Unnes",
    image: "/images/almamater.png",
    alt: "Produk almamater UNNES yang tersedia di KOPMART",
  },
  {
    id: "mahasiswa",
    title: "Kebutuhan Mahasiswa",
    image: "/images/kopmart-mahasiswa.png",
    alt: "Kebutuhan mahasiswa yang tersedia di KOPMART",
  },
];

export default function KopmartPage() {
  return (
    <>
      <JsonLd data={kopmartSchema} />
      <JsonLd data={kopmartFaqSchema} />
      <Navbar />

      <main className="kopmart-page kopmart-page--flush">
        <section className="kopmart-hero">
          <div className="kopmart-hero__inner">
            <div className="kopmart-hero__text">
              <h1 className="kopmart-hero__title">KOPMART</h1>

              <div
                className="kopmart-hero__tag"
                aria-label="Informasi layanan KOPMART"
              >
              <a
                href="https://wa.me/6285124573261"
                target="_blank"
                rel="noopener noreferrer"
                className="jne-hero__cta"
              >
                <span className="kopmart-hero__tag-main">Hubungi Kami</span>
                <span className="kopmart-hero__tag-icon">➜</span>
              </a>
              </div>
            </div>
          </div>

          <div className="kopmart-hero__logo-badge">
            <Image
              src="/images/kopmart-logo.png"
              alt="Logo KOPMART"
              width={180}
              height={180}
              className="kopmart-hero__logo-image"
              priority
            />
          </div>

          <div className="kopmart-hero__curve" aria-hidden="true">
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

        <section className="kopmart-intro">
          <div className="kopmart-intro__inner">
            <div className="kopmart-intro__grid">
              <div className="kopmart-intro__image-box">
                <Image
                  src="/images/kopmart-store.png"
                  alt="Suasana toko KOPMART KOPMA UNNES"
                  width={420}
                  height={300}
                  className="kopmart-intro__image"
                  loading="eager"
                />
              </div>

              <div className="kopmart-intro__content">
                <h2 className="kopmart-intro__title">About KOPMART</h2>
                <p className="kopmart-intro__text">
                  KOPMART merupakan salah satu unit usaha KOPMA UNNES yang
                  menyediakan berbagai kebutuhan mahasiswa, produk almamater
                  UNNES, serta layanan pendukung dengan pelayanan ramah dan
                  harga yang terjangkau.
                </p>
              </div>
            </div>

            <div className="kopmart-size-quality">
              <h2 className="kopmart-size-quality__title">Quality</h2>
            </div>

            <div className="kopmart-quality-grid">
              {qualityItems.map((item) => (
                <article key={item.id} className="kopmart-quality-card">
                  <div className="kopmart-quality-card__image-wrap">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={110}
                      height={110}
                      className="kopmart-quality-card__image"
                    />
                  </div>

                  <h3 className="kopmart-quality-card__title">{item.title}</h3>

                  {item.subtitle && (
                    <p className="kopmart-quality-card__subtitle">
                      {item.subtitle}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="kopmart-supply">
          <div className="kopmart-supply__inner">
            <h2 className="kopmart-section-title">Menyediakan</h2>

            <div className="kopmart-supply__grid">
              {supplyItems.map((item) => (
                <article key={item.id} className="kopmart-supply-card">
                  <h3 className="kopmart-supply-card__title">
                    {item.title.includes(" ") ? (
                      <>
                        {item.title.split(" ").slice(0, -1).join(" ")}
                        <br />
                        {item.title.split(" ").slice(-1)}
                      </>
                    ) : (
                      item.title
                    )}
                  </h3>

                  <div className="kopmart-supply-card__image-wrap">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={320}
                      height={320}
                      className="kopmart-supply-card__image"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="kopmart-counter">
          <div className="kopmart-counter__inner">
            <div className="kopmart-counter__card">
              <h2 className="kopmart-counter__title">Kopmart Counter</h2>
              <div className="kopmart-counter__poster-wrap">
                <Image
                  src="/images/kopmart-counter-poster.png"
                  alt="Poster layanan Kopmart Counter KOPMA UNNES"
                  width={900}
                  height={1400}
                  className="kopmart-counter__poster"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
