"use client";

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
  return <HeavyComponent />;
}
