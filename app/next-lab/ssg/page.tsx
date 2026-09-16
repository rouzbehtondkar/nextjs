export default function SSGPage() {
  const generatedAt = new Date().toLocaleString("fa-IR");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">SSG</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Static Site Generation</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        این صفحه نمونه‌ای از صفحه استاتیک است؛ محتوای آن هنگام Build تولید می‌شود و برای درخواست‌های بعدی دوباره محاسبه نمی‌شود.
      </p>
      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <p className="theme-muted">زمان تولید صفحه:</p>
        <p className="theme-text mt-2 text-2xl font-black">{generatedAt}</p>
        <p className="theme-muted mt-5 text-sm leading-7">
          برای دیدن رفتار واقعی، یک Build بگیر و بعد صفحه را چند بار Refresh کن.
        </p>
      </div>
    </main>
  );
}
