import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950">
            ن
          </span>
          <span className="text-xl font-black tracking-tight text-white">نُوا</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-400 md:flex" aria-label="منوی اصلی">
          <Link className="transition hover:text-white" href="/">خانه</Link>
          <a className="transition hover:text-white" href="#products">محصولات</a>
          <a className="transition hover:text-white" href="#features">مزایا</a>
          <a className="transition hover:text-white" href="#about">درباره ما</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-white sm:block">
            ورود
          </Link>
          <Link href="/login" className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">
            شروع خرید
          </Link>
        </div>
      </div>
    </header>
  );
}
