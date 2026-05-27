"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const unitUsahaItems = [
  {
    id: "jne",
    title: "Counter JNE",
    description: "Menyediakan jasa pelayanan antar paket.",
    logo: "/images/JNE-logo.png",
    detailsHref: "/jne-kopma",
    locationHref: "https://maps.app.goo.gl/s51EG4NFcNkJkARK6",
    waNumber: "628979979356",
    showDetails: true,
  },
  {
    id: "kopmart",
    title: "KOPMART",
    description: "Sedia kebutuhan sehari - hari.",
    logo: "/images/kopmart-logo.png",
    detailsHref: "/kopmart",
    locationHref: "https://maps.app.goo.gl/1zKniu75Z8Ck56M36",
    waNumber: "6285124573261",
    showDetails: true,
  },
  {
    id: "toga",
    title: "Toga Wisuda",
    description: "Persewaan dan pembelian toga.",
    logo: "/images/toga-logo.png",
    detailsHref: "/toga-kopma",
    locationHref: "https://maps.app.goo.gl/2daKNnHjMVdNrAx38",
    waNumber: "6285124573261",
    showDetails: true,
  },
  {
    id: "konsinyasi",
    title: "Konsinyasi KOPMA",
    description:
      "Penitipan barang anggota untuk dijual.",
    logo: "/images/konsinyasi-logo.png",
    detailsHref: "/konsinyasi-kopma",
    locationHref: "https://maps.app.goo.gl/1zKniu75Z8Ck56M36",
    waNumber: "6285124573261",
    showDetails: false,
  },
  {
    id: "kws",
    title: "Kedai Wareg Senyum",
    description: "Usaha baru kuliner.",
    logo: "/images/kws-logo.png",
    detailsHref: "/kws-kopma",
    locationHref: "https://maps.app.goo.gl/2daKNnHjMVdNrAx38",
    waNumber: "6285124573261",
    showDetails: false,
  },
];

export default function UnitUsahaSection() {
  const [openCardIds, setOpenCardIds] = useState([]);

  const toggleCard = (id) => {
    setOpenCardIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="unit-usaha" aria-labelledby="unit-usaha-title">
      <div className="unit-usaha__background" aria-hidden="true">
        <Image
          src="/images/background-usaha.png"
          alt=""
          width={1920}
          height={1450}
          className="unit-usaha__background-image"
          sizes="100vw"
        />
      </div>

      <div className="unit-usaha__inner">
        <header className="unit-usaha__header">
          <h2 id="unit-usaha-title" className="unit-usaha__title">
            UNIT USAHA
          </h2>
        </header>

        <div className="unit-usaha__grid">
          {unitUsahaItems.map((item) => {
            const isOpen = openCardIds.includes(item.id);
            const waHref = `https://wa.me/${item.waNumber}?text=Halo,%20saya%20ingin%20bertanya%20tentang%20${encodeURIComponent(item.title)}`;

            return (
              <article
                key={item.id}
                className={`unit-usaha__item ${isOpen ? "is-open" : ""}`}
              >
                <div className="unit-usaha__shape">
                  <button
                    type="button"
                    className="unit-usaha__card"
                    onClick={() => toggleCard(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`unit-usaha-panel-${item.id}`}
                    aria-label={`${item.title}. Klik untuk ${
                      isOpen ? "menutup detail" : "membuka detail"
                    }`}
                  >
                    <div className="unit-usaha__logo-wrap">
                      <Image
                        src={item.logo}
                        alt={item.title}
                        width={140}
                        height={140}
                        className="unit-usaha__logo"
                      />
                    </div>

                    <div
                      id={`unit-usaha-panel-${item.id}`}
                      className="unit-usaha__details"
                      aria-hidden={!isOpen}
                    >
                      <h3 className="unit-usaha__panel-title">{item.title}</h3>

                      <p className="unit-usaha__panel-description">
                        {item.description}
                      </p>
                    </div>
                  </button>

                  <div
                    className="unit-usaha__panel-actions"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <a
                      href={item.locationHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="unit-usaha__action unit-usaha__action--location"
                    >
                      <span>See Our Location</span>
                    </a>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="unit-usaha__action unit-usaha__action--details"
                    >
                      <span>Contact Us</span>
                    </a>

                    {item.showDetails ? (
                      <Link
                        href={item.detailsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="unit-usaha__action unit-usaha__action--details"
                      >
                        <span>See Details</span>
                      </Link>
                    ) : (
                      <span
                        className="unit-usaha__action unit-usaha__action--placeholder"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
