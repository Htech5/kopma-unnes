"use client";

import JsonLd from "@/components/JsonLd";
import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";

const acaraSchema = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "Acara KOPMA UNNES",
  description:
    "Daftar kegiatan dan acara resmi KOPMA UNNES – Koperasi Mahasiswa Universitas Negeri Semarang.",
  url: "https://ukmkopmaunnes.com/acara",
  organizer: {
    "@type": "Organization",
    name: "KOPMA UNNES",
    url: "https://ukmkopmaunnes.com",
    telephone: "+6282146734835",
    email: "kopmaunnes@gmail.com",
    sameAs: [
      "https://www.instagram.com/kopmaunnes/",
      "https://www.facebook.com/profile.php?id=100064372937687",
      "https://www.youtube.com/@kopmaunnes6978",
      "https://www.tiktok.com/@kopmaunnes",
    ],
  },
  location: {
    "@type": "Place",
    name: "Kampus Universitas Negeri Semarang",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Semarang",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ukmkopmaunnes.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Acara",
        item: "https://ukmkopmaunnes.com/acara",
      },
    ],
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const PER_PAGE = 6;

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "");
}

function toImageUrl(path = "") {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (!API_URL) {
    return path;
  }

  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function SkeletonCard() {
  return (
    <div className="acara-card acara-card--skeleton" aria-hidden="true">
      <div className="acara-card__img-wrap acara-card__img-wrap--skel" />
      <div className="acara-card__body">
        <div className="acara-skel-line acara-skel-line--h" />
        <div className="acara-skel-line acara-skel-line--h acara-skel-line--70" />
        <div className="acara-skel-line" style={{ marginTop: 6 }} />
        <div className="acara-skel-line" />
        <div className="acara-skel-line acara-skel-line--60" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="acara-state acara-state--empty">
      <span className="acara-state__icon">📅</span>
      <p className="acara-state__msg">Belum ada acara yang tersedia.</p>
    </div>
  );
}

function AcaraCard({ item }) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = toImageUrl(item.foto);
  const excerpt =
    item.ringkasan ||
    `${stripHtml(item.isi || "").slice(0, 160).trimEnd()}…`;

  return (
    <Link href={`/acara/${item.id}`} className="acara-card">
      <div className="acara-card__img-wrap">
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={item.judul || "Thumbnail acara"}
            fill
            className="acara-card__img"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="acara-card__img-placeholder">
            <span>📅</span>
          </div>
        )}
      </div>

      <div className="acara-card__body">
        <h2 className="acara-card__title">{item.judul}</h2>
        <p className="acara-card__excerpt">{excerpt}</p>
      </div>
    </Link>
  );
}

export default function AcaraPageClient() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = useCallback(async (p) => {
    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/api/acara?page=${p}&limit=${PER_PAGE}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();

      const list = Array.isArray(json) ? json : json.data ?? json.items ?? [];
      const total =
        json.totalPages ??
        (json.total ? Math.ceil(json.total / PER_PAGE) : 1);

      setItems(list);
      setTotalPages(total);
      setStatus("success");
    } catch (err) {
      console.error("[AcaraPage] fetch error:", err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load(page);
  }, [load, page]);

  const goTo = (n) => {
    if (n < 1 || n > totalPages) return;
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <JsonLd data={acaraSchema} />
      <Navbar />

      <main className="acara-page keanggotaan-page--flush">
        <section>
          <div className="acara-section__inner">
            <header className="acara-section__header">
              <h1 className="acara-section__heading">Acara Kopma Unnes</h1>
            </header>

            {status === "success" && items.length === 0 && <EmptyState />}

            {status === "loading" && (
              <div className="acara-grid">
                {Array.from({ length: PER_PAGE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {status === "success" && items.length > 0 && (
              <>
                <div className="acara-grid">
                  {items.map((item) => (
                    <AcaraCard key={item.id} item={item} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className="acara-pagination" aria-label="Navigasi halaman">
                    <button
                      className="acara-pagination__arrow"
                      onClick={() => goTo(page - 1)}
                      disabled={page === 1}
                      aria-label="Halaman sebelumnya"
                    >
                      ←
                    </button>

                    <div className="acara-pagination__dots" role="list">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          role="listitem"
                          className={`acara-pagination__dot${
                            page === i + 1 ? " is-active" : ""
                          }`}
                          onClick={() => goTo(i + 1)}
                          aria-label={`Halaman ${i + 1}`}
                          aria-current={page === i + 1 ? "page" : undefined}
                        />
                      ))}
                    </div>

                    <button
                      className="acara-pagination__arrow"
                      onClick={() => goTo(page + 1)}
                      disabled={page === totalPages}
                      aria-label="Halaman berikutnya"
                    >
                      →
                    </button>
                  </nav>
                )}
              </>
            )}

            {status === "error" && (
              <div className="acara-state acara-state--error">
                <span className="acara-state__icon">⚠️</span>
                <p className="acara-state__msg">Gagal memuat acara.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
