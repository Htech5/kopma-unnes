"use client";

export default function MagazineFlipbookBook({ pdfUrl }) {
  return (
    <div className="mag-viewer__book-wrap">
      <div
        style={{
          width: "100%",
          height: "80vh",
          minHeight: "600px",
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <iframe
          src={pdfUrl}
          title="Magazine PDF Viewer"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}
