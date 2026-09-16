export const revalidate = 10;

export default function ISRPage() {
  const generatedAt = new Date().toLocaleString("fa-IR");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">ISR</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Incremental Static Regeneration</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        این صفحه استاتیک است، اما Next.js اجازه دارد حداقل هر ۱۰ ثانیه نسخه آن را دوباره تولید کند.
      </p>
      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <p className="theme-muted">زمان تولید نسخه فعلی:</p>
        <p className="theme-text mt-2 text-2xl font-black">{generatedAt}</p>
        <p className="theme-muted mt-5 text-sm leading-7">
          چند بار Refresh کن؛ در بازه کوتاه ممکن است همان نسخه قبلی را ببینی و بعد از منقضی شدن، نسخه جدید ساخته شود.
        </p>
      </div>
    </main>
  );
}
