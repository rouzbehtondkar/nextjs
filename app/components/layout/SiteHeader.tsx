"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAppSelector } from "../../store/hooks";

export default function SiteHeader() {
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="site-header-logo grid h-10 w-10 place-items-center rounded-2xl text-sm font-black">
            ن
          </span>
          <span className="site-header-brand text-xl font-black tracking-tight">نُوا</span>
        </Link>

        <nav className="site-header-nav hidden items-center gap-8 text-sm font-semibold md:flex" aria-label="منوی اصلی">
          <Link className="transition" href="/">خانه</Link>
          <a className="transition" href="#products">محصولات</a>
          <a className="transition" href="#features">مزایا</a>
          <a className="transition" href="#about">درباره ما</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="theme-surface rounded-full border px-3 py-2 text-xs font-bold" style={{ borderColor: "var(--border)" }}>
            🛒 {cartCount.toLocaleString("fa-IR")}
          </span>
          <ThemeToggle />
          <Link href="/login" className="site-header-login hidden rounded-full px-4 py-2 text-sm font-bold transition sm:block">
            ورود
          </Link>
          <Link href="/login" className="site-header-cta rounded-full px-5 py-2.5 text-sm font-bold transition hover:-translate-y-0.5">
            شروع خرید
          </Link>
        </div>
      </div>
    </header>
  );
}
