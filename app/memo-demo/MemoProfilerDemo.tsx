"use client";

import { memo, useRef, useState } from "react";

function Child({ label }: { label: string }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Child Component</p>
      <h2 className="mt-2 text-xl font-bold">{label}</h2>

      <div className="mt-4 rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">تعداد Render های Child</p>
        <p className="mt-1 text-3xl font-black">{renderCount.current}</p>
      </div>
    </div>
  );
}

const MemoChild = memo(Child);

export default function MemoProfilerDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [useMemoChild, setUseMemoChild] = useState(false);
  const parentRenderCount = useRef(0);
  parentRenderCount.current += 1;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-bold text-zinc-500">React.memo Demo</p>
        <h1 className="mt-2 text-3xl font-black">قبل و بعدِ memo</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Parent state</p>
            <p className="mt-2 text-3xl font-black">{parentCount}</p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              تعداد Render های Parent: <strong>{parentRenderCount.current}</strong>
            </p>
            <button
              type="button"
              onClick={() => setParentCount((count) => count + 1)}
              className="mt-4 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-black"
            >
              Re-render Parent
            </button>
          </div>

          <div className="rounded-2xl border border-dashed border-zinc-300 p-5 dark:border-zinc-700">
            <p className="text-sm font-bold">آزمایش</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              اول memo را خاموش کن و چند بار Parent را رندر کن. بعد memo را روشن
              کن و همان کار را تکرار کن.
            </p>
            <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-bold">
              <input
                type="checkbox"
                checked={useMemoChild}
                onChange={(event) => setUseMemoChild(event.target.checked)}
              />
              استفاده از React.memo
            </label>
          </div>
        </div>

        <div className="mt-6">
          {useMemoChild ? <MemoChild label="Memo ON 🟢" /> : <Child label="Memo OFF 🔴" />}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-5 text-sm leading-7 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          <strong>چیزی که باید ببینی:</strong>
          <br />
          وقتی memo خاموش است، با هر کلیک روی Parent، هم Parent و هم Child دوباره
          Render می‌شوند.
          <br />
          وقتی memo روشن است، Parent دوباره Render می‌شود اما Child چون props آن
          تغییر نکرده، دوباره Render نمی‌شود.
          <br />
          <span className="text-xs opacity-70">
            نکته: در حالت development ممکن است React Strict Mode بعضی Render ها را
            بیشتر اجرا کند؛ برای مقایسه، روند تغییر عددها را نگاه کن.
          </span>
        </div>
      </div>
    </main>
  );
}
