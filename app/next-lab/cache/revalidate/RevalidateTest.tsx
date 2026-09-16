"use client";

import { useEffect, useState } from "react";

const REVALIDATE_SECONDS = 20;

export default function RevalidateTest() {
  const [secondsLeft, setSecondsLeft] = useState(REVALIDATE_SECONDS);

  useEffect(() => {
    const startedAt = Date.now();

    const update = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setSecondsLeft(Math.max(REVALIDATE_SECONDS - elapsed, 0));
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const refreshPage = () => window.location.reload();

  return (
    <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
      <p className="theme-text text-lg font-black">🧪 تست ۲۰ ثانیه‌ای Cache</p>
      <p className="theme-muted mt-2 text-sm leading-7">
        این شمارنده فقط برای مشاهده زمان است. وقتی صفر شد، صفحه را Refresh کن و Render ID و زمان بالا را با قبل مقایسه کن.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-5 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm">زمان باقی‌مانده</p>
          <p className="theme-text mt-2 text-4xl font-black tabular-nums">{secondsLeft}s</p>
        </div>

        <button
          type="button"
          onClick={refreshPage}
          className="rounded-2xl border px-5 py-4 font-black transition hover:-translate-y-0.5"
          style={{ borderColor: "var(--border)" }}
        >
          🔄 Refresh برای تست
        </button>
      </div>

      <div className="theme-muted mt-5 text-sm leading-7">
        <p>۱. قبل از صفر شدن Refresh کن → نسخه Cache را ببین.</p>
        <p>۲. بعد از صفر شدن دوباره Refresh کن → Next.js اجازه بازتولید نسخه جدید را دارد.</p>
      </div>
    </div>
  );
}
