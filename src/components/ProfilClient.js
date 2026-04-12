"use client";

// src/app/profil/ProfilClient.js

import Image from "next/image";

const YOUTUBE_ID = "MvR_LSEqV4U";

export default function ProfilClient() {
  return (
    <>
      {/* ══════════════════════════════
          SECTION: VISI & MISI
      ══════════════════════════════ */}
      <section className="profil-visimisi" aria-label="Visi dan Misi KOPMA UNNES">

        {/* ── Area logo ── */}
        <div className="profil-visimisi__top-area">
          <svg
            className="profil-visimisi__corner-svg"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0,0 L380,0 Q0,0 0,200 Z" fill="transparent" />
            <path d="M1440,0 L1060,0 Q1440,0 1440,200 Z" fill="transparent" />
          </svg>

          <div className="profil-visimisi__logo-wrap">
            <Image
              src="/images/kopma-unnes 2.png"
              alt="Logo KOPMA UNNES"
              width={130}
              height={130}
              className="profil-visimisi__logo"
              priority
            />
          </div>
        </div>

        {/* ── Area konten ── */}
        <div className="profil-visimisi__content-area">

          {/* ── OUR VISION ── */}
          <div className="profil-visimisi__vision">
            <h2 className="profil-visimisi__heading">Our Vision</h2>
            <p className="profil-visimisi__text">
              Menjadikan KOPMA UNNES sebagai wadah dan organisasi bisnis bagi
              anggota dengan pengembangan SQIPTEKS yang berasas kekeluargaan
            </p>
          </div>

          {/* ── SEPARATOR: bunga + garis pemisah full-width ── */}
          <div className="profil-visimisi__separator">
            <div className="profil-visimisi__flower profil-visimisi__flower--left" aria-hidden="true">
              <Image
                src="/images/Group 47.png"
                alt=""
                width={200}
                height={280}
                className="profil-visimisi__flower-img profil-visimisi__flower-img--flip"
              />
            </div>

            <div className="profil-visimisi__wave-mid" aria-hidden="true">
              <svg
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,60 C480,0 960,0 1440,60"
                  fill="none"
                  stroke="#a8d8a8"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <div className="profil-visimisi__flower profil-visimisi__flower--right" aria-hidden="true">
              <Image
                src="/images/Group 47.png"
                alt=""
                width={200}
                height={280}
                className="profil-visimisi__flower-img"
              />
            </div>
          </div>

          {/* ── OUR MISSION ── */}
          <div className="profil-visimisi__mission">
            <h2 className="profil-visimisi__heading">Our Mission</h2>
            <ol className="profil-visimisi__list">
              <li className="profil-visimisi__item">
                <span className="profil-visimisi__num">1</span>
                <p>
                  <b>Mengembangkan unit usaha</b> dengan menekankan konsep ekonomi kreatif dalam rangka peningkatan omzet guna meningkatkan kesejahteraan anggota.
                </p>
              </li>
              <li className="profil-visimisi__item">
                <span className="profil-visimisi__num">2</span>
                <p>
                  <b>Mempererat kekeluargaan</b> dengan komunikasi secara intens antar sesama pengurus dan anggota.
                </p>
              </li>
              <li className="profil-visimisi__item">
                <span className="profil-visimisi__num">3</span>
                <p>
                  <b>Meningkatkan hubungan internal maupun eksternal</b> dalam hal kerja sama diberbagai bidang sebagai wujud diversifikasi usaha.
                </p>
              </li>
              <li className="profil-visimisi__item">
                <span className="profil-visimisi__num">4</span>
                <p>
                  <b>Aktif dalam berbagai kegiatan perkoperasian</b> baik lingkup universitas maupun luar universitas guna menunjang peran Kopma sebagai laboratorium koperasi bagi mahasiswa.
                </p>
              </li>
            </ol>
          </div>

        </div>

        {/* ── Kurva transisi ke Video Profil ── */}
        <div className="profil-visimisi__bottom-curve" aria-hidden="true">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
          </svg>
        </div>

      </section>

      {/* ══════════════════════════════
          SECTION: VIDEO PROFIL
      ══════════════════════════════ */}
      <section className="profil-video" aria-label="Video Profil KOPMA UNNES">
        <div className="profil-video__inner">
          <div className="profil-video__heading-wrap">
            <h2 className="profil-video__heading">VIDEO PROFIL</h2>
          </div>
          <div className="profil-video__frame-wrap">
            <iframe
              className="profil-video__iframe"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
              title="Video Profil KOPMA UNNES 2025"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SECTION: SEJARAH KOPMA UNNES
      ══════════════════════════════ */}
      <section className="profil-sejarah" aria-label="Sejarah KOPMA UNNES">
        <div className="profil-sejarah__inner">
          <div className="profil-sejarah__title-bar">
            <h2 className="profil-sejarah__heading">SEJARAH KOPMA UNNES</h2>
          </div>
          <div className="profil-sejarah__card">
            <div className="profil-sejarah__top">
              <div className="profil-sejarah__logo-col">
                <div className="profil-sejarah__logo-wrap">
                  <Image
                    src="/images/kopma-unnes 2.png"
                    alt="Logo KOPMA UNNES"
                    fill
                    sizes="160px"
                    className="profil-sejarah__logo"
                  />
                </div>
              </div>
              <div className="profil-sejarah__intro-col">
                <p className="profil-sejarah__para">
                  Koperasi Mahasiswa Unnes lahir berawal dari perlunya pemenuhan kebutuhan kesejahteraan mahasiswa melalui unit usaha yang dikelola oleh mahasiswa sendiri. Keinginan tersebut semakin berkembang setelah munculnya gagasan perlunya wadah untuk mendidik anggota agar tumbuh menjadi insan koperasi yang militan (Wira Koperasi). Kopma Unnes berdiri pada tanggal 7 Mei 1982, yaitu pada saat dilakukan rapat pembentukan yang merupakan momentum sejarah terbentuknya koperasi di kalangan mahasiswa Universitas Negeri Semarang. Dengan dihadiri oleh Pejabat Departemen Koperasi rapat pembentukan Koperasi tersebut telah berhasil menetapkan anggaran dasar dan anggaran rumah tangga. Sekaligus memilih pengurus dan badan pengawas yang selanjutnya dilantik Rektor pada tanggal 28 Juli 1982,
                </p>
              </div>
            </div>
            <p className="profil-sejarah__para">
              dengan ketua yang pertama yaitu sdr. Cuk Subekti untuk periode kepengurusan tahun 1982-1983. Setelah beberapa waktu menjalankan usahanya, pada tanggal 31 Maret 1984. Koperasi Mahasiswa Universitas Negeri Semarang berhasil mendapatkan LEGALITAS berupa status Badan Hukum No. 1002/BH/VI. Pada tanggal 30 Agustus 2010 Kopma Unnes mendapat status hukum yang baru yaitu Badan Hukum No.10/180.08/PAD/XIV/VII/2010. Koperasi Mahasiswa (Kopma) Universitas Negeri Semarang merupakan salah satu Unit Kegiatan Mahasiswa (UKM) yang ada di Universitas Negeri Semarang. Berbeda dengan jenis UKM yang lainnya Kopma Universitas Negeri Semarang mempunyai peran ganda yaitu selain sebagai organisasi kemahasiswaan yang mempunyai misi/tugas pendidikan dan pengembangan sumber daya anggotanya juga merupakan organisasi bisnis yang berbadan hukum. Selain itu Kopma Universitas Negeri Semarang juga merupakan UKM yang memiliki kharakteristik khusus, artinya merupakan salah satu jenis UKM yang selain berada di bawah pembinaan Pembantu Rektor Bidang Kemahasiswaan juga UKM yang dapat berkoordinasi dengan pihak Departeman Koperasi dan Pengusaha Kecil Menengah wilayah propinsi Jawa Tengah, Departemen Koperasi dan pengusaha Kecil Menengah Kodya Semarang dan instansi-instansi terkait lainya.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}