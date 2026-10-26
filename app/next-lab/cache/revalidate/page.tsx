import { cacheLife } from "next/cache";
import { connection } from "next/server";
import ClientApiDemo from "./ClientApiDemo";
import RevalidateTest from "./RevalidateTest";

type Post = { id: number; title: string };
type CachedPost = Post & {
  apiFetchedAt: string;
  apiFetchedAtTimestamp: number;
};

// Cache داده مستقل از رندر صفحه است؛ هر ۲۰ ثانیه می‌تواند در پس‌زمینه تازه شود.
async function getCachedPost(): Promise<CachedPost> {
  "use cache";
  cacheLife({ revalidate: 20 });

  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const post: Post = await response.json();
  const fetchedAt = new Date();

  return {
    ...post,
    apiFetchedAt: fetchedAt.toLocaleString("fa-IR"),
    apiFetchedAtTimestamp: fetchedAt.getTime(),
  };
}

export default async function RevalidatePage() {
  // زمان صفحه و شناسه هر بار در زمان درخواست واقعی تولید می‌شوند.
  await connection();

  const pageStartedAt = Date.now();
  const generatedAt = new Date(pageStartedAt).toLocaleString("fa-IR");
  const renderId = crypto.randomUUID();
  const post = await getCachedPost();

  const cacheHit = post.apiFetchedAtTimestamp < pageStartedAt;

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
          <p className="theme-text text-lg font-black">💾 نتیجه واقعی Cache</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <p className="theme-muted text-sm">وضعیت</p>
              <p className="theme-text mt-1 text-lg font-black">
                {cacheHit ? "🟢 Cache Hit" : "🔄 API Fetch"}
              </p>
            </div>

            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <p className="theme-muted text-sm">زمان تولید صفحه</p>
              <p className="theme-text mt-1 font-bold">{generatedAt}</p>
            </div>

            <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <p className="theme-muted text-sm">آخرین API Fetch</p>
              <p className="theme-text mt-1 font-bold">{post.apiFetchedAt}</p>
            </div>
          </div>

          <p className="theme-muted mt-4 text-sm leading-7">
            اگر زمان تولید صفحه عوض شود ولی «آخرین API Fetch» همان بماند، یعنی صفحه دوباره تولید شده اما داده از Cache آمده است. اگر «آخرین API Fetch» هم عوض شود، Cache دوباره از API پر شده است.
          </p>
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
          <p className="theme-text font-bold">تست پیشنهادی</p>
          <ol className="theme-muted mt-3 list-decimal space-y-2 pr-5 text-sm leading-7">
            <li>صفحه را باز کن و «آخرین API Fetch» را یادداشت کن.</li>
            <li>قبل از ۲۰ ثانیه Refresh کن؛ زمان تولید صفحه باید تغییر کند ولی API Fetch معمولاً ثابت می‌ماند.</li>
            <li>بعد از ۲۰ ثانیه Refresh کن؛ درخواست بعدی می‌تواند نسخه قبلی را نشان دهد و بازتولید را در پس‌زمینه آغاز کند. پس از تکمیل بازتولید، زمان API Fetch جدید را می‌بینی.</li>
            <li>برای دیدن API Request در Network، بخش Client Fetch پایین صفحه را استفاده کن؛ آن بخش عمداً جدا از Server Cache است.</li>
          </ol>
        </div>

        <ClientApiDemo />
      </div>
    </main>
  );
}
