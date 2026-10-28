"use client";

import { useEffect, useState } from "react";

type SearchProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
};

type SearchStatus = "idle" | "waiting" | "loading" | "success" | "error";

export default function DebounceSearchPage() {
  // چیزی که کاربر همین الان تایپ کرده است.
  const [query, setQuery] = useState("");
  // محصولاتی که از API برگشته‌اند.
  const [products, setProducts] = useState<SearchProduct[]>([]);
  // برای نمایش مرحله‌ای که جست‌وجو در آن قرار دارد.
  const [status, setStatus] = useState<SearchStatus>("idle");
  // تعداد درخواست‌هایی که واقعاً از مرورگر ارسال شده‌اند.
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // اگر ورودی خالی شد، نتیجه‌های قبلی را پاک کن و درخواست نفرست.
    if (!query.trim()) {
      setProducts([]);
      setStatus("idle");
      return;
    }

    // به کاربر می‌گوییم منتظریم؛ هنوز درخواستی به سرور نرفته است.
    setStatus("waiting");

    // تایمر می‌گوید: بعد از آخرین تایپ، ۵۰۰ میلی‌ثانیه صبر کن.
    const timerId = window.setTimeout(async () => {
      try {
        setStatus("loading");
        // شمارنده درست قبل از fetch زیاد می‌شود؛ پس تعداد درخواست‌های واقعی را می‌بینیم.
        setRequestCount((count) => count + 1);

        // فقط بعد از تمام‌شدن زمان انتظار، درخواست به API ارسال می‌شود.
        const response = await fetch(
          `/api/search-products?q=${encodeURIComponent(query.trim())}`,
        );

        if (!response.ok) {
          throw new Error("جست‌وجو ناموفق بود.");
        }

        const data = (await response.json()) as SearchProduct[];
        setProducts(data);
        setStatus("success");
      } catch {
        setProducts([]);
        setStatus("error");
      }
    }, 500);

    // اگر کاربر قبل از تمام‌شدن ۵۰۰ میلی‌ثانیه دوباره تایپ کند،
    // تایمر قبلی لغو می‌شود و یک تایمر تازه شروع خواهد شد.
    return () => window.clearTimeout(timerId);
  }, [query]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">React Performance Lab</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Debouncing در جست‌وجو</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        تایپ کن و هم‌زمان Network مرورگر را ببین. جست‌وجو فقط وقتی ارسال می‌شود
        که ۵۰۰ میلی‌ثانیه از آخرین تایپت گذشته باشد. اگر زودتر حرف دیگری بزنی،
        تایمر قبلی لغو می‌شود.
      </p>

      <section
        className="theme-surface mt-8 rounded-3xl border p-6 sm:p-8"
        style={{ borderColor: "var(--border)" }}
      >
        <label htmlFor="product-search" className="theme-text block font-bold">
          جست‌وجوی محصولات فروشگاه نُوا
        </label>
        <input
          id="product-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="مثلاً هدفون یا ساعت..."
          autoComplete="off"
          className="theme-input mt-3 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2"
          style={{ borderColor: "var(--border)" }}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="theme-surface-alt rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">درخواست‌های ارسال‌شده</p>
            <p className="theme-text mt-1 text-2xl font-black tabular-nums" aria-live="polite">
              {requestCount.toLocaleString("fa-IR")}
            </p>
          </div>
          <div className="theme-surface-alt rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">وضعیت</p>
            <p className="theme-text mt-1 font-bold" aria-live="polite">
              {status === "idle" && "منتظر تایپ"}
              {status === "waiting" && "در حال انتظار برای پایان تایپ…"}
              {status === "loading" && "در حال دریافت از سرور…"}
              {status === "success" && "جست‌وجو کامل شد"}
              {status === "error" && "خطا در جست‌وجو"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3" aria-live="polite">
          {status === "idle" && (
            <p className="theme-muted-strong rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
              برای شروع، نام یکی از محصولات را تایپ کن.
            </p>
          )}
          {status === "waiting" && (
            <p className="theme-muted-strong rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
              فعلاً درخواستی ارسال نشده؛ منتظریم تایپ تمام شود.
            </p>
          )}
          {status === "loading" && (
            <p className="theme-muted-strong rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
              درخواست ارسال شد؛ منتظر پاسخ API هستیم…
            </p>
          )}
          {status === "error" && (
            <p className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
              دریافت محصولات با خطا روبه‌رو شد. دوباره تایپ کن و امتحان کن.
            </p>
          )}
          {status === "success" && products.length === 0 && (
            <p className="theme-muted-strong rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
              محصولی با این عبارت پیدا نشد.
            </p>
          )}
          {status === "success" && products.map((product) => (
            <article
              key={product.id}
              className="theme-surface-alt flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <h2 className="theme-text font-bold">{product.name}</h2>
                <p className="theme-muted mt-1 text-sm">{product.category}</p>
              </div>
              <p className="theme-text font-bold tabular-nums">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="theme-surface rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm font-bold">۱. تایپ</p>
          <p className="theme-text mt-2 leading-7">با هر حرف، مقدار query عوض می‌شود.</p>
        </div>
        <div className="theme-surface rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm font-bold">۲. انتظار</p>
          <p className="theme-text mt-2 leading-7">تایمر ۵۰۰ میلی‌ثانیه‌ای شروع می‌شود.</p>
        </div>
        <div className="theme-surface rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm font-bold">۳. درخواست</p>
          <p className="theme-text mt-2 leading-7">اگر تایپ ادامه پیدا نکند، یک درخواست ارسال می‌شود.</p>
        </div>
      </section>
    </main>
  );
}
