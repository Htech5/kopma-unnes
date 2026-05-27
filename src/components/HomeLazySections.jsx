"use client";

import dynamic from "next/dynamic";
import LazySection from "./LazySection";

const LatestMagazineSection = dynamic(
  () => import("./LatestMagazineSection"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: 400 }} />,
  }
);

const StatistikSection = dynamic(() => import("./StatistikSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 300 }} />,
});

const PeranKamiSection = dynamic(() => import("./PeranKamiSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 400 }} />,
});

const UnitUsahaSection = dynamic(() => import("./UnitUsahaSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 400 }} />,
});

export default function HomeLazySections() {
  return (
    <>
      <LazySection minHeight={400}>
        <LatestMagazineSection />
      </LazySection>

      <LazySection minHeight={300}>
        <StatistikSection />
      </LazySection>

      <LazySection minHeight={400}>
        <PeranKamiSection />
      </LazySection>

      <LazySection minHeight={400}>
        <UnitUsahaSection />
      </LazySection>
    </>
  );
}
