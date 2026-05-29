import { NextResponse } from "next/server";

export const revalidate = 3600;

function buildFileUrl(apiBase, path) {
  if (!path || typeof path !== "string") return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${apiBase}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function GET() {
  try {
    const apiBase = process.env.API_MAGAZINE_BASE_URL;

    if (!apiBase) {
      return NextResponse.json(
        { message: "API_MAGAZINE_BASE_URL belum diset" },
        { status: 500 }
      );
    }

    const res = await fetch(`${apiBase}/api/magazines`, {
      next: {
        revalidate: 3600,
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();

      return new NextResponse(text, {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const magazines = await res.json();

    if (!Array.isArray(magazines) || magazines.length === 0) {
      return NextResponse.json(
        { message: "Data magazine tidak tersedia" },
        { status: 404 }
      );
    }

    const latest = magazines[0];

    const coverPath =
      latest.cover_image ||
      latest.coverImage ||
      latest.cover ||
      latest.thumbnail ||
      latest.image ||
      latest.foto ||
      null;

    return NextResponse.json(
      {
        id: latest.id,
        title: latest.title,
        year: latest.year,
        coverUrl: buildFileUrl(apiBase, coverPath),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Latest magazine proxy error:", error);

    return NextResponse.json(
      { message: "Gagal mengambil latest magazine" },
      { status: 500 }
    );
  }
}
