"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function sanitizeUrl(url) {
  if (!url || typeof url !== "string") return "#";
  const t = url.trim();
  if (/^(javascript|data|vbscript):/i.test(t)) return "#";
  if (!/^(https?:\/\/|\/|#)/i.test(t)) return "#";
  return t;
}

export default function MagazineCard({
  id,
  title,
  subtitle,
  previewImage,
  pdfUrl,
  index = 0,
}) {
  const safePdfUrl = sanitizeUrl(pdfUrl);

  const previewPdfUrl = useMemo(() => {
    if (id) return `/api/magazines/${id}/file`;
    return safePdfUrl;
  }, [id, safePdfUrl]);

  return (
    <article
      className="mag-card"
      style={{ animationDelay: `${index * 120}ms` }}
      aria-label={`Majalah: ${title}`}
    >
      <div className="mag-card__cover">
        {previewPdfUrl && previewPdfUrl !== "#" ? (
          <div className="mag-card__pdf-preview" aria-hidden="true">
            <Document
              file={previewPdfUrl}
              loading={
                <div className="mag-card__cover-empty" aria-hidden="true">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="1.2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
              }
              error={
                <div className="mag-card__cover-empty" aria-hidden="true">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="1.2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
              }
            >
              <Page
                pageNumber={1}
                width={260}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mag-card__pdf-page"
              />
            </Document>
          </div>
        ) : (
          <div className="mag-card__cover-empty" aria-hidden="true">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="1.2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        )}
      </div>

      <div className="mag-card__footer">
        <h3 className="mag-card__title">{title}</h3>

        <div className="mag-card__actions">
          <Link
            href={`/keanggotaan/${id}`}
            className="mag-btn mag-btn--read"
            aria-label={`Baca selengkapnya ${title}`}
          >
            <span>
              Baca
              <br />
              Selengkapnya
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <polyline points="12 8 16 12 12 16" />
            </svg>
          </Link>

          <a
            href={safePdfUrl}
            download
            className="mag-btn mag-btn--download"
            aria-label={`Download ${title}`}
          >
            <span>
              Download
              <br />
              Majalah
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M12 7v6M9 11l3 3 3-3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}