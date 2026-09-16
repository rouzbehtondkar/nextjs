"use client";

import { useState } from "react";

export default function ClientComponentPage() {
  const [liked, setLiked] = useState(false);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="theme-muted text-sm font-bold">Client Component</p>
      <h1 className="theme-text mt-3 text-4xl font-black">کامپوننت سمت کلاینت</h1>
      <p className="theme-muted-strong mt-5 leading-8">
        با اضافه کردن use client، این کامپوننت می‌تواند state و eventهای مرورگر را مدیریت کند.
      </p>
      <div className="theme-surface mt-8 rounded-3xl border p-8" style={{ borderColor: "var(--border)" }}>
        <p className="theme-text text-lg font-black">State نمونه</p>
        <button
          onClick={() => setLiked((value) => !value)}
          className="theme-primary-button mt-5 rounded-full px-6 py-3 font-bold"
        >
          {liked ? "❤️ پسندیدم" : "🤍 پسندیدن"}
        </button>
      </div>
    </main>
  );
}
