"use client";

import { useEffect, useState } from "react";

export default function CSRPage() {
  const [browserTime, setBrowserTime] = useState("در حال خواندن زمان مرورگر...");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setBrowserTime(new Date().toLocaleString("fa-IR"));
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">CSR</p>
      <h1 className="theme-text mt-3 text-4xl font-black">Client-Side Rendering</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        این صفحه Client Component است و state و event آن در مرورگر مدیریت می‌شود.
      </p>
      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <p className="theme-muted">زمان خوانده‌شده در مرورگر:</p>
        <p className="theme-text mt-2 text-2xl font-black">{browserTime}</p>
        <button
          onClick={() => setCount((value) => value + 1)}
          className="theme-primary-button mt-6 rounded-full px-6 py-3 font-bold"
        >
          تعداد کلیک: {count}
        </button>
      </div>
    </main>
  );
}
