"use client";

import { useCallback, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { demoProducts } from "../domain/ProductDemo";

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("همه");

  const categories = useMemo(
    () => ["همه", ...new Set(demoProducts.map((product) => product.category))],
    [],
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "همه") {
      return demoProducts;
    }

    return demoProducts.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <section id="products" className="home-products py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="theme-muted text-sm font-bold">منتخب نُوا</p>
            <h2 className="theme-text mt-2 text-3xl font-black tracking-tight sm:text-4xl">محصولاتی که ارزش دیدن دارند</h2>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="فیلتر محصولات">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                  selectedCategory === category
                    ? "theme-text bg-black/5 dark:bg-white/10"
                    : "theme-muted hover:opacity-70"
                }`}
                style={{ borderColor: "var(--border)" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <p className="theme-muted mt-5 text-sm font-bold">
          نمایش {filteredProducts.length.toLocaleString("fa-IR")} محصول از {demoProducts.length.toLocaleString("fa-IR")} محصول
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
