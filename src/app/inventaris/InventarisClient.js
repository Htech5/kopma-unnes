"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "6282146734835";
const WA_MSG =
  process.env.NEXT_PUBLIC_WA_MSG ??
  "Halo, saya ingin menyewa inventaris KOPMA UNNES.";

function formatHarga(val) {
  if (val === null || val === undefined || val === "") return "—";
  const num = Number(val);
  if (Number.isFinite(num)) {
    return `Rp ${num.toLocaleString("id-ID")}/Hari`;
  }
  return String(val);
}

function safeNumber(val) {
  const n = Number(val);
  return Number.isFinite(n) ? n : "—";
}

function SkeletonRows() {
  return Array.from({ length: 6 }).map((_, i) => (
    <tr key={i} className={`inv-row${i % 2 !== 0 ? " inv-row--alt" : ""}`}>
      <td className="inv-td inv-td--nama">
        <div className="inv-skel inv-skel--text" />
      </td>
      <td className="inv-td inv-td--gambar">
        <div className="inv-skel inv-skel--img" />
      </td>
      <td className="inv-td inv-td--harga">
        <div className="inv-skel inv-skel--text" />
      </td>
      <td className="inv-td inv-td--num">
        <div className="inv-skel inv-skel--num" />
      </td>
      <td className="inv-td inv-td--num">
        <div className="inv-skel inv-skel--num" />
      </td>
    </tr>
  ));
}

export default function InventarisClient({ initialItems = [] }) {
  const [items, setItems] = useState(
    Array.isArray(initialItems) ? initialItems : []
  );
  const [status, setStatus] = useState(
    Array.isArray(initialItems) && initialItems.length > 0
      ? "success"
      : "loading"
  );

  useEffect(() => {
    if (Array.isArray(initialItems) && initialItems.length > 0) return;

    if (!API_URL) {
      console.error("[InventarisClient] NEXT_PUBLIC_API_URL belum di-set");
      setItems([]);
      setStatus("error");
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/inventaris`, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();
        const list = Array.isArray(json) ? json : json.data ?? json.items ?? [];

        setItems(Array.isArray(list) ? list : []);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") {
          console.error("[InventarisClient] request timeout");
        } else {
          console.error("[InventarisClient] fetch error:", err);
        }
        setItems([]);
        setStatus("error");
      } finally {
        clearTimeout(timeout);
      }
    }

    load();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [initialItems]);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

  return (
    <div className="inv-wrap">
      <h1 className="inv-heading">
        Penyewaan Inventaris
        <br />
        KOPMA UNNES
      </h1>

      <div className="inv-table-wrap" role="region" aria-label="Daftar inventaris">
        <table className="inv-table">
          <caption className="inv-caption">
            Daftar penyewaan inventaris KOPMA UNNES beserta harga dan ketersediaan stok
          </caption>

          <thead>
            <tr className="inv-thead-row">
              <th scope="col" className="inv-th">Nama</th>
              <th scope="col" className="inv-th">Gambar</th>
              <th scope="col" className="inv-th">Harga</th>
              <th scope="col" className="inv-th">Stok</th>
              <th scope="col" className="inv-th">Stok Tersedia</th>
            </tr>
          </thead>

          <tbody>
            {status === "loading" && <SkeletonRows />}

            {status === "error" && (
              <tr>
                <td colSpan={5} className="inv-td inv-td--empty">
                  Gagal memuat data inventaris.
                </td>
              </tr>
            )}

            {status === "success" && items.length === 0 && (
              <tr>
                <td colSpan={5} className="inv-td inv-td--empty">
                  Belum ada data inventaris yang tersedia.
                </td>
              </tr>
            )}

            {status === "success" &&
              items.map((item, i) => (
                <tr
                  key={item.id ?? i}
                  className={`inv-row${i % 2 !== 0 ? " inv-row--alt" : ""}`}
                >
                  <td className="inv-td inv-td--nama">{item.nama}</td>

                  <td className="inv-td inv-td--gambar">
                    {item.gambar ? (
                      <div className="inv-img-wrap">
                        <img
                          src={item.gambar}
                          alt={`Foto ${item.nama}`}
                          className="inv-img"
                          width={80}
                          height={80}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="inv-img-empty">—</div>
                    )}
                  </td>

                  <td className="inv-td inv-td--harga">
                    {formatHarga(item.harga)}
                  </td>

                  <td className="inv-td inv-td--num">{safeNumber(item.stok)}</td>

                  <td className="inv-td inv-td--num">
                    {safeNumber(item.stok_tersedia)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="inv-wa-outer">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inv-wa-btn"
          aria-label="Hubungi WhatsApp KOPMA UNNES untuk penyewaan inventaris"
        >
          <svg
            className="inv-wa-icon"
            viewBox="0 0 32 32"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.83 6.516L4 29l7.687-1.807A12.93 12.93 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm5.908 16.674c-.249.701-1.468 1.374-2.009 1.414-.516.038-1.001.216-3.375-.703-2.837-1.092-4.642-4.007-4.784-4.193-.143-.187-1.176-1.563-1.176-2.977s.743-2.112.996-2.399c.252-.287.55-.357.734-.357l.526.01c.169.007.396-.064.62.473.249.589.844 2.052.916 2.203.073.15.121.325.024.52-.097.195-.145.315-.287.485-.143.17-.3.38-.43.51-.143.143-.292.298-.125.584.167.287.74 1.216 1.586 1.97 1.089.97 2.005 1.27 2.292 1.413.287.143.453.12.62-.072.167-.192.716-.836.908-1.123.192-.287.383-.24.644-.144.261.097 1.655.78 1.94.921.285.143.476.215.547.334.069.119.069.685-.18 1.386z"
            />
          </svg>
          <span>Klik disini untuk Penyewaan</span>
        </a>
      </div>
    </div>
  );
}
