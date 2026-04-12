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

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
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