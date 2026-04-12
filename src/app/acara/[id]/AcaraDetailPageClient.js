"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import CommentSection from "../../../components/CommentSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function DetailSkeleton() {
  return (
    <>
      <div
        className="acara-detail__img-wrap acara-detail__img-skel"
        aria-hidden="true"
      />
      <div className="acara-detail__content">
        <div
          className="acara-skel-line acara-skel-line--h"
          style={{ height: 28, marginBottom: 8 }}
        />
        <div
          className="acara-skel-line acara-skel-line--h acara-skel-line--60"
          style={{ height: 28, marginBottom: 24 }}
        />
        {[100, 100, 100, 80, 100, 100, 65].map((w, i) => (
          <div
            key={i}
            className="acara-skel-line"
            style={{ width: `${w}%`, marginBottom: 10 }}
          />
        ))}
      </div>
    </>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="acara-state acara-state--error" style={{ minHeight: 320 }}>
      <span className="acara-state__icon">⚠️</span>
      <p className="acara-state__msg">Gagal memuat artikel.</p>
      <p className="acara-state__sub">Periksa koneksi dan coba lagi.</p>
      <button className="acara-state__btn" onClick={onRetry}>
        Coba Lagi
      </button>
    </div>
  );
}

export default function AcaraDetailPageClient({ id }) {
  const [article, setArticle] = useState(null);
  const [prevArt, setPrev] = useState(null);
  const [nextArt, setNext] = useState(null);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    if (!id) return;

    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/acara/${id}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();

      setArticle(json.article ?? json);
      setPrev(json.prev ?? null);
      setNext(json.next ?? null);
      setStatus("success");
    } catch (err) {
      console.error("[AcaraDetail] fetch error:", err);
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const formatDate = (str) => {
    if (!str) return null;
    return new Date(str).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      <main className="acara-page keanggotaan-page--flush">
        <div className="acara-detail-wrap">
          {status === "loading" && <DetailSkeleton />}
          {status === "error" && <ErrorState onRetry={load} />}

          {status === "success" && article && (
            <>
              <article className="acara-detail">
                {article.foto && (
                  <div className="acara-detail__img-wrap">
                    <Image
                      src={article.foto}
                      alt={article.judul}
                      fill
                      priority
                      unoptimized
                      className="acara-detail__img"
                    />
                  </div>
                )}

                <div className="acara-detail__content">
                  <h1 className="acara-detail__title">{article.judul}</h1>

                  {article.tanggal && (
                    <p className="acara-detail__date">
                      {formatDate(article.tanggal)}
                    </p>
                  )}

                  <div
                    className="acara-detail__body"
                    dangerouslySetInnerHTML={{ __html: article.isi }}
                  />

                  <nav
                    className="acara-detail__nav"
                    aria-label="Navigasi artikel"
                  >
                    {prevArt ? (
                      <Link
                        href={`/acara/${prevArt.id}`}
                        className="acara-detail__nav-btn acara-detail__nav-btn--prev"
                      >
                        <span className="acara-detail__nav-icon">←</span>
                        Sebelumnya
                      </Link>
                    ) : (
                      <span />
                    )}

                    {nextArt ? (
                      <Link
                        href={`/acara/${nextArt.id}`}
                        className="acara-detail__nav-btn acara-detail__nav-btn--next"
                      >
                        Selanjutnya
                        <span className="acara-detail__nav-icon">→</span>
                      </Link>
                    ) : (
                      <span />
                    )}
                  </nav>
                </div>
              </article>

              <CommentSection articleId={article.id} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}