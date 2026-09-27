import { Suspense } from "react";
import CachedStorefront from "./CachedStorefront";
import DynamicStoreStatus from "./DynamicStoreStatus";

function DynamicFallback() {
  return (
    <section
      className="theme-surface rounded-3xl border p-6"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="theme-muted text-sm font-bold">⏳ در حال آماده‌سازی بخش Dynamic...</p>
      <div className="theme-muted mt-3 h-20 animate-pulse rounded-2xl bg-black/5 dark:bg-white/5" />
    </section>
  );
}

export default function CacheComponentsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <p className="theme-muted text-sm font-bold">Next.js 16 · Cache Components</p>
        <h1 className="theme-text mt-3 text-4xl font-black">
          یک صفحه، دو رفتار: Cache + Dynamic
        </h1>
        <p className="theme-muted-strong mt-4 max-w-3xl leading-8">
          این دمو دقیقاً ایده Partial Pre-Rendering را شبیه‌سازی می‌کند: بخش محصولات
          قابل Cache است، اما اطلاعات وابسته به Request جداگانه و Dynamic می‌ماند.
        </p>
      </div>

      <div className="grid gap-6">
        <CachedStorefront />

        <Suspense fallback={<DynamicFallback />}>
          <DynamicStoreStatus />
        </Suspense>
      </div>

      <div className="theme-surface mt-8 rounded-3xl border p-6" style={{ borderColor: "var(--border)" }}>
        <h2 className="theme-text text-xl font-black">🧠 چیزی که باید ببینی</h2>
        <ul className="theme-muted-strong mt-4 space-y-3 leading-7">
          <li>• بالای صفحه می‌تواند از قبل آماده و Cache شده باشد.</li>
          <li>• بخش Dynamic منتظر داده Request می‌ماند و بعد Stream می‌شود.</li>
          <li>• Cache شده بودن به معنی کل صفحه Cache شده نیست.</li>
          <li>• این همان ایده اصلی ترکیب Static Shell با Dynamic Hole است.</li>
        </ul>
      </div>
    </main>
  );
}
