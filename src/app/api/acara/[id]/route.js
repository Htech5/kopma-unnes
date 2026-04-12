import { NextResponse } from "next/server";

function buildImageUrl(apiBase, path) {
  if (!path || typeof path !== "string") return null;
  if (/^https?:\/\//i.test(path)) return path;

  const cleanBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}

export async function GET(_, context) {
  try {
    const apiBase = process.env.API_EVENTS_BASE_URL;

    if (!apiBase) {
      return NextResponse.json(
        { message: "API_EVENTS_BASE_URL belum diset" },
        { status: 500 }
      );
    }

    const { id } = await context.params;

    const detailRes = await fetch(`${apiBase}/api/events/${id}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!detailRes.ok) {
      const text = await detailRes.text();
      return new NextResponse(text, {
        status: detailRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const article = await detailRes.json();

    const listRes = await fetch(`${apiBase}/api/events`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    let prev = null;
    let next = null;

    if (listRes.ok) {
      const list = await listRes.json();

      if (Array.isArray(list)) {
        const sorted = [...list].sort((a, b) => Number(a.id) - Number(b.id));
        const index = sorted.findIndex((item) => Number(item.id) === Number(id));

        if (index > 0) {
          prev = {
            id: sorted[index - 1].id,
            judul: sorted[index - 1].title,
          };
        }

        if (index >= 0 && index < sorted.length - 1) {
          next = {
            id: sorted[index + 1].id,
            judul: sorted[index + 1].title,
          };
        }
      }
    }

    const mappedArticle = {
      id: article.id,
      judul: article.title,
      foto: buildImageUrl(
        apiBase,
        article.main_image || article.top_image || article.middle_image || null
      ),
      isi: [article.content_top, article.content_bottom]
        .filter(Boolean)
        .join("<br /><br />"),
      tanggal: article.created_at,
      slug: article.slug,
      category_id: article.category_id,
    };

    return NextResponse.json({
      article: mappedArticle,
      prev,
      next,
    });
  } catch (error) {
    console.error("Proxy acara detail error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil detail acara" },
      { status: 500 }
    );
  }
}