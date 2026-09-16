import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white">
            ن
          </span>
          <span className="text-xl font-black tracking-tight text-slate-950">نُوا</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex" aria-label="منوی اصلی">
          <Link className="transition hover:text-slate-950" href="/">خانه</Link>
          <a className="transition hover:text-slate-950" href="#products">محصولات</a>
          <a className="transition hover:text-slate-950" href="#features">مزایا</a>
          <a className="transition hover:text-slate-950" href="#about">درباره ما</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:block">
            ورود
          </Link>
          <Link href="/login" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
            شروع خرید
          </Link>
        </div>
      </div>
    </header>
  );
}
