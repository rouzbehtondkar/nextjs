"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart, clearCart, removeFromCart } from "../store/cartSlice";

export default function CartPage() {
  // برای خواندن محصولات فعلی از Redux استفاده می‌کنیم.
  const items = useAppSelector((state) => state.cart.items);

  // برای فرستادن Actionهای add/remove/clear به Redux استفاده می‌کنیم.
  const dispatch = useAppDispatch();

  // مجموع قیمت سبد را از اطلاعات موجود در Redux محاسبه می‌کنیم.
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main className="mx-auto min-h-[70vh] max-w-5xl px-6 py-12 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="theme-muted text-sm font-bold">مدیریت State با Redux Toolkit</p>
          <h1 className="theme-text mt-2 text-3xl font-black">سبد خرید</h1>
        </div>
        <Link href="/" className="theme-secondary-button rounded-full border px-4 py-2 text-sm font-bold">
          بازگشت به محصولات
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="theme-surface rounded-[2rem] border p-10 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="theme-text text-lg font-black">سبد خرید خالی است</p>
          <Link href="/" className="site-header-cta mt-5 inline-block rounded-full px-5 py-3 text-sm font-bold">
            رفتن به محصولات
          </Link>
        </section>
      ) : (
        <section className="space-y-4">
          {/* هر ردیف مستقیماً از state.cart.items ساخته می‌شود. */}
          {items.map((item) => (
            <article
              key={item.id}
              className="theme-surface flex flex-col gap-4 rounded-[1.5rem] border p-5 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <h2 className="theme-text font-black">{item.name}</h2>
                <p className="theme-muted mt-1 text-sm">
                  {item.price.toLocaleString("fa-IR")} تومان × {item.quantity.toLocaleString("fa-IR")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* با dispatch دوباره همان Action addToCart را اجرا می‌کنیم تا تعداد یکی زیاد شود. */}
                <button
                  type="button"
                  onClick={() => dispatch(addToCart({ id: item.id, name: item.name, price: item.price }))}
                  className="theme-secondary-button h-10 w-10 rounded-xl border text-lg font-black"
                  aria-label="افزایش تعداد"
                >
                  +
                </button>

                {/* این دکمه محصول را کاملاً از Store حذف می‌کند. */}
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="theme-secondary-button h-10 rounded-xl border px-4 text-sm font-bold"
                >
                  حذف
                </button>
              </div>
            </article>
          ))}

          <div className="theme-surface mt-6 flex flex-col gap-4 rounded-[1.5rem] border p-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--border)" }}>
            <div>
              <p className="theme-muted text-sm font-bold">مبلغ کل</p>
              <p className="theme-text mt-1 text-2xl font-black">{totalPrice.toLocaleString("fa-IR")} تومان</p>
            </div>

            {/* clearCart تمام items را از Redux پاک می‌کند. */}
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="rounded-xl border border-red-500/30 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500/10"
            >
              خالی کردن سبد
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
