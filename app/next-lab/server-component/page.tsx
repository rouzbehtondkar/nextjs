export default function ServerComponentPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">Server Component</p>
      <h1 className="theme-text mt-3 text-4xl font-black">کامپوننت سمت سرور</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        این فایل هیچ use client ندارد؛ بنابراین در App Router یک Server Component است و به‌صورت پیش‌فرض روی سرور اجرا می‌شود.
      </p>
      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <p className="theme-text text-lg font-black">نکته اصلی</p>
        <p className="theme-muted mt-3 leading-7">
          Server Component برای گرفتن داده، ساخت HTML و نگه داشتن منطق سروری در سمت سرور مناسب است؛ برای state و onClick باید Client Component داشته باشیم.
        </p>
      </div>
    </main>
  );
}
