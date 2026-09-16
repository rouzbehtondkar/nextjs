"use client";

import { memo, useState } from "react";

function Child({ label }: { label: string }) {
  const [renderCount, setRenderCount] = useState(0);

  // عمداً هنگام هر Render شمارنده را زیاد نمی‌کنیم؛
  // این دکمه به ما کمک می‌کند ببینیم خود کامپوننت چند بار Render شده است.
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Child Component</p>
      <h2 className="mt-2 text-xl font-bold">{label}</h2>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        برای دیدن Render شدن Child، از React DevTools → Profiler استفاده کن.
      </p>
      <button
        type="button"
        onClick={() => setRenderCount((count) => count + 1)}
        className="mt-4 rounded-xl border px-4 py-2 text-sm font-bold"
      >
        Child state: {renderCount}
      </button>
    </div>
  );
}

const MemoChild = memo(Child);

export default function MemoProfilerDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [useMemoChild, setUseMemoChild] = useState(false);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-bold text-zinc-500">React.memo + Profiler</p>
        <h1 className="mt-2 text-3xl font-black">قبل و بعدِ memo</h1>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Parent state</p>
          <p className="mt-2 text-3xl font-black">{parentCount}</p>
          <button
            type="button"
            onClick={() => setParentCount((count) => count + 1)}
            className="mt-4 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-black"
          >
            Re-render Parent
          </button>
        </div>

        <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm font-bold">
          <input
            type="checkbox"
            checked={useMemoChild}
            onChange={(event) => setUseMemoChild(event.target.checked)}
          />
          استفاده از React.memo
        </label>

        <div className="mt-6">
          {useMemoChild ? <MemoChild label="Memo ON 🟢" /> : <Child label="Memo OFF 🔴" />}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-5 text-sm leading-7 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          <strong>تست:</strong> Profiler را باز کن، Record بزن، چند بار روی
          <strong> Re-render Parent </strong>
          کلیک کن، سپس همین کار را با Memo روشن تکرار کن.
          <br />
          چون props مربوط به Child ثابت است، با memo تغییر state والد نباید باعث
          Render دوباره Child شود.
        </div>
      </div>
    </main>
  );
}
