"use client";

import { useEffect, useState } from "react";
import { useProducts } from "../../features/products/hooks/useProducts";

export default function ProductsQueryDemo() {
  const [shouldFail, setShouldFail] = useState(false);
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    refetch,
    dataUpdatedAt,
    isStale,
  } = useProducts(shouldFail);

  // هر ثانیه فقط شمارش معکوس UI را تازه می‌کنیم تا Fresh → Stale را جلوی چشم ببینیم.
  // زمان فعلی را بعد از mount شدن Client Component از داخل useEffect می‌گیریم.
  // این کار جلوی اجرای Date.now() هنگام prerender شدن Client Component را می‌گیرد.
  const [now, setNow] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const freshUntil = dataUpdatedAt ? dataUpdatedAt + 30 * 1000 : 0;
  const secondsLeft = freshUntil ? Math.max(0, Math.ceil((freshUntil - now) / 1000)) : 0;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <p className="theme-muted text-sm font-bold">TanStack Query</p>
        <h1 className="theme-text mt-3 text-4xl font-black">Server State را با چشم ببین</h1>
        <p className="theme-muted-strong mt-4 max-w-3xl leading-8">
          Redux در پروژه ما برای State خود برنامه است؛ این صفحه نشان می‌دهد
          داده‌ای که از Server می‌آید چطور با React Query مدیریت، Cache و دوباره
          دریافت می‌شود.
        </p>
      </div>

      <section className="theme-surface rounded-3xl border p-6" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="theme-muted text-sm">Query Key</p>
            <p className="theme-text mt-1 font-mono text-sm">
              {shouldFail ? '["products", {"shouldFail": true}]' : '["products", {"shouldFail": false}]'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="theme-primary-button rounded-xl px-5 py-3 text-sm font-bold disabled:opacity-60"
          >
            {isFetching ? "در حال دریافت..." : "Refetch"}
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">وضعیت</p>
            <p className="theme-text mt-1 font-black">
              {isLoading ? "⏳ Loading" : isError ? "🔴 Error" : "🟢 Success"}
            </p>
          </div>

          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">در حال Fetch</p>
            <p className="theme-text mt-1 font-black">{isFetching ? "بله" : "خیر"}</p>
          </div>

          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">Cache</p>
            <p className="theme-text mt-1 font-black">
              {isStale ? "🟡 Stale" : "🟢 Fresh"}
            </p>
          </div>

          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">Fresh تا</p>
            <p className="theme-text mt-1 font-black">
              {dataUpdatedAt ? `${secondsLeft} ثانیه` : "هنوز دریافت نشده"}
            </p>
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-bold" style={{ borderColor: "var(--border)" }}>
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(event) => setShouldFail(event.target.checked)}
          />
          شبیه‌سازی خطای 500 سرور
        </label>

        {isError ? (
          <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="font-black text-red-500">درخواست شکست خورد</p>
            <p className="mt-2 text-sm leading-7">{error.message}</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data?.map((product) => (
              <article
                key={product.id}
                className="theme-surface-alt rounded-2xl border p-5"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="theme-muted text-xs font-bold">{product.category}</p>
                <h2 className="theme-text mt-2 font-black">{product.name}</h2>
                <p className="theme-muted-strong mt-2 text-sm">
                  {product.price.toLocaleString("fa-IR")} تومان
                </p>
                <p className="theme-muted mt-3 text-xs">{product.deliveryInfo}</p>
              </article>
            ))}
          </div>
        )}

        <div className="theme-muted mt-6 rounded-2xl bg-black/5 p-5 text-sm leading-7 dark:bg-white/5">
          <p className="theme-text font-black">تست اولیه</p>
          <p className="mt-2">
            یک بار صفحه را باز کن، Refetch بزن، بعد خطای 500 را روشن کن و دوباره
            Refetch بزن. بعد برمی‌گردیم و تک‌تک کدها را خیلی ساده باز می‌کنیم.
          </p>
        </div>
      </section>
    </main>
  );
}
