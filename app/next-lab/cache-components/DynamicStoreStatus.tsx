import { headers } from "next/headers";

export default async function DynamicStoreStatus() {
  // عمداً کمی تأخیر می‌دهیم تا Dynamic بودن این قسمت را با چشم ببینیم.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") ?? "Unknown";

  return (
    <section
      className="theme-surface rounded-3xl border p-6"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-amber-600">🟡 Dynamic</p>
          <h2 className="theme-text mt-1 text-2xl font-black">اطلاعات همین درخواست</h2>
        </div>
        <span className="theme-muted rounded-full border px-3 py-1 text-xs font-bold">
          request-time
        </span>
      </div>

      <p className="theme-muted-strong mt-3 leading-7">
        این قسمت Cache نشده و هنگام درخواست آماده می‌شود؛ پس می‌تواند اطلاعات وابسته به
        همان Request را نشان بدهد.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm">زمان همین درخواست</p>
          <p className="theme-text mt-2 text-xl font-black">
            {new Date().toLocaleTimeString("fa-IR")}
          </p>
        </div>

        <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm">Browser</p>
          <p className="theme-text mt-2 break-all text-sm font-bold">{userAgent}</p>
        </div>
      </div>
    </section>
  );
}
