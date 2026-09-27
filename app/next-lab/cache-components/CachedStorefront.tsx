import { cacheLife } from "next/cache";
import { ProductDemo } from "../../features/home/domain/ProductDemo";

export default async function CachedStorefront() {
  "use cache";

  // این بخش در Cache Components ذخیره می‌شود؛ حتی زمان تولید HTML هم جزئی از خروجی Cache است.
  cacheLife("minutes");

  return (
    <section
      className="theme-surface rounded-3xl border p-6"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-600">🟢 Cached</p>
          <h2 className="theme-text mt-1 text-2xl font-black">محصولات فروشگاه</h2>
        </div>
        <span className="theme-muted rounded-full border px-3 py-1 text-xs font-bold">
          use cache
        </span>
      </div>

      <p className="theme-muted-strong mt-3 leading-7">
        این قسمت می‌تواند داخل Static Shell قرار بگیرد و خروجی آن برای درخواست‌های بعدی
        دوباره استفاده شود.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {ProductDemo.slice(0, 3).map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border p-4"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="theme-muted text-xs font-bold">{product.category}</p>
            <h3 className="theme-text mt-2 font-black">{product.name}</h3>
            <p className="theme-muted-strong mt-2 text-sm">{product.description}</p>
            <p className="theme-text mt-4 text-lg font-black">{product.price} تومان</p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-emerald-500/10 p-4 text-sm">
        <span className="font-bold">زمان تولید این بخش:</span>{" "}
        {new Date().toLocaleTimeString("fa-IR")}
        <span className="theme-muted mr-2">
          ← اگر Cache را ببینی، این زمان می‌تواند بین درخواست‌ها ثابت بماند.
        </span>
      </div>
    </section>
  );
}
