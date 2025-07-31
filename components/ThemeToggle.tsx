"use client";

import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const {setTheme} = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark =
      storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full cursor-pointer transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
}
