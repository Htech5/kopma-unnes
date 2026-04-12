"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

export default function MagazineFlipbookBook({ pdfUrl }) {
  const [numPages, setNumPages] = useState(0);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [bookWidth, setBookWidth] = useState(300);
  const [bookHeight, setBookHeight] = useState(424);

  const flipBookRef = useRef(null);

  useEffect(() => {
    // Pindah ke sini agar hanya jalan di browser
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setBookWidth(180);
        setBookHeight(255);
      } else if (window.innerWidth <= 900) {
        setBookWidth(220);
        setBookHeight(312);
      } else if (window.innerWidth <= 1200) {
        setBookWidth(260);
        setBookHeight(368);
      } else {
        setBookWidth(300);
        setBookHeight(424);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = useMemo(
    () => Array.from({ length: numPages }, (_, index) => index + 1),
    [numPages]
  );

  const totalSpreads = Math.ceil(numPages / 2);

  const handlePrev = () => {
    const pageFlip = flipBookRef.current?.pageFlip();
    if (pageFlip) pageFlip.flipPrev();
  };

  const handleNext = () => {
    const pageFlip = flipBookRef.current?.pageFlip();
    if (pageFlip) pageFlip.flipNext();
  };

  return (
    <div className="mag-viewer__book-wrap">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          setCurrentSpread(0);
        }}
        loading={<p className="mag-viewer__status">Memuat PDF...</p>}
        error={<p className="mag-viewer__status">Gagal memuat PDF.</p>}
      >
        {numPages > 0 && (
          <>
            <div className="mag-viewer__book-shell">
              <button
                type="button"
                className="mag-viewer__nav mag-viewer__nav--prev"
                onClick={handlePrev}
                aria-label="Halaman sebelumnya"
              >
                &#10094;
              </button>

              <div className="mag-viewer__book-stage">
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={bookWidth}
                  height={bookHeight}
                  minWidth={180}
                  maxWidth={300}
                  minHeight={255}
                  maxHeight={424}
                  size="fixed"
                  drawShadow={true}
                  flippingTime={700}
                  usePortrait={true}
                  startPage={0}
                  startZIndex={1}
                  autoSize={false}
                  maxShadowOpacity={0.35}
                  showCover={true}
                  mobileScrollSupport={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                  className="mag-viewer__book"
                  onFlip={(e) => {
                    setCurrentSpread(e.data);
                  }}
                >
                  {pages.map((pageNumber) => (
                    <div className="mag-viewer__page" key={pageNumber}>
                      <Page
                        pageNumber={pageNumber}
                        width={bookWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              </div>

              <button
                type="button"
                className="mag-viewer__nav mag-viewer__nav--next"
                onClick={handleNext}
                aria-label="Halaman berikutnya"
              >
                &#10095;
              </button>
            </div>

            <div className="mag-viewer__meta">
              <span>
                {Math.min(currentSpread + 1, totalSpreads)}/{totalSpreads} spread
              </span>
            </div>
          </>
        )}
      </Document>
    </div>
  );
}
