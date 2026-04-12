"use client";

import dynamic from "next/dynamic";

const MagazineFlipbookViewer = dynamic(
  () => import("../../../components/MagazineFlipbookViewer"),
  { ssr: false }
);

export default function MagazineViewerWrapper({ id }) {
  return <MagazineFlipbookViewer id={id} />;
}
