"use client";

import {CreditCard, ShieldMinus, SquarePen} from "lucide-react";
import {useRouter} from "next/navigation";

export default function Actions() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 flex-auto">
      <h1 className="text-xl font-bold">Actions</h1>
      <button
        onClick={() => router.push("/settings")}
        className="flex gap-2 justify-center items-center rounded-md w-full bg-blue-800 border dark:border-transparent hover:bg-blue-900 transition-colors duration-300 border-blue-800 text-white py-2 px-4 cursor-pointer"
      >
        <SquarePen className="w-5 h-5" />
        <p>Update Prefrences</p>
      </button>
      <button className="flex gap-2 justify-center items-center rounded-md w-full dark:text-white dark:border-transparent dark:bg-red-800 dark:hover:bg-red-900 bg-red-100 border hover:bg-red-200 transition-colors duration-300 border-red-800 text-red-800 py-2 px-4 cursor-pointer">
        <ShieldMinus className="w-5 h-5" />
        <p>Pause Newsletter</p>
      </button>
      <button className="flex gap-2 justify-center items-center rounded-md w-full dark:text-white dark:border-transparent dark:bg-zinc-700 dark:hover:bg-zinc-800 bg-white border hover:bg-zinc-200 transition-colors duration-300 border-zinc-500 text-zinc-800 py-2 px-4 cursor-pointer">
        <CreditCard className="w-5 h-5" />
        <p>Manage Subscription</p>
      </button>
    </div>
  );
}
