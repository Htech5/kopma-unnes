import { NextResponse } from "next/server";
import { validateUpload } from "@/lib/upload";

export const revalidate = 3600;

const BACKEND_URL =
  process.env.API_BACKEND_URL || "https://api.ukmkopmaunnes.com";

export async function GET(_, context) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const { id } = await context.params;

    const backendRes = await fetch(`${BACKEND_URL}/api/inventaris/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
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
    console.error("PROXY GET /api/inventaris/[id] error:", error);

    return NextResponse.json(
      {
        message: "Proxy gagal mengambil detail inventaris",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function PUT(request, context) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const { id } = await context.params;
    const formData = await request.formData();

    const uploadError = validateUpload(formData);
    if (uploadError) {
      clearTimeout(timeout);
      return NextResponse.json({ message: uploadError }, { status: 400 });
    }

    const backendRes = await fetch(`${BACKEND_URL}/api/inventaris/${id}`, {
      method: "PUT",
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
    console.error("PROXY PUT /api/inventaris/[id] error:", error);

    return NextResponse.json(
      {
        message: "Proxy gagal memperbarui inventaris",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function DELETE(_, context) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const { id } = await context.params;

    const backendRes = await fetch(`${BACKEND_URL}/api/inventaris/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
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
    console.error("PROXY DELETE /api/inventaris/[id] error:", error);

    return NextResponse.json(
      {
        message: "Proxy gagal menghapus inventaris",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
