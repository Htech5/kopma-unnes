"use client";

import { useState } from "react";

export default function MagazineFlipbookBook({ pdfUrl }) {
  const [viewMode, setViewMode] = useState("book");

  if (!pdfUrl) {
    return (
      <div className="mag-viewer__book-wrap">
        <p className="mag-viewer__status">PDF tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="mag-viewer__book-wrap">
      <div className="mag-litebook">
        <div className="mag-litebook__toolbar">
          <button
            type="button"
            className={`mag-litebook__btn${viewMode === "book" ? " is-active" : ""}`}
            onClick={() => setViewMode("book")}
          >
            Mode Buku
          </button>

          <button
            type="button"
            className={`mag-litebook__btn${viewMode === "full" ? " is-active" : ""}`}
            onClick={() => setViewMode("full")}
          >
            Area Lebar
          </button>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mag-litebook__btn mag-litebook__btn--link"
          >
            Buka PDF
          </a>
        </div>

        <div
          className={`mag-litebook__frame ${
            viewMode === "book"
              ? "mag-litebook__frame--book"
              : "mag-litebook__frame--full"
          }`}
        >
          <div className="mag-litebook__spine" aria-hidden="true" />
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Magazine PDF Viewer"
            className="mag-litebook__iframe"
          />
        </div>
      </div>
    </div>
  );
}
