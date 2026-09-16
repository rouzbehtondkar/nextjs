"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// اینجا به Next.js می‌گوییم فعلاً کد HeavyComponent را کامل وارد نکن.
// وقتی واقعاً به این کامپوننت نیاز شد، آن را جداگانه دانلود کن.
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  // تا زمانی که فایل HeavyComponent در حال دانلود است، این UI نمایش داده می‌شود.
  loading: () => (
    <div className="mt-8 w-full rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      Loading component...
    </div>
  ),

  // یعنی این کامپوننت فقط سمت مرورگر اجرا شود، نه هنگام رندر سمت سرور.
  ssr: false,
});

export default function LazyDemo() {
  // اول کار false است؛ یعنی هنوز HeavyComponent را لازم نداریم.
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="mt-8 w-full">
      <button
        type="button"
        // با کلیک کاربر، state از false به true تغییر می‌کند.
        // بعد از این تغییر، HeavyComponent وارد صفحه می‌شود.
        onClick={() => setShowComponent(true)}
        className="rounded-full bg-black px-5 py-3 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Load Heavy Component
      </button>

      {/*
        مهم‌ترین قسمت Lazy Loading همین‌جاست:
        تا وقتی showComponent برابر false باشد، HeavyComponent رندر نمی‌شود.
        وقتی کاربر کلیک کند و showComponent بشود true،
        dynamic import فایل HeavyComponent را جداگانه لود می‌کند.
      */}
      {showComponent && <HeavyComponent />}
    </div>
  );
}
