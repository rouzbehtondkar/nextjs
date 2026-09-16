import Link from "next/link";

const topics = [
  ["SSR", "/next-lab/ssr", "هر درخواست دوباره روی سرور رندر می‌شود."],
  ["CSR", "/next-lab/csr", "رندر تعاملی در مرورگر با Client Component."],
  ["SSG", "/next-lab/ssg", "صفحه به‌صورت استاتیک تولید می‌شود."],
  ["ISR", "/next-lab/isr", "صفحه استاتیک است و بعد از زمان مشخص دوباره تولید می‌شود."],
  ["Server Component", "/next-lab/server-component", "بدون use client؛ کد کامپوننت روی سرور اجرا می‌شود."],
  ["Client Component", "/next-lab/client-component", "با use client؛ مناسب state و eventهای مرورگر."],
  ["Data Fetching", "/next-lab/data-fetching", "REST API واقعی، fetch، loading و error handling."],
  ["Cache", "/next-lab/cache", "force-cache، no-store و revalidation را عملی ببین."],
] as const;

export default function NextLab() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <p className="theme-muted text-sm font-bold">Next.js Lab</p>
        <h1 className="theme-text mt-3 text-4xl font-black">Next.js را با پروژه خودمان یاد بگیریم</h1>
        <p className="theme-muted-strong mt-4 max-w-2xl leading-8">
          هر کارت یک صفحه واقعی از همین پروژه است. وارد هر صفحه شو، رفتار آن را ببین و بعد با هم بررسی می‌کنیم چه اتفاقی در Server و Browser می‌افتد.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {topics.map(([title, href, description]) => (
          <Link key={href} href={href} className="theme-surface rounded-3xl border p-6 transition hover:-translate-y-1" style={{ borderColor: "var(--border)" }}>
            <h2 className="theme-text text-xl font-black">{title}</h2>
            <p className="theme-muted-strong mt-3 leading-7">{description}</p>
            <span className="theme-muted mt-5 inline-block text-sm font-bold">مشاهده دمو ←</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
