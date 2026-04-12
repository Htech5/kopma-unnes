"use client";

import { useEffect, useMemo, useState } from "react";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [listStatus, setListStatus] = useState("loading");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    komentar: "",
  });

  const isValid = useMemo(() => {
    return (
      form.nama.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(form.email.trim()) &&
      form.komentar.trim().length >= 5
    );
  }, [form]);

  async function loadComments() {
    try {
      setListStatus("loading");
      setMessage("");

      const res = await fetch(
        `/api/comments?content_type=acara&content_id=${articleId}&status=approved`,
        {
          cache: "no-store",
          headers: { Accept: "application/json" },
        }
      );

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.message || json.detail || `HTTP ${res.status}`);
      }

      const list = Array.isArray(json) ? json : json.data ?? [];
      setComments(Array.isArray(list) ? list : []);
      setListStatus("success");
    } catch (error) {
      console.error("[CommentSection] loadComments error:", error);
      setComments([]);
      setListStatus("error");
      setMessage(error.message || "Gagal mengambil data komentar");
    }
  }

  useEffect(() => {
    if (articleId) {
      loadComments();
    }
  }, [articleId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!isValid) {
      setMessage("Mohon lengkapi nama, email, dan komentar dengan benar.");
      return;
    }

    try {
      setSubmitStatus("submitting");

      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          content_type: "acara",
          content_id: Number(articleId),
          name: form.nama.trim(),
          email: form.email.trim(),
          comment: form.komentar.trim(),
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.message || json.detail || `HTTP ${res.status}`);
      }

      setSubmitStatus("success");
      setMessage(
        json.message || "Komentar berhasil dikirim dan menunggu moderasi."
      );

      setForm({
        nama: "",
        email: "",
        komentar: "",
      });

      await loadComments();
    } catch (error) {
      console.error("[CommentSection] submit error:", error);
      setSubmitStatus("error");
      setMessage(error.message || "Gagal mengirim komentar");
    }
  }

  return (
    <section className="comment-box" aria-labelledby="comment-box-title">
      <div className="comment-box__inner">
        <h2 id="comment-box-title" className="comment-box__title">
          Tinggalkan Komentar
        </h2>

        <p className="comment-box__subtitle">
          Alamat email Anda tidak akan dipublikasikan. Ruas yang wajib ditandai
          <span className="comment-box__required"> *</span>
        </p>

        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            name="komentar"
            value={form.komentar}
            onChange={handleChange}
            className="comment-form__textarea"
            placeholder="Ketik disini..."
            rows={6}
            required
          />

          <div className="comment-form__row">
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="comment-form__input"
              placeholder="Nama*"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="comment-form__input"
              placeholder="Email*"
              required
            />
          </div>

          <button
            type="submit"
            className="comment-form__button"
            disabled={submitStatus === "submitting"}
          >
            {submitStatus === "submitting" ? "Mengirim..." : "Kirim Komentar"}
          </button>

          {message && (
            <p
              className={`comment-form__message ${
                submitStatus === "error"
                  ? "comment-form__message--error"
                  : "comment-form__message--success"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <div className="comment-list">
          <h3 className="comment-list__title">Komentar</h3>

          {listStatus === "loading" && (
            <p className="comment-list__state">Memuat komentar...</p>
          )}

          {listStatus === "error" && (
            <p className="comment-list__state">
              Gagal memuat komentar publik.
            </p>
          )}

          {listStatus === "success" && comments.length === 0 && (
            <p className="comment-list__state">
              Belum ada komentar yang ditampilkan.
            </p>
          )}

          {listStatus === "success" &&
            comments.length > 0 &&
            comments.map((item) => (
              <article key={item.id} className="comment-item">
                <div className="comment-item__head">
                  <strong className="comment-item__name">{item.name}</strong>
                  <span className="comment-item__date">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                <p className="comment-item__text">{item.comment}</p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}