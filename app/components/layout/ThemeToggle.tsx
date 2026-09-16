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

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "فعال کردن حالت روشن" : "فعال کردن حالت تیره"}
      title={theme === "dark" ? "حالت روشن" : "حالت تیره"}
      className="theme-toggle grid h-10 w-10 place-items-center rounded-full border text-base transition hover:-translate-y-0.5"
    >
      <span aria-hidden="true">{mounted && theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
