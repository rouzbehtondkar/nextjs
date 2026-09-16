import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#07111f]">
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur">انتخاب‌های تازه برای سبک زندگی امروز</span>
          <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.15] tracking-tight text-white sm:text-6xl">
            چیزهای خوب،
            <span className="mt-2 block text-slate-400">ساده‌تر انتخاب می‌شوند.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            مجموعه‌ای از محصولات کاربردی و خوش‌ساخت، با تجربه‌ای تمیز برای پیدا کردن چیزی که واقعاً به کارتان می‌آید.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#products" className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">مشاهده محصولات</a>
            <Link href="/login" className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-center text-sm font-bold text-slate-200 transition hover:border-white/25 hover:bg-white/10">حساب کاربری من</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-400">
            <span>✓ ارسال سریع</span><span>✓ ضمانت کیفیت</span><span>✓ پرداخت امن</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-square max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1b2d] p-6 shadow-2xl shadow-black/30">
            <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-indigo-400/15 blur-3xl" />
            <div className="relative flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[.02]">
              <div className="absolute right-[16%] top-[16%] h-20 w-20 rounded-3xl bg-white/10 backdrop-blur" />
              <div className="relative h-[62%] w-[52%] rotate-[-8deg] rounded-[2.25rem] bg-gradient-to-br from-white to-slate-200 p-5 shadow-2xl">
                <div className="flex h-full flex-col justify-between rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex justify-between text-xs font-bold text-slate-400"><span>NUVA</span><span>01</span></div>
                  <div><div className="h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500" /><p className="mt-4 text-sm font-black text-slate-900">طراحی مینیمال</p><p className="mt-1 text-xs text-slate-500">برای انتخاب‌های باکیفیت</p></div>
                </div>
              </div>
              <div className="absolute bottom-[14%] left-[12%] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-xl">ارسال رایگان برای سفارش‌های منتخب</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
