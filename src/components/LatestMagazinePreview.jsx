"use client";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function LatestMagazinePreview({ id }) {
  const pdfUrl = `/api/magazines/${id}/file`;

  return (
    <div className="utama-magazine__pdf-preview" aria-hidden="true">
      <Document
        file={pdfUrl}
        loading={<div className="utama-magazine__loading-cover" />}
        error={<div className="utama-magazine__loading-cover" />}
      >
        <Page
          pageNumber={1}
          width={250}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="utama-magazine__pdf-page"
        />
      </Document>
    </div>
  );
}
