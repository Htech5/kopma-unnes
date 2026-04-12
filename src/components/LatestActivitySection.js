"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AUTO_SLIDE_MS = 4000;

function isSafeImageUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export default function LatestActivitySection() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestActivities() {
      try {
        setIsLoading(true);

        const response = await fetch("/api/latest-activity", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request gagal dengan status ${response.status}`);
        }

        const data = await response.json();

        if (!isMounted) return;

        if (!Array.isArray(data)) {
          throw new Error("Response API latest activity harus berupa array.");
        }

        const cleanData = data
          .filter((item) => {
            return (
              item &&
              typeof item === "object" &&
              typeof item.id !== "undefined" &&
              typeof item.title === "string" &&
              item.title.trim() &&
              isSafeImageUrl(item.imageUrl)
            );
          })
          .map((item) => ({
            id: item.id,
            title: item.title.trim(),
            imageUrl: item.imageUrl,
          }));

        setActivities(cleanData);
      } catch (error) {
        console.error("Gagal mengambil data latest activity:", error);
        setActivities([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLatestActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (activities.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(interval);
  }, [activities]);

  const currentActivity = useMemo(() => {
    if (!activities.length) return null;
    return activities[currentIndex];
  }, [activities, currentIndex]);

  function goNext() {
    if (activities.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activities.length);
  }

  function goPrev() {
    if (activities.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activities.length) % activities.length);
  }

  function goTo(index) {
    setCurrentIndex(index);
  }

  return (
    <section className="utama-activity" aria-labelledby="utama-activity-title">
      <div className="utama-activity__badge" id="utama-activity-title">
        Our Latest Activity
      </div>

      <article className="utama-activity__card">
        {isLoading || !currentActivity ? (
          <div className="utama-activity__loading" role="status" aria-live="polite">
            <div className="utama-activity__loading-image" />
            <div className="utama-activity__loading-overlay" />
            <div className="utama-activity__loading-content">
              <div className="utama-activity__loading-line utama-activity__loading-line--title" />
              <div className="utama-activity__loading-line utama-activity__loading-line--subtitle" />
              <div className="utama-activity__loading-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link
              href={`/acara/${currentActivity.id}`}
              className="utama-activity__slide-link"
              aria-label={`Lihat acara ${currentActivity.title}`}
            >
              <div className="utama-activity__image-wrapper">
                <Image
                  src={currentActivity.imageUrl}
                  alt={currentActivity.title}
                  fill
                  className="utama-activity__image"
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 980px"
                  unoptimized
                  priority
                />
                <div className="utama-activity__overlay" />
              </div>

              <div className="utama-activity__content">
                <h2 className="utama-activity__title">{currentActivity.title}</h2>

                {activities.length > 1 && (
                  <div className="utama-activity__dots" aria-label="Navigasi slide">
                    {activities.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`utama-activity__dot${
                          index === currentIndex ? " is-active" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          goTo(index);
                        }}
                        aria-label={`Tampilkan slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Link>

            {activities.length > 1 && (
              <>
                <button
                  type="button"
                  className="utama-activity__nav utama-activity__nav--prev"
                  aria-label="Activity sebelumnya"
                  onClick={goPrev}
                >
                  ‹
                </button>

                <button
                  type="button"
                  className="utama-activity__nav utama-activity__nav--next"
                  aria-label="Activity berikutnya"
                  onClick={goNext}
                >
                  ›
                </button>
              </>
            )}
          </>
        )}
      </article>
    </section>
  );
}