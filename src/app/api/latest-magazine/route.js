import { NextResponse } from "next/server";

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
      cache: "no-store",
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

    return NextResponse.json({
      id: latest.id,
      title: latest.title,
      year: latest.year,
    });
  } catch (error) {
    console.error("Latest magazine proxy error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil latest magazine" },
      { status: 500 }
    );
  }
}