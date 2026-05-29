"use client";

import Image from "next/image";
import { useState } from "react";

export default function KartuAnggota({ jabatan, nama, foto }) {
  const [imgSrc, setImgSrc] = useState(foto || "/images/placeholder.jpg");

  return (
    <div className="so-kartu">
      <div className="so-kartu__foto-wrapper">
        <Image
          src={imgSrc}
          alt={`Foto ${nama}`}
          fill
          sizes="(max-width: 640px) 140px, 170px"
          className="so-kartu__foto"
          quality={55}
          loading="lazy"
          placeholder="empty"
          onError={() => setImgSrc("/images/placeholder.jpg")}
        />

        <div className="so-kartu__overlay" />
      </div>

      <div className="so-kartu__info">
        <span className="so-kartu__jabatan">{jabatan}</span>
        <span className="so-kartu__nama">{nama}</span>
      </div>
    </div>
  );
}
