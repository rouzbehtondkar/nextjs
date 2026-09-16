import { unstable_cache } from "next/cache";
import ClientApiDemo from "./ClientApiDemo";
import RevalidateTest from "./RevalidateTest";

type Post = { id: number; title: string };
type CachedPost = Post & { apiFetchedAt: string };

export const revalidate = 20;

const getCachedPost = unstable_cache(
  async (): Promise<CachedPost> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const post: Post = await response.json();

    return {
      ...post,
      apiFetchedAt: new Date().toLocaleString("fa-IR"),
    };
  },
  ["revalidate-demo-post-1"],
  { revalidate: 20 }
);

export default async function RevalidatePage() {
  const generatedAt = new Date().toLocaleString("fa-IR");
  const renderId = crypto.randomUUID();
  const post = await getCachedPost();

  const cacheHit = post.apiFetchedAt !== generatedAt;

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
            <li>قبل از ۲۰ ثانیه Refresh کن؛ اگر زمان تولید صفحه تغییر کند ولی API Fetch ثابت بماند، Cache Hit را می‌بینی.</li>
            <li>بیش از ۲۰ ثانیه صبر کن و دوباره Refresh کن؛ در Production، درخواست بعدی می‌تواند باعث Revalidation و تغییر زمان API Fetch شود.</li>
            <li>برای دیدن API Request در Network، بخش Client Fetch پایین صفحه را استفاده کن؛ آن بخش عمداً جدا از Server Cache است.</li>
          </ol>
        </div>

        <ClientApiDemo />
      </div>
    </main>
  );
}
