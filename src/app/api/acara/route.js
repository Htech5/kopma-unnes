import { NextResponse } from "next/server";

function buildImageUrl(apiBase, path) {
  if (!path || typeof path !== "string") return null;
  if (/^https?:\/\//i.test(path)) return path;

  const cleanBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}

export async function GET(request) {
  try {
    const apiBase = process.env.API_EVENTS_BASE_URL;

    if (!apiBase) {
      return NextResponse.json(
        { message: "API_EVENTS_BASE_URL belum diset" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "6");

    const res = await fetch(`${apiBase}/api/events`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return new NextResponse(text, {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const rows = await res.json();

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { message: "Format data event tidak valid" },
        { status: 500 }
      );
    }

    const mapped = rows.map((item) => ({
      id: item.id,
      judul: item.title,
      foto: buildImageUrl(
        apiBase,
        item.main_image || item.top_image || item.middle_image || null
      ),
      isi: [item.content_top, item.content_bottom]
        .filter(Boolean)
        .join("<br /><br />"),
      ringkasan: item.content_top
        ? item.content_top.replace(/<[^>]*>/g, "").slice(0, 160).trim()
        : "",
      tanggal: item.created_at,
      slug: item.slug,
      category_id: item.category_id,
      category_name: item.category_name || null,
    }));

    const total = mapped.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = mapped.slice(start, end);

    return NextResponse.json({
      data: items,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      page,
      limit,
    });
  } catch (error) {
    console.error("Proxy acara list error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data acara" },
      { status: 500 }
    );
  }
}