import ClientApiDemo from "./ClientApiDemo";
import RevalidateTest from "./RevalidateTest";

 type Post = { id: number; title: string };

export const revalidate = 20;

export default async function RevalidatePage() {
  const generatedAt = new Date().toLocaleString("fa-IR");
  const renderId = crypto.randomUUID();

  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    next: { revalidate: 20 },
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const post: Post = await response.json();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">revalidate</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Cache + Revalidation</h1>

      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm">نسخه فعلی صفحه</p>
          <p className="theme-text mt-2 text-2xl font-black">{generatedAt}</p>

          <p className="theme-muted mt-5 text-sm">Render ID</p>
          <p className="theme-text mt-2 break-all font-mono text-sm">{renderId}</p>
        </div>

        <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-text text-lg font-black">💾 Cache در این تست کجاست؟</p>
          <div className="mt-4 grid gap-3 text-sm leading-7">
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <span className="font-black">Request اول:</span> Next.js از JSONPlaceholder داده می‌گیرد و نتیجه را در Data Cache نگه می‌دارد.
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <span className="font-black">Requestهای بعدی تا ۲۰ ثانیه:</span> Next.js می‌تواند همان نتیجه Cache‌شده را استفاده کند، بدون اینکه دوباره همان Fetch را اجرا کند.
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border) }}>
              <span className="font-black">بعد از ۲۰ ثانیه:</span> داده برای Revalidation واجد شرایط می‌شود؛ درخواست بعدی می‌تواند باعث دریافت نسخه جدید شود.
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">Cache</p>
            <p className="theme-text mt-1 font-black">فعال</p>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">Revalidate</p>
            <p className="theme-text mt-1 font-black">هر ۲۰ ثانیه</p>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="theme-muted text-sm">Fetch</p>
            <p className="theme-text mt-1 font-black">Server</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted">Server API response:</p>
          <p className="theme-text mt-2 font-bold">#{post.id} — {post.title}</p>
        </div>

        <RevalidateTest />

        <div className="mt-6 rounded-2xl bg-black/5 p-5 dark:bg-white/5">
          <p className="theme-text font-bold">چطور واقعاً Cache را تست کنیم؟</p>
          <ol className="theme-muted mt-3 list-decimal space-y-2 pr-5 text-sm leading-7">
            <li>صفحه را باز کن و Render ID را یادداشت کن.</li>
            <li>قبل از صفر شدن شمارنده Refresh کن؛ در حالت Cache، داده Cache‌شده می‌تواند همان نسخه را نگه دارد.</li>
            <li>بعد از صفر شدن Refresh کن؛ در یک اجرای Production، درخواست بعدی می‌تواند Revalidation را فعال کند.</li>
            <li>برای دیدن API Request در مرورگر، بخش پایین صفحه را استفاده کن؛ آن بخش عمداً Client Fetch است.</li>
          </ol>
        </div>

        <ClientApiDemo />
      </div>
    </main>
  );
}
