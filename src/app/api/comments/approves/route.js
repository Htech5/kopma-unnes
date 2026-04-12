import { NextResponse } from "next/server";

const BACKEND_URL = process.env.API_BACKEND_URL || "https://api.ukmkopmaunnes.com";

export async function PATCH(request) {
  try {
    const body = await request.text();

    const backendRes = await fetch(`${BACKEND_URL}/api/comments/approve`, {
      method: "PATCH",
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
    console.error("PROXY PATCH /api/comments/approve error:", error);
    return NextResponse.json(
      {
        message: "Proxy gagal approve komentar",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}