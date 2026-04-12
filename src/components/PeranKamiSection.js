"use client";

import { useState } from "react";
import Image from "next/image";

const roleCards = [
  {
    title: "Agen Pembaharuan",
    description:
      "Bahwa sebagai suatu kesatuan yang integral, KOPMA UNNES beserta seluruh anggota merupakan agent pembaharu dan pelopor pembangunan. Kemurnian sikap dan gagasannya tercermin dalam setiap kegiatan dan aktifitasnya.",
  },
  {
    title: "Kader Koperasi",
    description:
      "KOPMA UNNES berperan sebagai wadah pembinaan kader koperasi yang berintegritas, berpengetahuan, dan memiliki semangat pengembangan ekonomi kerakyatan di lingkungan kampus maupun masyarakat.",
  },
  {
    title: "Kader Bangsa",
    description:
      "KOPMA UNNES turut membentuk generasi muda yang bertanggung jawab, memiliki jiwa kepemimpinan, semangat kebangsaan, serta kepedulian sosial melalui kegiatan organisasi dan usaha koperasi.",
  },
];

export default function PeranKamiSection() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="peran-kami" aria-labelledby="peran-kami-title">
      <div className="peran-kami__inner">
        <header className="peran-kami__header">
          <h2 id="peran-kami-title" className="peran-kami__title">
            Peran Kami
          </h2>

          <p className="peran-kami__subtitle">
            Dengan modal dan potensi yang dimiliki Koperasi Mahasiswa Universitas
            Negeri Semarang, maka Koperasi Mahasiswa UNNES dapat memegang posisi
            dan peranan sebagai berikut.
          </p>
        </header>

        <div className="peran-kami__grid">
          {roleCards.map((card, index) => {
            const isFlipped = Boolean(flippedCards[index]);

            return (
              <button
                key={card.title}
                type="button"
                className={`peran-kami__card ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => toggleCard(index)}
                aria-pressed={isFlipped}
                aria-label={`${card.title}. Klik untuk melihat ${
                  isFlipped ? "sisi depan" : "deskripsi"
                }`}
              >
                <div className="peran-kami__card-inner">
                  <div className="peran-kami__card-face peran-kami__card-face--front">
                    <div className="peran-kami__card-bg">
                      <Image
                        src="/images/background-card.png"
                        alt=""
                        fill
                        className="peran-kami__card-bg-image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 360px"
                      />
                    </div>

                    <div className="peran-kami__card-overlay" />

                    <div className="peran-kami__card-content">
                      <div className="peran-kami__icon-box">
                        <Image
                          src="/images/logo-card.png"
                          alt=""
                          width={34}
                          height={34}
                          className="peran-kami__icon-image"
                        />
                      </div>

                      <h3 className="peran-kami__card-title">{card.title}</h3>
                    </div>
                  </div>

                  <div className="peran-kami__card-face peran-kami__card-face--back">
                    <div className="peran-kami__card-bg">
                      <Image
                        src="/images/background-card.png"
                        alt=""
                        fill
                        className="peran-kami__card-bg-image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 360px"
                      />
                    </div>

                    <div className="peran-kami__card-overlay" />

                    <div className="peran-kami__card-back-content">
                      <p>{card.description}</p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}