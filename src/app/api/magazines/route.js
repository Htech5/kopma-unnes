import { NextResponse } from "next/server";

export const revalidate = 3600;

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
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Proxy magazines error:", error);
    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server admin magazine" },
      { status: 500 }
    );
  }
}