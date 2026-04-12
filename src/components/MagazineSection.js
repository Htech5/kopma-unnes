"use client";

import { useState, useEffect, useCallback } from "react";
import MagazineCard from "./MagazineCard";

function MagazineLoading() {
  return (
    <div className="mag-loading" role="status" aria-label="Memuat majalah...">
      <div className="mag-loading__card">
        <div className="mag-loading__cover">
          <div className="mag-money-scene" aria-hidden="true">
            <div className="mag-money mag-money--1">
              <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="44" rx="4" fill="#c8f7d8" stroke="#2e8b2e" strokeWidth="1.5" />
                <rect x="6" y="6" width="68" height="32" rx="2" fill="none" stroke="#2e8b2e" strokeWidth="1" />
                <circle cx="40" cy="22" r="9" fill="none" stroke="#2e8b2e" strokeWidth="1.2" />
                <text x="40" y="26.5" textAnchor="middle" fill="#2e8b2e" fontSize="10" fontWeight="700">
                  Rp
                </text>
                <line x1="6" y1="14" x2="16" y2="14" stroke="#2e8b2e" strokeWidth="1" />
                <line x1="64" y1="14" x2="74" y2="14" stroke="#2e8b2e" strokeWidth="1" />
                <line x1="6" y1="30" x2="16" y2="30" stroke="#2e8b2e" strokeWidth="1" />
                <line x1="64" y1="30" x2="74" y2="30" stroke="#2e8b2e" strokeWidth="1" />
              </svg>
            </div>

            <div className="mag-money mag-money--2">
              <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="44" rx="4" fill="#fffde0" stroke="#c8a800" strokeWidth="1.5" />
                <rect x="6" y="6" width="68" height="32" rx="2" fill="none" stroke="#c8a800" strokeWidth="1" />
                <circle cx="40" cy="22" r="9" fill="none" stroke="#c8a800" strokeWidth="1.2" />
                <text x="40" y="26.5" textAnchor="middle" fill="#c8a800" fontSize="10" fontWeight="700">
                  Rp
                </text>
                <line x1="6" y1="14" x2="16" y2="14" stroke="#c8a800" strokeWidth="1" />
                <line x1="64" y1="14" x2="74" y2="14" stroke="#c8a800" strokeWidth="1" />
                <line x1="6" y1="30" x2="16" y2="30" stroke="#c8a800" strokeWidth="1" />
                <line x1="64" y1="30" x2="74" y2="30" stroke="#c8a800" strokeWidth="1" />
              </svg>
            </div>

            <div className="mag-money mag-money--3">
              <svg viewBox="0 0 80 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="44" rx="4" fill="#c8f7d8" stroke="#2e8b2e" strokeWidth="1.5" />
                <rect x="6" y="6" width="68" height="32" rx="2" fill="none" stroke="#2e8b2e" strokeWidth="1" />
                <circle cx="40" cy="22" r="9" fill="none" stroke="#2e8b2e" strokeWidth="1.2" />
                <text x="40" y="26.5" textAnchor="middle" fill="#2e8b2e" fontSize="10" fontWeight="700">
                  Rp
                </text>
              </svg>
            </div>

            <div className="mag-wind mag-wind--1" aria-hidden="true" />
            <div className="mag-wind mag-wind--2" aria-hidden="true" />
            <div className="mag-wind mag-wind--3" aria-hidden="true" />

            <p className="mag-loading__text">
              Memuat majalah
              <span className="mag-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </p>
          </div>
        </div>

        <div className="mag-loading__footer">
          <div className="mag-loading__title-bar" />
          <div className="mag-loading__actions">
            <div className="mag-loading__btn mag-loading__btn--outline" />
            <div className="mag-loading__btn mag-loading__btn--solid" />
          </div>
        </div>
      </div>
    </div>
  );
}

function buildFileUrl(path) {
  if (!path || typeof path !== "string") return "#";

  const trimmed = path.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const fileBase = process.env.NEXT_PUBLIC_MAGAZINE_FILE_BASE_URL ?? "";

  if (!fileBase) {
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }

  const cleanBase = fileBase.endsWith("/") ? fileBase.slice(0, -1) : fileBase;
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  return `${cleanBase}${cleanPath}`;
}

export default function MagazineSection() {
  const [magazines, setMagazines] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async (signal) => {
    try {
      setStatus("loading");

      const res = await fetch("/api/magazines", {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Format data tidak valid.");
      }

      const normalized = data.map((item) => ({
        id: item.id,
        title: item.year ? `${item.title} ${item.year}` : item.title,
        subtitle: item.year ? String(item.year) : "",
        previewImage: null,
        pdfUrl: buildFileUrl(item.pdf_file),
      }));

      setMagazines(normalized);
      setStatus("success");
    } catch (err) {
      if (err.name === "AbortError") return;

      console.error("[MagazineSection] Gagal memuat:", err);

      if (!signal.aborted) {
        setTimeout(() => {
          if (!signal.aborted) load(signal);
        }, 5000);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);

    return () => controller.abort();
  }, [load]);

  return (
    <section
      className="mag-section"
      aria-label="Daftar Majalah KOPMA UNNES"
      aria-live="polite"
      aria-busy={status === "loading"}
    >
      <div className="mag-section__header">
        <h2 className="mag-section__heading">Magazine</h2>
      </div>

      <div className="mag-section__body">
        {status === "loading" && <MagazineLoading />}

        {status === "success" && magazines.length === 0 && (
          <div className="mag-section__empty" role="status">
            <p>Belum ada majalah yang tersedia.</p>
          </div>
        )}

        {status === "success" && (
          <div className="mag-section__grid">
            {magazines.map((mag, i) => (
              <MagazineCard
                key={mag.id ?? i}
                id={mag.id}
                title={mag.title}
                subtitle={mag.subtitle}
                previewImage={mag.previewImage}
                pdfUrl={mag.pdfUrl}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}