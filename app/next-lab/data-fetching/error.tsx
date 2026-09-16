"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">Data Fetching</p>
      <h1 className="theme-text mt-3 text-4xl font-black">خطا در دریافت داده</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        اگر API خطا بدهد، Next.js این Error Boundary را نمایش می‌دهد.
      </p>
      <button
        onClick={() => reset()}
        className="theme-primary-button mt-6 rounded-full px-6 py-3 font-bold"
      >
        تلاش دوباره
      </button>
    </main>
  );
}
