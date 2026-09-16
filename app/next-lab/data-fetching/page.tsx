type Post = {
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");

  if (!response.ok) {
    throw new Error("دریافت محصولات از API با خطا مواجه شد.");
  }

  return response.json();
}

export default async function DataFetchingPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">Data Fetching</p>
      <h1 className="theme-text mt-3 text-4xl font-black">اتصال واقعی به API</h1>
      <p className="theme-muted-strong mt-5 max-w-3xl leading-8">
        این صفحه از JSONPlaceholder داده واقعی HTTP می‌گیرد، پاسخ API را بررسی می‌کند و نتیجه را در Server Component نمایش می‌دهد.
      </p>

      <div className="theme-surface mt-8 rounded-3xl border p-6" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="theme-muted text-sm">API</p>
            <p className="theme-text mt-1 font-bold">GET /posts?_limit=6</p>
          </div>
          <span className="rounded-full border px-3 py-1 text-sm font-bold">REST + Fetch</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="theme-surface rounded-3xl border p-6"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="theme-muted text-sm">Post #{post.id}</p>
            <h2 className="theme-text mt-2 text-xl font-black capitalize">{post.title}</h2>
            <p className="theme-muted-strong mt-3 leading-7">{post.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
