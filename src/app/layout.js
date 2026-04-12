import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.kopma-unnes.com"),
  title: {
    default: "KOPMA UNNES",
    template: "%s | KOPMA UNNES",
  },
  description:
    "Website resmi KOPMA UNNES yang berisi informasi profil, struktur organisasi, keanggotaan, acara, dan inventaris.",
  icons: {
    icon: "/images/logo-kopma.png",
    shortcut: "/images/logo-kopma.png",
    apple: "/images/logo-kopma.png",
  },
  openGraph: {
    title: "KOPMA UNNES",
    description:
      "Website resmi KOPMA UNNES yang berisi informasi profil, struktur organisasi, keanggotaan, acara, dan inventaris.",
    url: "https://www.kopma-unnes.com",
    siteName: "KOPMA UNNES",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/logo-kopma.png",
        width: 512,
        height: 512,
        alt: "Logo KOPMA UNNES",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "KOPMA UNNES",
    description:
      "Website resmi KOPMA UNNES yang berisi informasi profil, struktur organisasi, keanggotaan, acara, dan inventaris.",
    images: ["/images/logo-kopma.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}