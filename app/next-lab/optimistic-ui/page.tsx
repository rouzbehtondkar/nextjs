"use client";

// useState برای نگه‌داشتن وضعیت تعاملی همین صفحه در مرورگر استفاده می‌شود.
import { useState } from "react";

// وضعیت درخواست را جدا نگه می‌داریم تا به کاربر بگوییم درخواست در حال ارسال، موفق یا ناموفق است.
type LikeStatus = "idle" | "pending" | "success" | "error";

export default function OptimisticUiPage() {
  // آیا کاربر پست را لایک کرده است؟ مقدار اولیه: خیر.
  const [liked, setLiked] = useState(false);
  // تعداد لایک‌های نمایشی؛ در این مثال آموزشی از عدد فرضی ۲۴ شروع می‌کنیم.
  const [likeCount, setLikeCount] = useState(24);
  // وضعیت درخواست API برای نمایش پیام مناسب و جلوگیری از کلیک تکراری.
  const [status, setStatus] = useState<LikeStatus>("idle");
  // این گزینه فقط برای آزمایش خطا است؛ با فعال‌کردنش API پاسخ 500 می‌دهد.
  const [simulateFailure, setSimulateFailure] = useState(false);

  async function handleLike() {
    // اگر درخواست قبلی هنوز تمام نشده، اجازه نمی‌دهیم درخواست دیگری ارسال شود.
    if (status === "pending") return;

    // ۱) Snapshot: وضعیت فعلی را قبل از هر تغییری ذخیره می‌کنیم.
    // اگر سرور خطا بدهد، به همین مقادیر برمی‌گردیم (Rollback).
    const previousLiked = liked;
    const previousCount = likeCount;

    // مشخص می‌کنیم بعد از کلیک، لایک باید روشن باشد یا خاموش.
    const nextLiked = !previousLiked;
    // با لایک‌کردن یکی اضافه و با لغو لایک یکی کم می‌کنیم.
    const nextCount = previousCount + (nextLiked ? 1 : -1);

    // ۲) Optimistic Update:
    // قبل از اینکه پاسخ سرور برسد، رابط کاربری را همان لحظه تغییر می‌دهیم.
    // به همین خاطر کاربر لازم نیست منتظر شبکه بماند تا نتیجه را ببیند.
    setLiked(nextLiked);
    setLikeCount(nextCount);
    setStatus("pending");

    try {
      // ۳) هم‌زمان با تغییر فوری UI، درخواست را به Route Handler خودمان می‌فرستیم.
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // وضعیت مورد انتظار را برای این API آزمایشی می‌فرستیم.
        // نکته: در محصول واقعی، سرور باید هویت کاربر و تعداد نهایی را خودش تعیین کند.
        body: JSON.stringify({
          liked: nextLiked,
          count: nextCount,
          simulateFailure,
        }),
      });

      // بدنه پاسخ JSON را می‌خوانیم تا نتیجه یا پیام خطا را بررسی کنیم.
      const result = (await response.json()) as {
        liked?: boolean;
        count?: number;
        message?: string;
      };

      // fetch برای پاسخ‌هایی مثل 500 به‌خودی‌خود وارد catch نمی‌شود؛
      // پس response.ok را بررسی می‌کنیم و در صورت خطا، عمداً خطا پرتاب می‌کنیم.
      if (!response.ok) {
        throw new Error(result.message ?? "ثبت لایک ناموفق بود.");
      }

      // ۴) تأیید سرور: اگر درخواست موفق بود، پاسخ سرور را وضعیت نهایی قرار می‌دهیم.
      // اگر سرور مقدار متفاوتی برگرداند، UI هم با همان مقدار هماهنگ می‌شود.
      setLiked(Boolean(result.liked));
      setLikeCount(Number(result.count ?? nextCount));
      setStatus("success");
    } catch {
      // ۵) Rollback: درخواست شکست خورده؛ تغییر موقتی را لغو می‌کنیم.
      // هر دو state را به Snapshot ذخیره‌شده در ابتدای تابع برمی‌گردانیم.
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
              {/* مقدارهای این بخش از state می‌آیند؛ با setStateها React آن‌ها را دوباره نمایش می‌دهد. */}
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
              // هنگام pending دکمه غیرفعال است تا کاربر درخواست موازی نفرستد.
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
              // این checkbox فقط حالت آزمایشی خطا را روشن/خاموش می‌کند.
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

        {/* بر اساس status، پیام متفاوت نشان می‌دهیم؛ role/aria-live به ابزارهای کمکی خبر می‌دهد. */}
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

      {/* این سه کارت، سه مرحله اصلی الگو را به شکل خلاصه برای یادگیری نمایش می‌دهند. */}
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
