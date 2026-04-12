import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Sewa & Beli Toga Wisuda UNNES – KOPMA UNNES | Harga Terjangkau",
  description:
    "Sewa atau beli toga wisuda UNNES di KOPMA UNNES. Tersedia jubah toga, topi toga, seleber, tas wisuda, dan selempang untuk semua fakultas dan jenjang. Pesan online sekarang!",
  keywords: [
    "sewa toga wisuda UNNES",
    "beli toga wisuda Semarang",
    "toga KOPMA UNNES",
    "toga wisuda Universitas Negeri Semarang",
    "harga toga wisuda UNNES",
  ],
  openGraph: {
    title: "Sewa & Beli Toga Wisuda UNNES – KOPMA UNNES",
    description:
      "Sewa atau beli toga wisuda untuk semua fakultas di UNNES. Tersedia jubah toga, topi, seleber, tas wisuda, dan selempang. Pesan online di KOPMA UNNES!",
    url: "https://ukmkopmaunnes.com/toga-kopma",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/toga-logo.png",
        width: 1200,
        height: 630,
        alt: "Sewa Toga Wisuda UNNES di KOPMA – Tersedia Semua Fakultas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewa & Beli Toga Wisuda UNNES – KOPMA UNNES",
    description:
      "Sewa atau beli toga wisuda untuk semua fakultas UNNES. Pesan online sekarang di KOPMA UNNES!",
    images: ["https://ukmkopmaunnes.com/images/toga-logo.png"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/toga-kopma",
  },
};

const togaSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Toga KOPMA UNNES – Sewa & Beli Toga Wisuda",
  description:
    "Layanan sewa dan pembelian toga wisuda di UNNES. Tersedia jubah toga, topi toga, seleber, tas wisuda, dan selempang untuk semua fakultas dan jenjang.",
  url: "https://ukmkopmaunnes.com/toga-kopma",
  image: "https://ukmkopmaunnes.com/images/toga-logo.png",
  priceRange: "Rp",
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
      { "@type": "ListItem", position: 2, name: "Toga Wisuda", item: "https://ukmkopmaunnes.com/toga-kopma" },
    ],
  },
};

const togaProductSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Produk Toga Wisuda KOPMA UNNES",
  url: "https://ukmkopmaunnes.com/toga-kopma",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Jubah Toga – Tersedia semua fakultas dan jenjang" },
    { "@type": "ListItem", position: 2, name: "Topi Toga – Tersedia semua ukuran" },
    { "@type": "ListItem", position: 3, name: "Seleber – Tersedia semua fakultas" },
    { "@type": "ListItem", position: 4, name: "Tas Wisuda – Tersedia semua fakultas" },
    { "@type": "ListItem", position: 5, name: "Selempang – Tersedia bahan satin dan bludru" },
  ],
};

const togaFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara pesan toga wisuda di KOPMA UNNES?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pesan toga wisuda KOPMA UNNES bisa dilakukan secara online melalui https://kopmaunnes.isellershop.com. Buat akun, isi data diri, pilih produk, dan selesaikan pemesanan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah toga wisuda KOPMA UNNES tersedia untuk semua fakultas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, toga wisuda KOPMA UNNES tersedia untuk semua fakultas dan semua jenjang di Universitas Negeri Semarang, termasuk jubah toga, topi toga, seleber, tas wisuda, dan selempang.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah KOPMA UNNES melayani sewa dan pembelian toga wisuda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, KOPMA UNNES menyediakan dua layanan toga: penyewaan dan pembelian toga wisuda untuk mahasiswa Universitas Negeri Semarang.",
      },
    },
  ],
};

const serviceItems = [
  {
    id: "buy",
    title: "Pembelian Toga",
    image: "/images/toga-buy.png",
    alt: "Layanan pembelian toga wisuda",
  },
  {
    id: "rent",
    title: "Penyewaan Toga",
    image: "/images/toga-rent.png",
    alt: "Layanan penyewaan toga wisuda",
  },
];

const productItems = [
  {
    id: "seleber",
    title: "Seleber",
    subtitle: "Tersedia di Semua Fakultas",
    image: "/images/toga-product-1.png",
    alt: "Produk seleber toga",
  },
  {
    id: "jubah",
    title: "Jubah Toga",
    subtitle: "Tersedia Untuk Seluruh Fakultas dan Jenjang",
    image: "/images/toga-product-2.png",
    alt: "Produk jubah toga",
    buttonText: "Check Size Chart",
    buttonHref: "#",
  },
  {
    id: "tas",
    title: "Tas Wisuda",
    subtitle: "Tersedia di Semua Fakultas",
    image: "/images/toga-product-3.png",
    alt: "Produk tas wisuda",
  },
  {
    id: "topi",
    title: "Topi Toga",
    subtitle: "Ukuran Topi untuk Semua Ukuran",
    image: "/images/toga-product-4.png",
    alt: "Produk topi toga",
  },
  {
    id: "selempang",
    title: "Selempang",
    subtitle: "Tersedia Bahan Satin dan Bludru",
    image: "/images/toga-product-5.png",
    alt: "Produk selempang wisuda",
  },
];

