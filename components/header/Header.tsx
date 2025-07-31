import React from "react";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <header className="py-2 md:py-3 flex justify-between shadow-sm px-4 md:px-8 border-b dark:border-gray-300 dark:shadow-gray-900">
      <h1 className="text-2xl italic">Newsletter</h1>
      <ThemeToggle />
    </header>
  );
}
