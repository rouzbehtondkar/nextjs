"use client";

import { useState } from "react";

type LikeStatus = "idle" | "pending" | "success" | "error";

export default function OptimisticUiPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [status, setStatus] = useState<LikeStatus>("idle");
  const [simulateFailure, setSimulateFailure] = useState(false);

  async function handleLike() {
    if (status === "pending") return;

    // مقدار قبلی را نگه می‌داریم تا اگر سرور خطا داد، UI را برگردانیم.
    const previousLiked = liked;
    const previousCount = likeCount;
    const nextLiked = !previousLiked;
    const nextCount = previousCount + (nextLiked ? 1 : -1);

    // Optimistic Update: قبل از دریافت پاسخ سرور، UI را فوراً به‌روز می‌کنیم.
    setLiked(nextLiked);
    setLikeCount(nextCount);
    setStatus("pending");

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          liked: nextLiked,
          count: nextCount,
          simulateFailure,
        }),
      });

      const result = (await response.json()) as {
        liked?: boolean;
        count?: number;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "ثبت لایک ناموفق بود.");
      }

      // پاسخ موفق سرور را مبنای نهایی UI قرار می‌دهیم.
      setLiked(Boolean(result.liked));
      setLikeCount(Number(result.count ?? nextCount));
      setStatus("success");
    } catch (error) {
      // Rollback: چون سرور تأیید نکرد، تغییر خوش‌بینانه را برمی‌گردانیم.
      setLiked(previousLiked);
      setLikeCount(previousCount);
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">React Interaction Lab</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Optimistic UI</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        لایک را فوراً در رابط کاربری تغییر می‌دهیم و هم‌زمان درخواست را به API می‌فرستیم.
        اگر سرور خطا بدهد، مقدار قبلی برمی‌گردد. این API آموزشی است و چیزی را در دیتابیس ذخیره نمی‌کند.
      </p>

      <section
        className="theme-surface mt-8 rounded-3xl border p-6 sm:p-8"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="theme-muted text-sm">پست فرضی فروشگاه نُوا</p>
            <h2 className="theme-text mt-2 text-2xl font-black">این محصول رو می‌پسندم!</h2>
            <p className="theme-muted-strong mt-3 leading-7">
              دکمه را بزن و به تغییر فوری تعداد لایک دقت کن؛ پاسخ API عمداً ۱٫۴ ثانیه تأخیر دارد.
            </p>
          </div>
          <div className="text-4xl" aria-hidden="true">🛍️</div>
        </div>

        <div className="theme-surface-alt mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="theme-text text-3xl font-black tabular-nums" aria-live="polite">
                {likeCount.toLocaleString("fa-IR")} لایک
              </p>
              <p className="theme-muted mt-1 text-sm">
                وضعیت: {liked ? "لایک شده" : "لایک نشده"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLike}
              disabled={status === "pending"}
              aria-pressed={liked}
              className="theme-primary-button rounded-full px-6 py-3 font-bold transition disabled:cursor-wait disabled:opacity-60"
            >
              {status === "pending" ? "در حال تأیید..." : liked ? "♥ لغو لایک" : "♡ لایک"}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label className="theme-text flex cursor-pointer items-center gap-3 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
            <input
              type="checkbox"
              checked={simulateFailure}
              disabled={status === "pending"}
              onChange={(event) => setSimulateFailure(event.target.checked)}
              className="h-4 w-4 accent-current"
            />
            <span>
              <span className="block font-bold">خطای سرور را شبیه‌سازی کن</span>
              <span className="theme-muted mt-1 block text-sm">درخواست بعدی پاسخ 500 می‌گیرد تا Rollback را ببینی.</span>
            </span>
          </label>
        </div>

        <div
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className="mt-5 rounded-2xl border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          {status === "idle" && (
            <p className="theme-muted-strong">آماده‌ای؟ ابتدا حالت عادی را امتحان کن، بعد خطای سرور را فعال کن.</p>
          )}
          {status === "pending" && (
            <p className="theme-text">UI همین حالا تغییر کرده؛ منتظر پاسخ سرور هستیم…</p>
          )}
          {status === "success" && (
            <p className="theme-text">✅ سرور موفقیت را تأیید کرد؛ تغییر در UI باقی می‌ماند.</p>
          )}
          {status === "error" && (
            <p className="theme-text">❌ سرور خطا داد؛ تغییر خوش‌بینانه برگردانده شد و UI به مقدار قبلی برگشت.</p>
          )}
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="theme-surface rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm font-bold">۱. Optimistic Update</p>
          <p className="theme-text mt-2 leading-7">UI قبل از پاسخ سرور فوراً تغییر می‌کند.</p>
        </div>
        <div className="theme-surface rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm font-bold">۲. Server Confirmation</p>
          <p className="theme-text mt-2 leading-7">در موفقیت، پاسخ API وضعیت را تأیید می‌کند.</p>
        </div>
        <div className="theme-surface rounded-2xl border p-5" style={{ borderColor: "var(--border)" }}>
          <p className="theme-muted text-sm font-bold">۳. Rollback</p>
          <p className="theme-text mt-2 leading-7">در خطا، مقدار قبلی بازیابی می‌شود.</p>
        </div>
      </section>
    </main>
  );
}
