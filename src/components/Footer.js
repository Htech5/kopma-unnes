import {
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

// TikTok icon (tidak tersedia di lucide-react, pakai SVG custom)
function TikTokIcon({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  );
}

const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/6282146734835",
  email: "mailto:kopmaunnes@gmail.com",
  instagram: "https://www.instagram.com/kopmaunnes/",
  facebook: "https://www.facebook.com/profile.php?id=100064372937687",
  youtube: "https://www.youtube.com/@kopmaunnes6978",
  tiktok: "https://www.tiktok.com/@kopmaunnes",
  maps: "https://www.google.com/maps?q=Gedung+Kewirausahaan+UNNES+Semarang",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Footer KOPMA UNNES">
      <div className="footer-map-wrapper">
        <iframe
          className="footer-map"
          title="Lokasi Gedung Kewirausahaan UNNES"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30604.87847689254!2d110.35649287431639!3d-7.049082999999982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bdb3f16b527%3A0x83bbd542f84cd009!2sGedung%20Kewirausahaan%20UNNES!5e1!3m2!1sen!2sus!4v1774027440111!5m2!1sen!2sus"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="footer-bottom">
        <div className="footer-social-card" aria-label="Kontak dan media sosial">
          {/* WhatsApp — paling kiri, link kosong */}
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp KOPMA UNNES"
            className="footer-social-link footer-social-fill"
          >
            <MessageCircle size={26} strokeWidth={2.2} />
          </a>

          <a
            href={SOCIAL_LINKS.email}
            aria-label="Email KOPMA UNNES"
            className="footer-social-link footer-social-fill"
          >
            <Mail size={26} strokeWidth={2.2} />
          </a>

          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram KOPMA UNNES"
            className="footer-social-link footer-social-fill"
          >
            <Instagram size={26} strokeWidth={2.2} />
          </a>

          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook KOPMA UNNES"
            className="footer-social-link footer-social-fill"
          >
            <Facebook size={26} strokeWidth={2.2} />
          </a>

          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube KOPMA UNNES"
            className="footer-social-link footer-social-fill"
          >
            <Youtube size={26} strokeWidth={2.2} />
          </a>

          {/* TikTok — baru */}
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok KOPMA UNNES"
            className="footer-social-link footer-social-fill"
          >
            <TikTokIcon size={26} />
          </a>
        </div>

        <p className="footer-copy">
          Copyright © {currentYear} KOPMA UNNES - All rights reserved.
        </p>
      </div>
    </footer>
  );
}