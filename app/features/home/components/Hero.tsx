"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    category: "تکنولوژی",
    title: "لپ‌تاپ‌های مدرن برای کار و خلاقیت",
    description: "انتخابی تمیز و حرفه‌ای برای روزهایی که سرعت و کیفیت مهم‌اند.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85",
  },
  {
    category: "لوازم دیجیتال",
    title: "صدایی که جزئیات را زنده می‌کند",
    description: "هدفون‌های خوش‌ساخت برای موسیقی، کار و لحظه‌های شخصی شما.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    category: "اسمارت‌واچ",
    title: "تکنولوژی روی مچ دست شما",
    description: "ترکیبی از طراحی مینیمال و امکانات هوشمند برای سبک زندگی امروز.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
  },
  {
    category: "گیمینگ",
    title: "وقت بازی، جدی‌تر از همیشه",
    description: "تجهیزات گیمینگ با ظاهر جذاب برای تجربه‌ای متفاوت.",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = slides[activeSlide];

  const goToPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section className="home-hero overflow-hidden">
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <span className="theme-border theme-muted inline-flex rounded-full border bg-white/5 px-4 py-2 text-xs font-bold backdrop-blur">
            {currentSlide.category}
          </span>
          <h1 className="theme-text mt-6 max-w-2xl text-5xl font-black leading-[1.15] tracking-tight sm:text-6xl">
            {currentSlide.title}
          </h1>
          <p className="theme-muted-strong mt-6 max-w-xl text-lg leading-8">
            {currentSlide.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#products"
              className="theme-primary-button rounded-full px-7 py-3.5 text-center text-sm font-bold transition hover:-translate-y-0.5 hover:opacity-90"
            >
              مشاهده محصولات
            </a>
            <Link
              href="/login"
              className="theme-secondary-button rounded-full border px-7 py-3.5 text-center text-sm font-bold transition"
            >
              حساب کاربری من
            </Link>
          </div>
          <div className="theme-muted mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
            <span>✓ ارسال سریع</span>
            <span>✓ ضمانت کیفیت</span>
            <span>✓ پرداخت امن</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div
            className="theme-surface relative mx-auto aspect-[4/5] max-w-xl overflow-hidden rounded-[2rem] border shadow-2xl shadow-black/30 sm:aspect-square"
            style={{ borderColor: "var(--border)" }}
          >
            {slides.map((slide, index) => (
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  index === activeSlide ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-white/70">{String(activeSlide + 1).padStart(2, "0")} / 04</p>
                  <p className="mt-2 text-xl font-black text-white sm:text-2xl">{currentSlide.category}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="اسلاید قبلی"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-lg text-white backdrop-blur transition hover:bg-white/20"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="اسلاید بعدی"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-lg text-white backdrop-blur transition hover:bg-white/20"
                  >
                    ←
                  </button>
                </div>
              </div>

              <div className="mt-5 flex gap-2" aria-label="انتخاب اسلاید">
                {slides.map((slide, index) => (
                  <button
                    key={slide.category}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`رفتن به اسلاید ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeSlide ? "w-10 bg-white" : "w-5 bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
