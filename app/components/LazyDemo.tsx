"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => (
    <div className="mt-8 w-full rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      Loading component...
    </div>
  ),
  ssr: false,
});

export default function LazyDemo() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="mt-8 w-full">
      <button
        type="button"
        onClick={() => setShowComponent(true)}
        className="rounded-full bg-black px-5 py-3 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Load Heavy Component
      </button>

      {showComponent && <HeavyComponent />}
    </div>
  );
}
