import { NextResponse } from "next/server";

export const revalidate = 3600;

const BACKEND_URL =
  process.env.API_BACKEND_URL || "https://api.ukmkopmaunnes.com";

function buildTargetUrl(request) {
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL("/api/inventaris", BACKEND_URL);

  incomingUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  return targetUrl.toString();
}

export async function GET(request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const backendRes = await fetch(buildTargetUrl(request), {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    const raw = await backendRes.text();

    return new NextResponse(raw, {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers.get("content-type") || "application/json",
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("PROXY GET /api/inventaris error:", error);

    return NextResponse.json(
      {
        message: "Proxy gagal mengambil data inventaris",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const formData = await request.formData();

    const backendRes = await fetch(`${BACKEND_URL}/api/inventaris`, {
      method: "POST",
      body: formData,
      cache: "no-store",
      signal: controller.signal,
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
    console.error("PROXY POST /api/inventaris error:", error);

    return NextResponse.json(
      {
        message: "Proxy gagal menambah inventaris",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
