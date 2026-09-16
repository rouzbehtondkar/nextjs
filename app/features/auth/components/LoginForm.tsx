"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 700);
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50 sm:p-10">
      <div className="mb-8">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 font-black text-white">ن</span>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">خوش برگشتی.</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">برای ادامه خرید، وارد حساب نُوا شوید.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">ایمیل</span>
          <input type="email" required placeholder="you@example.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5" dir="ltr" />
        </label>

        <label className="block">
          <div className="mb-2 flex items-center justify-between"><span className="text-sm font-bold text-slate-700">رمز عبور</span><button type="button" className="text-xs font-bold text-slate-500 hover:text-slate-950">فراموش کردم</button></div>
          <input type="password" required minLength={6} placeholder="••••••••" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5" dir="ltr" />
        </label>

        <button disabled={loading} className="w-full rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "در حال ورود…" : "ورود به حساب"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">حساب ندارید؟ <Link href="/login" className="font-bold text-slate-950">ساخت حساب به‌زودی</Link></p>
    </div>
  );
}
