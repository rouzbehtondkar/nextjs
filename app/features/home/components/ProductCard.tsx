"use client";

import { memo } from "react";
import type { Product } from "../domain/Product";
import { addToCart } from "../../../store/cartSlice";
import { useAppDispatch } from "../../../store/hooks";

type ProductCardProps = {
  product: Product;
  index: number;
};

const productTones = [
  "from-slate-900 to-slate-600",
  "from-indigo-950 to-indigo-500",
  "from-amber-900 to-orange-400",
];

function ProductCard({ product, index }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.name,
        name: product.name,
        price: product.price,
      }),
    );
  };

  return (
    <article className="theme-surface group overflow-hidden rounded-[1.75rem] border transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10" style={{ borderColor: "var(--border)" }}>
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${productTones[index % productTones.length]}`}>
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_28%),radial-gradient(circle_at_80%_75%,white_0,transparent_24%)]" />
        <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">۰{index + 1}</span>
        <div className="absolute bottom-5 left-5 right-5 h-28 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="theme-muted text-xs font-bold">{product.category}</p>
          <span className="rounded-full border border-current/10 bg-black/5 px-3 py-1 text-[11px] font-bold text-current dark:bg-white/5">
            {product.getDeliveryInfo()}
          </span>
        </div>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="theme-text text-lg font-black">{product.name}</h3>
          <span className="theme-muted-strong whitespace-nowrap text-sm font-bold">{product.price.toLocaleString("fa-IR")} تومان</span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="theme-secondary-button mt-6 w-full rounded-2xl border py-3 text-sm font-bold transition"
        >
          افزودن به سبد
        </button>
      </div>
    </article>
  );
}

export default memo(ProductCard);
