"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("nuva-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("nuva-theme", nextTheme);
    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="تغییر حالت نمایش"
        className="theme-toggle flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-bold"
      >
        <span aria-hidden="true">☀</span>
        <span>تم</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "فعال کردن حالت روشن" : "فعال کردن حالت تیره"}
      title={isDark ? "حالت روشن" : "حالت تیره"}
      className="theme-toggle flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-bold transition hover:-translate-y-0.5"
    >
      <span aria-hidden="true" className="text-base">
        {isDark ? "☀" : "☾"}
      </span>
      <span>{isDark ? "روشن" : "تیره"}</span>
    </button>
  );
}
