"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const openDropdown = () => {
    cancelClose();
    setIsDropdownOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 180);
  };

  const toggleDropdown = () => {
    cancelClose();
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const isTentangKamiActive =
    pathname === "/profil" || pathname === "/struktur-organisasi";

  useEffect(() => {
  function updateHoverCapability() {
    const hoverSupported =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setCanHover(hoverSupported);
  }

  updateHoverCapability();
  window.addEventListener("resize", updateHoverCapability);

  return () => {
    window.removeEventListener("resize", updateHoverCapability);
  };
}, []);

  useEffect(() => {
    function handleClickOutside(event) {
      const target = event.target;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }

      if (navRef.current && !navRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      cancelClose();
    };
  }, []);

  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  return (
    <header className="navbar-wrapper">
      <nav ref={navRef} className="navbar">
        <div className="navbar-top">
          <Link href="/" className="navbar-logo" aria-label="KOPMA UNNES">
            <Image
              src="/images/logo-kopma.png"
              alt="Logo KOPMA UNNES"
              width={74}
              height={74}
              className="logo-image"
              priority
            />
            <div className="logo-text">
              <span>KOPMA</span>
              <span>UNNES</span>
            </div>
          </Link>

          <button
            type="button"
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-menu"
          >
            ☰
          </button>
        </div>

        <div
          id="navbar-menu"
          className={`navbar-menu ${isMobileMenuOpen ? "navbar-menu-open" : ""}`}
        >
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}
          >
            Beranda
          </Link>

          <div
            className="dropdown"
            ref={dropdownRef}
            onMouseEnter={canHover ? openDropdown : undefined}
            onMouseLeave={canHover ? scheduleClose : undefined}
          >
            <button
              type="button"
              className={`nav-link dropdown-button ${
                isTentangKamiActive ? "nav-link-active" : ""
              }`}
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Tentang Kami
              <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
                ▼
              </span>
            </button>

            <div
              className={`dropdown-menu ${isDropdownOpen ? "dropdown-open" : ""}`}
            >
              <Link
                href="/profil"
                className={`dropdown-item ${
                  pathname === "/profil" ? "dropdown-item-active" : ""
                }`}
              >
                Profil
              </Link>

              <Link
                href="/struktur-organisasi"
                className={`dropdown-item ${
                  pathname === "/struktur-organisasi"
                    ? "dropdown-item-active"
                    : ""
                }`}
              >
                Struktur Organisasi
              </Link>
            </div>
          </div>

          <Link
            href="/keanggotaan"
            className={`nav-link ${
              pathname === "/keanggotaan" ? "nav-link-active" : ""
            }`}
          >
            Keanggotaan
          </Link>

          <Link
            href="/acara"
            className={`nav-link ${
              pathname === "/acara" ? "nav-link-active" : ""
            }`}
          >
            Acara
          </Link>

          <Link
            href="/inventaris"
            className={`nav-link ${
              pathname === "/inventaris" ? "nav-link-active" : ""
            }`}
          >
            Inventaris
          </Link>
        </div>
      </nav>
    </header>
  );
}