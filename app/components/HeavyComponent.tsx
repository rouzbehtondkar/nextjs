"use client";

// این همان کامپوننتی است که می‌خواهیم Lazy Load شود.
// یعنی کد این کامپوننت قرار نیست از همان ابتدا همراه کد اصلی صفحه دانلود شود.
// وقتی کاربر به آن نیاز پیدا کند، Next.js آن را به صورت جداگانه لود می‌کند.
export default function HeavyComponent() {
  return (
    <div className="mt-8 w-full rounded-2xl border border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-xl font-semibold text-black dark:text-white">
        Lazy Loaded Component 🚀
      </h2>

      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        This component is loaded separately with Next.js dynamic import.
      </p>
    </div>
  );
}
