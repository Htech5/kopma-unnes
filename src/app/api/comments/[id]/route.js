import { NextResponse } from "next/server";

const BACKEND_URL = process.env.API_BACKEND_URL || "https://api.ukmkopmaunnes.com";

export async function GET(_, context) {
  try {
    const { id } = await context.params;

    const backendRes = await fetch(`${BACKEND_URL}/api/comments/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
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
    console.error("PROXY GET /api/comments/[id] error:", error);
    return NextResponse.json(
      {
        message: "Proxy gagal mengambil detail komentar",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;

    const backendRes = await fetch(`${BACKEND_URL}/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
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
    console.error("PROXY DELETE /api/comments/[id] error:", error);
    return NextResponse.json(
      {
        message: "Proxy gagal menghapus komentar",
        detail: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}