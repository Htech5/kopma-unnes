import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const apiBase = process.env.API_MAGAZINE_BASE_URL;

    if (!apiBase) {
      return NextResponse.json(
        { message: "API_MAGAZINE_BASE_URL belum diset" },
        { status: 500 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "ID magazine tidak valid" },
        { status: 400 }
      );
    }

    const res = await fetch(`${apiBase}/api/magazines/${id}`, {
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
    console.error("Proxy detail magazine error:", error);
    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server admin magazine" },
      { status: 500 }
    );
  }
}