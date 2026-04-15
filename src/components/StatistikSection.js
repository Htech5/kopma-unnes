"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const statsData = [
  {
    value: 265,
    label: "Anggota",
  },
  {
    value: 19,
    label: "Pengurus",
  },
  {
    value: 19,
    label: "Staf",
  },
  {
    value: 5,
    label: "Unit Usaha",
  },
];

function AnimatedNumber({ value, duration = 1800, startAnimation }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(progress * value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [value, duration, startAnimation]);

  return <span>{displayValue}</span>;
}

export default function StatistikSection() {
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="statistik-kami" ref={sectionRef} aria-label="Statistik KOPMA UNNES">
      <div className="statistik-kami__inner">
        <div className="statistik-kami__background" aria-hidden="true">
          <Image
            src="/images/background-card.png"
            alt=""
            fill
            className="statistik-kami__background-image"
            sizes="100vw"
          />
        </div>

        <div className="statistik-kami__overlay" />

        <div className="statistik-kami__grid">
          {statsData.map((item) => (
            <div key={item.label} className="statistik-kami__item">
              <p className="statistik-kami__number">
                <AnimatedNumber
                  value={item.value}
                  duration={1800}
                  startAnimation={startAnimation}
                />
              </p>
              <p className="statistik-kami__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
