"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";

const MagazineFlipbookBook = dynamic(
  () => import("./MagazineFlipbookBook"),
  { ssr: false }
);

export default function MagazineFlipbookViewer({ id }) {
  const [magazine, setMagazine] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDetail() {
      try {
        setError("");

        const res = await fetch(`/api/magazines/${id}`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        setMagazine({
          ...data,
          viewerPdfUrl: `/api/magazines/${id}/file`,
          downloadPdfUrl: `/api/magazines/${id}/file`,
        });
      } catch (err) {
        console.error("[MagazineFlipbookViewer] Gagal memuat detail:", err);
        setError("Gagal memuat detail magazine.");
      }
    }

    if (id) loadDetail();
  }, [id]);

  if (error) {
    return (
      <section className="mag-viewer">
        <div className="mag-viewer__header">
          <h1 className="mag-viewer__title">Magazine</h1>
        </div>
        <p className="mag-viewer__status">{error}</p>
      </section>
    );
  }

  if (!magazine) {
    return (
      <section className="mag-viewer">
        <div className="mag-viewer__header">
          <h1 className="mag-viewer__title">Memuat Magazine...</h1>
        </div>
        <p className="mag-viewer__status">Menyiapkan data...</p>
      </section>
    );
  }

  const title = magazine.title || "Magazine";

  return (
    <section className="mag-viewer">
      <div className="mag-viewer__header">
        <h1 className="mag-viewer__title">{title}</h1>
      </div>

      <div className="mag-viewer__frame">
        <MagazineFlipbookBook pdfUrl={magazine.viewerPdfUrl} />
      </div>

      <div className="mag-viewer__toolbar">
        <div className="mag-viewer__actions">
          <Link
            href="/keanggotaan"
            className="mag-viewer__button mag-viewer__button--ghost"
          >
            Kembali
          </Link>

          <a
            href={magazine.downloadPdfUrl}
            download
            className="mag-viewer__button mag-viewer__button--solid"
          >
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
