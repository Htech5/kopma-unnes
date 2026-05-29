import { NextResponse } from "next/server";

export const revalidate = 3600;

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

    const detailRes = await fetch(`${apiBase}/api/magazines/${id}`, {
      next: {
        revalidate: 3600,
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (!detailRes.ok) {
      const text = await detailRes.text();

      return new NextResponse(text, {
        status: detailRes.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const detail = await detailRes.json();
    const pdfPath = detail?.pdf_file;

    if (!pdfPath) {
      return NextResponse.json(
        { message: "File PDF tidak ditemukan" },
        { status: 404 }
      );
    }

    const fileUrl = pdfPath.startsWith("http")
      ? pdfPath
      : `${apiBase}${pdfPath.startsWith("/") ? pdfPath : `/${pdfPath}`}`;

    const fileRes = await fetch(fileUrl, {
      next: {
        revalidate: 3600,
      },
    });

    if (!fileRes.ok) {
      return NextResponse.json(
        { message: "Gagal mengambil file PDF" },
        { status: fileRes.status }
      );
    }

    const contentType = fileRes.headers.get("content-type") || "application/pdf";
    const arrayBuffer = await fileRes.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="magazine-${id}.pdf"`,
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Proxy magazine file error:", error);

    return NextResponse.json(
      { message: "Tidak dapat mengambil file PDF magazine" },
      { status: 500 }
    );
  }
}