const steps = [
  {
    id: "step-1",
    title:
      "1. Akses laman https://kopmaunnes.isellershop.com pada browser, google, chrome yang anda miliki. Atau klik tombol Pesan Toga Sekarang !",
    image: "/images/toga-step-1.png",
    alt: "Langkah pertama pemesanan toga",
    buttonText: "Pesan Toga Sekarang",
  },
  {
    id: "step-2",
    title:
      "2. Buat akun baru dengan cara klik Login/Daftar pada tampilan awal website",
    image: "/images/toga-step-2.png",
    alt: "Langkah kedua pemesanan toga",
  },
  {
    id: "step-3",
    title:
      "3. Masuk dengan akun anda (bila sudah memiliki). Bagi yang belum memiliki bisa membuat akun terlebih dahulu dengan mengklik Daftar",
    image: "/images/toga-step-3.png",
    alt: "Langkah ketiga pemesanan toga",
  },
  {
    id: "step-4",
    title:
      "4. Isikan data diri anda sesuai dengan formulir pada bagian register. Periksa kembali data anda dan pastikan anda mencatat atau menyimpan password yang anda buat. Jika sudah benar klik Register",
    image: "/images/toga-step-4.png",
    alt: "Langkah keempat pemesanan toga",
  },
  {
    id: "step-5",
    title:
      "5. Jika muncul pop up atau pemberitahuan seperti gambar di samping klik ok apabila data sudah benar",
    image: "/images/toga-step-5.png",
    alt: "Langkah kelima pemesanan toga",
  },
];

export default function TogaKopmaPage() {
  return (
    <>
      <JsonLd data={togaSchema} />
      <JsonLd data={togaProductSchema} />
      <JsonLd data={togaFaqSchema} />
      <Navbar />

      <main className="toga-page toga-page--flush">
        <section className="toga-hero">
          <div className="toga-hero__inner">
            <div className="toga-hero__text">
              <h1 className="toga-hero__title">TOGA</h1>

              <a
                href="#toga-services"
                className="toga-hero__cta"
                aria-label="Lihat layanan toga"
              >
                <span>Hubungi Kami</span>
                <span className="toga-hero__cta-icon">➜</span>
              </a>
            </div>
          </div>

          <div className="toga-hero__logo-badge" aria-hidden="true">
            <Image
              src="/images/toga-logo.png"
              alt="Logo Toga KOPMA"
              width={180}
              height={180}
              className="toga-hero__logo-image"
              priority
            />
          </div>

          <div className="toga-hero__curve" aria-hidden="true">
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

        <section className="toga-services" id="toga-services">
          <div className="toga-services__inner">
            <h2 className="toga-section-title">Our Service</h2>

            <div className="toga-services__grid">
              {serviceItems.map((item) => (
                <article key={item.id} className="toga-service-card">
                  <div className="toga-service-card__image-wrap">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={260}
                      height={260}
                      className="toga-service-card__image"
                    />
                  </div>
                  <h3 className="toga-service-card__title">{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="toga-products">
          <div className="toga-products__inner">
            <h2 className="toga-section-title">Our Product</h2>

            <div className="toga-products__grid">
              {productItems.map((item) => (
                <article key={item.id} className="toga-product-card">
                  <h3 className="toga-product-card__title">{item.title}</h3>
                  <p className="toga-product-card__subtitle">{item.subtitle}</p>

                  <div className="toga-product-card__image-wrap">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={260}
                      height={260}
                      className="toga-product-card__image"
                    />
                  </div>

                  {item.buttonText && (
                    <a
                      href={item.buttonHref}
                      className="toga-product-card__button"
                      aria-label={`${item.buttonText} untuk ${item.title}`}
                    >
                      {item.buttonText}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="toga-order">
          <div className="toga-order__inner">
            <h2 className="toga-section-title toga-section-title--white">
              How To Order?
            </h2>

            <div className="toga-order__steps">
              {steps.map((step, index) => (
                <article key={step.id} className="toga-order-card">
                  <h3 className="toga-order-card__title">{step.title}</h3>

                  <div className="toga-order-card__image-wrap">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={900}
                      height={500}
                      className="toga-order-card__image"
                    />
                  </div>

                  {index === 0 && (
                    <a
                      href="#"
                      className="toga-order-card__button"
                      aria-label="Pesan toga sekarang"
                    >
                      {step.buttonText}
                    </a>
                  )}
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