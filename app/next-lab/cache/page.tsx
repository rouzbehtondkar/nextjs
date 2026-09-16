import Link from "next/link";

const demos = [
  ["force-cache", "/next-lab/cache/force-cache", "داده را Cache کن و تا وقتی Cache معتبر است دوباره Fetch نکن."],
  ["no-store", "/next-lab/cache/no-store", "برای هر Request دوباره از API داده بگیر."],
  ["revalidate", "/next-lab/cache/revalidate", "داده را Cache کن و بعد از زمان مشخص اجازه تولید نسخه جدید بده."],
] as const;

export default function CachePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">Cache Lab</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Cache را با چشم ببینیم</h1>
      <p className="theme-muted-strong mt-5 max-w-3xl leading-8">
        هر سه صفحه یک API واقعی را با استراتژی متفاوت Fetch می‌کنند. زمان تولید صفحه را ببین و بعد چند بار Refresh کن.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {demos.map(([title, href, description]) => (
          <Link
            key={href}
            href={href}
            className="theme-surface rounded-3xl border p-6 transition hover:-translate-y-1"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="theme-text text-xl font-black">{title}</h2>
            <p className="theme-muted-strong mt-3 leading-7">{description}</p>
            <span className="theme-muted mt-5 inline-block text-sm font-bold">مشاهده دمو ←</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
