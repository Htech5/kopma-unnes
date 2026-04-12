import AcaraDetailPageClient from "./AcaraDetailPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/api/acara/${id}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return {
        title: "Detail Acara KOPMA UNNES",
        description: "Informasi detail acara KOPMA UNNES.",
      };
    }

    const json = await res.json();
    const article = json.article ?? json;

    return {
      title: `${article.judul} – Acara KOPMA UNNES`,
      description:
        article.ringkasan ||
        "Informasi detail acara KOPMA UNNES.",
      openGraph: {
        title: `${article.judul} – Acara KOPMA UNNES`,
        description:
          article.ringkasan ||
          "Informasi detail acara KOPMA UNNES.",
        url: `https://ukmkopmaunnes.com/acara/${id}`,
        siteName: "KOPMA UNNES",
        locale: "id_ID",
        type: "article",
        images: article.foto
          ? [
              {
                url: article.foto,
                alt: article.judul,
              },
            ]
          : [],
      },
      alternates: {
        canonical: `https://ukmkopmaunnes.com/acara/${id}`,
      },
    };
  } catch {
    return {
      title: "Detail Acara KOPMA UNNES",
      description: "Informasi detail acara KOPMA UNNES.",
    };
  }
}

export default async function AcaraDetailPage({ params }) {
  const { id } = await params;
  return <AcaraDetailPageClient id={id} />;
}