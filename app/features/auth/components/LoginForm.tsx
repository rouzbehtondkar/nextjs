"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 700);
  }

  return (
    <div className="theme-surface w-full max-w-md rounded-[2rem] border p-8 shadow-2xl sm:p-10" style={{ borderColor: "var(--border)" }}>
      <div className="mb-8">
        <span className="theme-text grid h-11 w-11 place-items-center rounded-2xl bg-current font-black" style={{ color: "var(--foreground)" }}>
          <span style={{ color: "var(--background)" }}>ن</span>
        </span>
        <h1 className="theme-text mt-6 text-3xl font-black tracking-tight">خوش برگشتی.</h1>
        <p className="theme-muted mt-2 text-sm leading-6">برای ادامه خرید، وارد حساب نُوا شوید.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="theme-muted-strong mb-2 block text-sm font-bold">ایمیل</span>
          <input type="email" required placeholder="you@example.com" className="theme-input w-full rounded-2xl border px-4 py-3.5 text-left outline-none transition" dir="ltr" />
        </label>

        <label className="block">
          <div className="mb-2 flex items-center justify-between"><span className="theme-muted-strong text-sm font-bold">رمز عبور</span><button type="button" className="theme-muted text-xs font-bold transition hover:opacity-70">فراموش کردم</button></div>
          <input type="password" required minLength={6} placeholder="••••••••" className="theme-input w-full rounded-2xl border px-4 py-3.5 text-left outline-none transition" dir="ltr" />
        </label>

        <button disabled={loading} className="theme-primary-button w-full rounded-2xl px-5 py-3.5 text-sm font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "در حال ورود…" : "ورود به حساب"}
        </button>
      </form>

      <p className="theme-muted mt-8 text-center text-sm">حساب ندارید؟ <span className="theme-text font-bold">ساخت حساب به‌زودی</span></p>
      <Link href="/" className="theme-muted mt-5 block text-center text-xs font-bold transition hover:opacity-70">بازگشت به فروشگاه</Link>
    </div>
  );
}
