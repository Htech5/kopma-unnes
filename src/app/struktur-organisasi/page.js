import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import KartuAnggota from "../../components/KartuAnggota";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Struktur Organisasi KOPMA UNNES – Pengurus & Pengawas 2025",
  description:
    "Kenali pengurus dan pengawas KOPMA UNNES periode 2025: Direktur Utama, Bidang Keuangan, PSDA, Usaha, Media & Humas, dan seluruh jajaran kepala divisi.",
  keywords: [
    "struktur organisasi KOPMA UNNES",
    "pengurus KOPMA UNNES 2025",
    "pengawas KOPMA UNNES",
  ],
  openGraph: {
    title: "Struktur Organisasi KOPMA UNNES – Pengurus & Pengawas 2025",
    description:
      "Daftar lengkap pengurus dan pengawas KOPMA UNNES periode 2025, dari Direktur Utama hingga kepala divisi.",
    url: "https://ukmkopmaunnes.com/struktur-organisasi",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://ukmkopmaunnes.com/images/logo-kopma.png",
        width: 1200,
        height: 630,
        alt: "Struktur Organisasi KOPMA UNNES 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Struktur Organisasi KOPMA UNNES 2025",
    description:
      "Daftar lengkap pengurus dan pengawas KOPMA UNNES periode 2025.",
    images: ["https://ukmkopmaunnes.com/images/logo-kopma.png"],
  },
  alternates: {
    canonical: "https://ukmkopmaunnes.com/struktur-organisasi",
  },
};

const strukturSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pengurus & Pengawas KOPMA UNNES Tahun 2025",
  description:
    "Daftar lengkap pengurus dan pengawas KOPMA UNNES periode 2025, mencakup Direktur Utama, Pengawas, Administrasi Umum, Keuangan, PSDA, Usaha, dan Media & Humas.",
  url: "https://ukmkopmaunnes.com/struktur-organisasi",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ukmkopmaunnes.com" },
      { "@type": "ListItem", position: 2, name: "Profil", item: "https://ukmkopmaunnes.com/profil" },
      { "@type": "ListItem", position: 3, name: "Struktur Organisasi", item: "https://ukmkopmaunnes.com/struktur-organisasi" },
    ],
  },
  mainEntity: {
    "@type": "Organization",
    name: "KOPMA UNNES",
    url: "https://ukmkopmaunnes.com",
    member: [
      { "@type": "OrganizationRole", roleName: "Direktur Utama", member: { "@type": "Person", name: "Angel Lintang Syari" } },
      { "@type": "OrganizationRole", roleName: "Wakil Direktur Utama", member: { "@type": "Person", name: "Rafly Andira Siswoyo" } },
      { "@type": "OrganizationRole", roleName: "Ketua Pengawas", member: { "@type": "Person", name: "Ana Auliya Nadifa" } },
      { "@type": "OrganizationRole", roleName: "Pengawas", member: { "@type": "Person", name: "Shelly Selvianne" } },
      { "@type": "OrganizationRole", roleName: "Pengawas", member: { "@type": "Person", name: "Atika Nur Khayati" } },
      { "@type": "OrganizationRole", roleName: "Kepala Bidang Administrasi Umum", member: { "@type": "Person", name: "Tamara Agny Naily Siffa" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Administrasi Umum", member: { "@type": "Person", name: "Husna Ami Amaliah" } },
      { "@type": "OrganizationRole", roleName: "Kepala Bidang Keuangan", member: { "@type": "Person", name: "Zahra Zahira Triadmojo" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Keuangan Organisasi", member: { "@type": "Person", name: "Alfian Rofi Sasmito" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Keuangan Usaha", member: { "@type": "Person", name: "Khilyatu Octaviana Ramadhani" } },
      { "@type": "OrganizationRole", roleName: "Kepala Bidang PSDA", member: { "@type": "Person", name: "Dian Rahma Octavia" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Pendidikan", member: { "@type": "Person", name: "Rantika" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Keanggotaan", member: { "@type": "Person", name: "Setiana Diah Puspitawati" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Pengkaderan", member: { "@type": "Person", name: "Mei Nur Safitri" } },
      { "@type": "OrganizationRole", roleName: "Kepala Bidang Usaha", member: { "@type": "Person", name: "Ranti Ratnasari" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi KWS", member: { "@type": "Person", name: "Luqyana Nur Hafizah" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Kopmart", member: { "@type": "Person", name: "Ramadani Maylafaza" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Toga", member: { "@type": "Person", name: "Linda Ismawati" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi JNE", member: { "@type": "Person", name: "Cicha Kartikha" } },
      { "@type": "OrganizationRole", roleName: "Kepala Bidang Media & Humas", member: { "@type": "Person", name: "Faulita Ulul Azmia" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Media", member: { "@type": "Person", name: "Dita Isna Maulida Khulwa" } },
      { "@type": "OrganizationRole", roleName: "Kepala Divisi Humas", member: { "@type": "Person", name: "Aurellia Fahmida A." } },
    ],
  },
};

const strukturOrganisasi = [
  {
    id: "direksi",
    judul: "Direktur Utama & Wakil Direktur Utama",
    baris: [
      [
        { jabatan: "Direktur Utama", nama: "Angel Lintang Syari", foto: "/images/Angel Lintang Syari _ Direktur Utama.JPG" },
        { jabatan: "Wakil Direktur Utama", nama: "Rafly Andira Siswoyo", foto: "/images/Rafly Andira Siswoyo_Wakil Direktur Utama.JPG" },
      ],
    ],
  },
  {
    id: "pengawas",
    judul: "Pengawas",
    baris: [
      [
        { jabatan: "Ketua Pengawas", nama: "Ana Auliya Nadifa", foto: "/images/Ana Auliya Nadifa_Ketua Pengawas.jpg" },
      ],
      [
        { jabatan: "Pengawas", nama: "Shelly Selvianne", foto: "/images/Shelly Selvianne_Anggota Pengawas.JPG" },
        { jabatan: "Pengawas", nama: "Atika Nur Khayati", foto: "/images/Atika Nur Khayati_Anggota Pengawas.jpg" },
      ],
    ],
  },
  {
    id: "adm-umum",
    judul: "Administrasi Umum",
    baris: [
      [
        { jabatan: "Kepala Bidang  Administrasi Umum", nama: "Tamara Agny Naily Siffa", foto: "/images/Tamara Agny Naily Siffa_Kepala Bidang Administrasi Umum.JPG" },
        { jabatan: "Kepala Divisi Administrasi Umum", nama: "Husna Ami Amaliah", foto: "/images/Husna Ami Amaliah_Kepala Divisi Administrasi Umum.JPG" },
      ],
    ],
  },
  {
    id: "keuangan",
    judul: "Keuangan",
    baris: [
      [
        { jabatan: "Kepala Bidang Keuangan", nama: "Zahra Zahira Triadmojo", foto: "/images/Zahra Zahira Triadmojo_Kepala Bidang Keuangan.JPG" },
      ],
      [
        { jabatan: "Kepala Divisi Keuangan Organisasi", nama: "Alfian Rofi Sasmito", foto: "/images/Alfian Rofi Sasmito_Kepala Divisi Keuangan Organisasi.JPG" },
        { jabatan: "Kepala Divisi Keuangan Usaha", nama: "Khilyatu Octaviana Ramadhani", foto: "/images/Khilyatu Octaviana Ramadhani _Kepala Divisi Keuangan Usaha .JPG" },
      ],
    ],
  },
  {
    id: "psda",
    judul: "Pengembangan Sumber Daya Anggota (PSDA)",
    baris: [
      [
        { jabatan: "Kepala Bidang PSDA", nama: "Dian Rahma Octavia", foto: "/images/Dian Rahma Octavia_Kepala Bidang PSDA.JPG" },
      ],
      [
        { jabatan: "Kepala Divisi Pendidikan", nama: "Rantika", foto: "/images/Rantika_Kepala Divisi Pendidikan.JPG" },
        { jabatan: "Kepala Divisi Keanggotaan", nama: "Setiana Diah Puspitawati", foto: "/images/Setiana Diah Puspitawati_Kepala Divisi Keanggotaan.JPG" },
        { jabatan: "Kepala Divisi Pengkaderan", nama: "Mei Nur Safitri", foto: "/images/Mei Nur Safitri_Kepala Divisi Pengkaderan.jpg" },
      ],
    ],
  },
  {
    id: "usaha",
    judul: "Usaha",
    baris: [
      [
        { jabatan: "Kepala Bidang Usaha", nama: "Ranti Ratnasari", foto: "/images/Ranti Ratnasari_Kepala Bidang Usaha.JPG" },
      ],
      [
        { jabatan: "Kepala Divisi KWS", nama: "Luqyana Nur Hafizah", foto: "/images/Luqyana Nur Hafizah_Kepala Divisi KWS.jpg" },
        { jabatan: "Kepala Divisi Kopmart", nama: "Ramadani Maylafaza", foto: "/images/Ramadani Maylafaza_Kepala Divisi Kopmart.jpeg" },
      ],
      [
        { jabatan: "Kepala Divisi Toga", nama: "Linda Ismawati", foto: "/images/Linda Ismawati_Kepala Divisi Toga.jpeg" },
        { jabatan: "Kepala Divisi JNE", nama: "Cicha Kartikha", foto: "/images/Cicha Kartikha_Kepala Divisi JNE.JPG" },
      ],
    ],
  },
  {
    id: "medhum",
    judul: "Media dan Humas",
    baris: [
      [
        { jabatan: "Kepala Bidang Media & Humas", nama: "Faulita Ulul Azmia", foto: "/images/Faulita Ulul Azmia_Kepala Bidang Media dan Humas.JPG" },
      ],
      [
        { jabatan: "Kepala Divisi Media", nama: "Dita Isna Maulida Khulwa", foto: "/images/Dita Isna Maulida Khulwa_Kepala Divisi Media.jpg" },
        { jabatan: "Kepala Divisi Humas", nama: "Aurellia Fahmida A.", foto: "/images/Aurellia Fahmida A._Kepala Divisi Humas.jpg" },
      ],
    ],
  },
];

function SeksiBidang({ judul, baris }) {
  return (
    <div className="so-seksi">
      <h2 className="so-seksi__judul">{judul}</h2>
      <div className="so-seksi__konten">
        {baris.map((barisList, idxBaris) => (
          <div key={idxBaris} className={`so-baris so-baris--${barisList.length}`}>
            {barisList.map((anggota, idxAnggota) => (
              <KartuAnggota key={idxAnggota} {...anggota} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StrukturOrganisasiPage() {
  return (
    <>
      <JsonLd data={strukturSchema} />
      <Navbar />
      <main className="so-page--flush">
        <section className="so-page">
          <div className="so-page__header">
            <h1 className="so-page__judul">
              Pengurus &amp; Pengawas
              <br />
              KOPMA UNNES Tahun 2025
            </h1>
          </div>

          <div className="so-kontainer">
            {strukturOrganisasi.map((bidang) => (
              <SeksiBidang key={bidang.id} judul={bidang.judul} baris={bidang.baris} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}