import { NextResponse } from "next/server";

const BACKEND_URL = process.env.API_BACKEND_URL || "https://api.ukmkopmaunnes.com";

function buildTargetUrl(request) {
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL("/api/inventaris", BACKEND_URL);

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
    console.error("PROXY GET /api/inventaris error:", error);
    return NextResponse.json(
      {
        message: "Proxy gagal mengambil data inventaris",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const backendRes = await fetch(`${BACKEND_URL}/api/inventaris`, {
      method: "POST",
      body: formData,
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
    console.error("PROXY POST /api/inventaris error:", error);
    return NextResponse.json(
      {
        message: "Proxy gagal menambah inventaris",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}