import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ukmkopmaunnes.com";

export const revalidate = 3600;

export async function GET() {
  try {
    const targetUrl = new URL("/api/acara?page=1&limit=20", API_BASE_URL);

    const res = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return new NextResponse(text, {
        status: res.status,
        headers: {
          "Content-Type": res.headers.get("content-type") || "application/json",
        },
      });
    }

    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data ?? json.items ?? [];

    if (!Array.isArray(list)) {
      return NextResponse.json(
        { message: "Format data latest activity tidak valid" },
        { status: 500 }
      );
    }

    const mapped = list
      .filter((item) => item?.id && item?.judul && item?.foto)
      .map((item) => ({
        id: item.id,
        title: item.judul,
        imageUrl: item.foto,
      }));

    return NextResponse.json(mapped, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GET latest activity error:", error);
    return NextResponse.json(
      {
        message: "Gagal mengambil latest activity",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
