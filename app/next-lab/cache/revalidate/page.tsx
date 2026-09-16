type Post = { id: number; title: string };

export const revalidate = 20;

export default async function RevalidatePage() {
  const generatedAt = new Date().toLocaleString("fa-IR");
  const requestId = crypto.randomUUID();

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

          <p className="theme-muted mt-5 text-sm">Request ID</p>
          <p className="theme-text mt-2 break-all font-mono text-sm">{requestId}</p>
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
          <p className="theme-muted">API response:</p>
          <p className="theme-text mt-2 font-bold">#{post.id} — {post.title}</p>
        </div>

        <div className="mt-6 rounded-2xl bg-black/5 p-5 dark:bg-white/5">
          <p className="theme-text font-bold">چطور Cache را ببینم؟</p>
          <ol className="theme-muted mt-3 list-decimal space-y-2 pr-5 text-sm leading-7">
            <li>این صفحه را Refresh کن.</li>
            <li>اگر Request ID همان قبلی ماند، نسخه Cache شده را می‌بینی.</li>
            <li>بیشتر از ۲۰ ثانیه صبر کن.</li>
            <li>دوباره Refresh کن؛ بعد از Revalidation، Request ID جدید می‌شود.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
