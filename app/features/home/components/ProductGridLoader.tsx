"use client";

import dynamic from "next/dynamic";

const ProductGrid = dynamic(() => import("./ProductGrid"), {
  loading: () => (
    <section className="home-products py-24" aria-label="در حال بارگذاری محصولات">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="theme-surface h-64 animate-pulse rounded-[1.75rem] border" style={{ borderColor: "var(--border)" }} />
      </div>
    </section>
  ),
});

export default function ProductGridLoader() {
  return <ProductGrid />;
}
