export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">Data Fetching</p>
      <h1 className="theme-text mt-3 text-4xl font-black">در حال دریافت داده...</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="theme-surface animate-pulse rounded-3xl border p-6"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="theme-muted h-4 w-20 rounded" />
            <div className="theme-muted mt-4 h-6 w-3/4 rounded" />
            <div className="theme-muted mt-4 h-16 w-full rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
