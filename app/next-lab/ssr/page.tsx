export const dynamic = "force-dynamic";

export default function SSRPage() {
  const renderedAt = new Date().toLocaleString("fa-IR");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">SSR</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Server-Side Rendering</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        این صفحه در هر درخواست به‌صورت پویا روی سرور رندر می‌شود.
      </p>
      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <p className="theme-muted">زمان رندر روی سرور:</p>
        <p className="theme-text mt-2 text-2xl font-black">{renderedAt}</p>
        <p className="theme-muted mt-5 text-sm leading-7">
          صفحه را Refresh کن؛ زمان باید دوباره محاسبه شود.
        </p>
      </div>
    </main>
  );
}
