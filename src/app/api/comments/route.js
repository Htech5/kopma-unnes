import { NextResponse } from "next/server";

const BACKEND_URL = process.env.API_BACKEND_URL || "https://api.ukmkopmaunnes.com";

function buildTargetUrl(request) {
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL("/api/comments", BACKEND_URL);

  incomingUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  return targetUrl.toString();
}

export async function GET(request) {
  try {
    const backendRes = await fetch(buildTargetUrl(request), {
      method: "GET",
      cache: "no-store",
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
      },
    });
  } catch (error) {
    console.error("PROXY GET /api/comments error:", error);
    return NextResponse.json(
      {
        message: "Proxy gagal mengambil data komentar",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.text();

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
      {
        message: "Proxy gagal mengirim komentar",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}