type Post = { id: number; title: string };

export default async function NoStorePage() {
  const generatedAt = new Date().toLocaleString("fa-IR");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const post: Post = await response.json();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">no-store</p>
      <h1 className="theme-text mt-3 text-4xl font-black">No Cache</h1>
      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <p className="theme-muted">زمان اجرای Server Component:</p>
        <p className="theme-text mt-2 text-2xl font-black">{generatedAt}</p>
        <p className="theme-muted mt-6">API response:</p>
        <p className="theme-text mt-2 font-bold">#{post.id} — {post.title}</p>
        <p className="theme-muted mt-6 text-sm leading-7">
          چند بار Refresh کن. با no-store، Fetch برای هر Request دوباره اجرا می‌شود.
        </p>
      </div>
    </main>
  );
}
