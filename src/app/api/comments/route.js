import { NextResponse } from "next/server";

const BACKEND_URL = process.env.API_BACKEND_URL || "https://api.ukmkopmaunnes.com";

const ALLOWED_PARAMS = ["content_type", "content_id", "page", "limit"];

function buildTargetUrl(request) {
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL("/api/comments", BACKEND_URL);

  for (const key of ALLOWED_PARAMS) {
    const value = incomingUrl.searchParams.get(key);
    if (value != null) targetUrl.searchParams.set(key, value);
  }
  // Publik hanya boleh melihat komentar yang sudah disetujui.
  targetUrl.searchParams.set("status", "approved");

  return targetUrl.toString();
}

export async function GET(request) {
  try {
    // ponytail: 60 detik, bukan 3600 seperti route lain — komentar baru yang
    // baru di-approve harus cepat muncul. Naikkan kalau backend masih berat.
    const backendRes = await fetch(buildTargetUrl(request), {
      method: "GET",
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    const raw = await backendRes.text();

    return new NextResponse(raw, {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers.get("content-type") || "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("PROXY GET /api/comments error:", error);
    return NextResponse.json(
      { message: "Proxy gagal mengambil data komentar" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.text();

    if (body.length > 10_000) {
      return NextResponse.json(
        { message: "Payload terlalu besar" },
        { status: 413 }
      );
    }

    const backendRes = await fetch(`${BACKEND_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
      cache: "no-store",
    });

    const raw = await backendRes.text();

    return new NextResponse(raw, {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("PROXY POST /api/comments error:", error);
    return NextResponse.json(
      { message: "Proxy gagal mengirim komentar" },
      { status: 500 }
    );
  }
}