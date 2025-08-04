"use client";

import React, {useEffect} from "react";
import ThemeToggle from "../ThemeToggle";
import Profile from "../Profile";
import {useAuth} from "@/contexts/AuthContext";

export default function Header() {
  const {user} = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className="py-2 md:py-3 flex justify-between shadow-sm px-4 md:px-8 border-b dark:border-gray-300 dark:shadow-gray-900">
      <h1 className="text-2xl italic font-semibold">Newsletter</h1>
      <div className="flex gap-4">
        <ThemeToggle />
        {user && <Profile />}
      </div>
    </header>
  );
}
