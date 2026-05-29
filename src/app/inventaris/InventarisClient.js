"use client";

import { useEffect, useMemo, useState } from "react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "6282146734835";
const WA_MSG =
  process.env.NEXT_PUBLIC_WA_MSG ??
  "Halo, saya ingin menyewa inventaris KOPMA UNNES.";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];
const STORAGE_KEY = "kopma-inventaris-cache";
const CACHE_MAX_AGE = 60 * 60 * 1000;

function formatHarga(val) {
  const num = Number(val);
  return Number.isFinite(num) ? `Rp ${num.toLocaleString("id-ID")}/Hari` : "—";
}

function safeNumber(val) {
  const n = Number(val);
  return Number.isFinite(n) ? n : "—";
}

export default function InventarisClient() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const cached = sessionStorage.getItem(STORAGE_KEY);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.time < CACHE_MAX_AGE && Array.isArray(parsed.items)) {
          setItems(parsed.items);
          setStatus("success");
          return;
        }
      } catch {}
    }

    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch("/api/inventaris", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const list = Array.isArray(json) ? json : json.data ?? json.items ?? [];

        const safeList = Array.isArray(list) ? list : [];
        setItems(safeList);
        setStatus("success");

        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            time: Date.now(),
            items: safeList,
          })
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("[InventarisClient] fetch error:", error);
          setStatus("error");
        }
      }
    }

    load();

    return () => controller.abort();
  }, []);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

  return (
    <div className="inv-wrap">
      <h1 className="inv-heading">
        Penyewaan Inventaris
        <br />
        KOPMA UNNES
      </h1>

      {status === "success" && items.length > 0 && (
        <div className="inv-pagination-control">
          <label className="inv-pagination-label">
            Tampilkan
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="inv-pagination-select"
            >
              {PAGE_SIZE_OPTIONS.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            data
          </label>

          <p className="inv-pagination-info">
            Halaman {page} dari {totalPages} · Total {totalItems} data
          </p>
        </div>
      )}

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
            {status === "loading" &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className={`inv-row${i % 2 ? " inv-row--alt" : ""}`}>
                  <td className="inv-td"><div className="inv-skel inv-skel--text" /></td>
                  <td className="inv-td"><div className="inv-skel inv-skel--img" /></td>
                  <td className="inv-td"><div className="inv-skel inv-skel--text" /></td>
                  <td className="inv-td"><div className="inv-skel inv-skel--num" /></td>
                  <td className="inv-td"><div className="inv-skel inv-skel--num" /></td>
                </tr>
              ))}

            {status === "error" && (
              <tr>
                <td colSpan={5} className="inv-td inv-td--empty">
                  Gagal memuat data inventaris.
                </td>
              </tr>
            )}

            {status === "success" &&
              paginatedItems.map((item, i) => (
                <tr key={item.id ?? `${page}-${i}`} className={`inv-row${i % 2 ? " inv-row--alt" : ""}`}>
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
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="inv-img-empty">—</div>
                    )}
                  </td>

                  <td className="inv-td inv-td--harga">{formatHarga(item.harga)}</td>
                  <td className="inv-td inv-td--num">{safeNumber(item.stok)}</td>
                  <td className="inv-td inv-td--num">{safeNumber(item.stok_tersedia)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {status === "success" && totalPages > 1 && (
        <nav className="inv-pagination">
          <button
            type="button"
            className="inv-pagination-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Sebelumnya
          </button>

          <span className="inv-pagination-info">
            {page} / {totalPages}
          </span>

          <button
            type="button"
            className="inv-pagination-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Berikutnya →
          </button>
        </nav>
      )}

      <div className="inv-wa-outer">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inv-wa-btn"
        >
          <span>Klik disini untuk Penyewaan</span>
        </a>
      </div>
    </div>
  );
}
