"use client";
import dynamic from "next/dynamic";

const MagazineSection = dynamic(
  () => import("../../components/MagazineSection"),
  { ssr: false }
);

export default function MagazineSectionWrapper() {
  return <MagazineSection />;
}
