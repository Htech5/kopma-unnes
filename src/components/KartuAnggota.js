"use client";

import Image from "next/image";
import { useState } from "react";

export default function KartuAnggota({ jabatan, nama, foto }) {
  const [imgSrc, setImgSrc] = useState(foto);

  return (
    <div className="so-kartu">
      <div className="so-kartu__foto-wrapper">
        <Image
          src={imgSrc}
          alt={`Foto ${nama}`}
          fill
          sizes="170px"
          className="so-kartu__foto"
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