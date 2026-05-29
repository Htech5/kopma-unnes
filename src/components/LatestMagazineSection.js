"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LatestMagazinePreview = dynamic(
  () => import("./LatestMagazinePreview"),
  { ssr: false }
);

export default function LatestMagazineSection() {
  const [magazine, setMagazine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestMagazine() {
      try {
        setIsLoading(true);

        const response = await fetch("/api/latest-magazine", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Request gagal dengan status ${response.status}`);
        }

        const data = await response.json();

        if (!isMounted) return;

        setMagazine({
          id: data.id,
          title: data.title.trim(),
        });
      } catch (error) {
        console.error("Gagal mengambil data latest magazine:", error);
        setMagazine(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLatestMagazine();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="utama-magazine" aria-labelledby="utama-magazine-title">
      <div className="utama-magazine__card">
        {isLoading || !magazine ? (
          <div className="utama-magazine__loading" role="status" aria-live="polite">
            <div className="utama-magazine__loading-cover" />

            <div className="utama-magazine__loading-content">
              <p className="utama-magazine__eyebrow">Our Latest Magazine</p>

              <div className="utama-magazine__loading-line utama-magazine__loading-line--title" />
              <div className="utama-magazine__loading-line utama-magazine__loading-line--title-short" />

              <div className="utama-magazine__actions">
                <button
                  type="button"
                  className="utama-magazine__button utama-magazine__button--outline"
                  aria-disabled="true"
                >
                  Baca Selengkapnya
                </button>

                <button
                  type="button"
                  className="utama-magazine__button utama-magazine__button--download"
                  aria-disabled="true"
                >
                  Download Majalah
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="utama-magazine__cover">
              <div className="utama-magazine__cover-inner">
                <LatestMagazinePreview id={magazine.id} />
              </div>
            </div>

            <div className="utama-magazine__content">
              <p className="utama-magazine__eyebrow">Our Latest Magazine</p>

              <h2 id="utama-magazine-title" className="utama-magazine__title">
                {magazine.title}
              </h2>

              <div className="utama-magazine__actions">
                <Link
                  href="/keanggotaan"
                  className="utama-magazine__button utama-magazine__button--outline"
                >
                  Baca Selengkapnya
                </Link>

                <Link
                  href={`/api/magazines/${magazine.id}/file`}
                  className="utama-magazine__button utama-magazine__button--download"
                >
                  Download Majalah
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
