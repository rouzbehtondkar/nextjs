"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// اینجا به Next.js می‌گوییم HeavyComponent را به صورت عادی و از همان ابتدا لود نکن.
// با dynamic، کد این کامپوننت می‌تواند در یک فایل (chunk) جدا قرار بگیرد
// و فقط زمانی که واقعاً به آن نیاز داریم، دانلود شود.
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  // تا زمانی که فایل HeavyComponent در حال دانلود است، این UI نمایش داده می‌شود.
  loading: () => (
    <div className="mt-8 w-full rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      Loading component...
    </div>
  ),

  // یعنی این کامپوننت فقط در مرورگر اجرا شود و در Server Rendering اجرا نشود.
  ssr: false,
});

export default function LazyDemo() {
  // در شروع کار false است؛ یعنی هنوز کاربر درخواست نمایش HeavyComponent را نداده است.
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="mt-8 w-full">
      <button
        type="button"
        // با کلیک کاربر، state از false به true تغییر می‌کند.
        // بعد از این تغییر، شرط پایین برقرار می‌شود و HeavyComponent نمایش داده می‌شود.
        onClick={() => setShowComponent(true)}
        className="rounded-full bg-black px-5 py-3 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Load Heavy Component
      </button>

      {/*
        مهم‌ترین بخش Lazy Loading اینجاست:

        تا وقتی showComponent برابر false باشد، HeavyComponent اصلاً رندر نمی‌شود.
        وقتی کاربر روی دکمه کلیک کند، showComponent برابر true می‌شود.
        در نتیجه dynamic import اجازه می‌دهد کد HeavyComponent به صورت جداگانه لود شود.

        خلاصه:
        کلیک کاربر → state=true → نمایش HeavyComponent → دانلود chunk مربوط به آن
      */}
      {showComponent && <HeavyComponent />}
    </div>
  );
}
