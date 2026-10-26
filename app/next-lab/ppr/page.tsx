import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { connection } from "next/server";

const products = [
  { id: 1, name: "هدفون بی‌سیم", price: "۲٬۴۹۰٬۰۰۰", description: "برای تمرکز و موسیقی روزمره" },
  { id: 2, name: "ماگ مینیمال", price: "۳۹۰٬۰۰۰", description: "ساده، خوش‌ساخت و کاربردی" },
  { id: 3, name: "چراغ رومیزی", price: "۱٬۲۹۰٬۰۰۰", description: "نور ملایم برای میز کار" },
];

// این بخش Cache می‌شود و می‌تواند داخل پوستهٔ ازپیش‌آمادهٔ صفحه قرار بگیرد.
async function CachedProducts() {
  "use cache";
  cacheLife("hours");

  const generatedAt = new Date().toLocaleString("fa-IR");

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="theme-text text-2xl font-black">محصولات پیشنهادی</h2>
          <p className="theme-muted mt-2 text-sm">این بخش از محتوای Cache شده ساخته می‌شود.</p>
        </div>
        <span className="theme-muted text-xs">زمان تولید بخش Cache: {generatedAt}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="theme-surface rounded-2xl border p-5"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="theme-surface-alt mb-4 flex h-24 items-center justify-center rounded-xl text-3xl">
              {product.id === 1 ? "🎧" : product.id === 2 ? "☕" : "💡"}
            </div>
            <h3 className="theme-text font-bold">{product.name}</h3>
            <p className="theme-muted mt-2 text-sm">{product.description}</p>
            <p className="theme-text mt-4 font-black">{product.price} تومان</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// این بخش عمداً در زمان درخواست اجرا می‌شود تا رفتار PPR و Streaming را ببینیم.
async function LiveInventory() {
  await connection();

  // تأخیر نمایشی است تا بتوانی Loading را در مرورگر مشاهده کنی.
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const checkedAt = new Date().toLocaleString("fa-IR");

  return (
    <div
      className="mt-4 rounded-2xl border p-5"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="theme-muted text-sm">بخش پویا · بعد از درخواست سرور آماده شد</p>
          <h2 className="theme-text mt-2 text-xl font-black">وضعیت موجودی انبار</h2>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-500">
          موجود
        </span>
      </div>
      <p className="theme-muted-strong mt-3 leading-7">
        موجودی نمونه: ۱۲ عدد · زمان بررسی: {checkedAt}
      </p>
    </div>
  );
}

function InventoryFallback() {
  return (
    <div
      className="mt-4 animate-pulse rounded-2xl border p-5"
      style={{ borderColor: "var(--border)" }}
      aria-live="polite"
    >
      <p className="theme-muted text-sm">بخش پویا · Suspense fallback</p>
      <div className="theme-surface-alt mt-4 h-5 w-40 rounded" />
      <div className="theme-surface-alt mt-3 h-4 w-full max-w-md rounded" />
      <p className="theme-muted mt-4 text-sm">در حال بررسی موجودی انبار...</p>
    </div>
  );
}

export default function PartialPrerenderingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <p className="theme-muted text-sm font-bold">NEXT.JS LAB / PPR</p>
      <h1 className="theme-text mt-3 text-3xl font-black sm:text-4xl">
        Partial Prerendering
      </h1>
      <p className="theme-muted-strong mt-5 max-w-3xl leading-8">
        این صفحه یک پوستهٔ آماده، یک بخش Cache شده و یک بخش پویا دارد. قرار نیست برای
        نمایش کل صفحه منتظر موجودی انبار بمانیم؛ محتوای آماده زودتر می‌آید و بخش پویا
        پس از آماده‌شدن به آن اضافه می‌شود.
      </p>

      <div
        className="mt-6 rounded-2xl border p-4 text-sm leading-7"
        style={{ borderColor: "var(--border)", background: "var(--surface-alt)" }}
      >
        <strong className="theme-text">چیزی که باید ببینی:</strong>
        <span className="theme-muted-strong"> عنوان و محصولات اول نمایش داده می‌شوند؛ بخش موجودی حدود ۳ ثانیه Loading دارد و بعد کامل می‌شود.</span>
      </div>

      <CachedProducts />

      <section className="mt-10">
        <div className="mb-4">
          <p className="theme-muted text-sm font-bold">DYNAMIC HOLE</p>
          <h2 className="theme-text mt-2 text-2xl font-black">اطلاعاتی که در زمان درخواست می‌رسد</h2>
        </div>
        <Suspense fallback={<InventoryFallback />}>
          <LiveInventory />
        </Suspense>
      </section>

      <section
        className="theme-surface-alt mt-10 rounded-2xl border p-5"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="theme-text font-black">راهنمای کد</h2>
        <ul className="theme-muted-strong mt-3 list-inside list-disc space-y-2 text-sm leading-7">
          <li><code>cacheComponents: true</code> در تنظیمات پروژه، PPR را در Next.js 16 فعال می‌کند.</li>
          <li><code>use cache</code> و <code>cacheLife</code> بخش محصولات را قابل Cache می‌کنند.</li>
          <li><code>Suspense</code> و <code>connection()</code> بخش موجودی را به زمان درخواست موکول می‌کنند.</li>
          <li>تأخیر ۳ ثانیه‌ای فقط برای آموزش است؛ در پروژهٔ واقعی با دریافت داده از API یا دیتابیس جایگزینش کن.</li>
        </ul>
      </section>
    </main>
  );
}
