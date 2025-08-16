"use client";

import {Dispatch, SetStateAction} from "react";
import {useRouter} from "next/navigation";
import {
  CreditCard,
  ShieldCheck,
  ShieldMinus,
  ShieldQuestion,
  SquarePen,
} from "lucide-react";
import {UserPrefrences} from "@/types";

type Props = {
  prefrences: UserPrefrences | null;
  setPrefrences: Dispatch<SetStateAction<UserPrefrences | null>>;
};

export default function Actions({prefrences, setPrefrences}: Props) {
  const activateNewsletter = async () => {
    const response = await fetch("/api/user-prefrences", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({is_active: true}),
    });

    if (response.ok) {
      setPrefrences((prev) => (prev ? {...prev, is_active: true} : null));
    } else {
      alert("Failed to activate newsletter please try again later.");
    }
  };

  const pauseNewsletter = async () => {
    const response = await fetch("/api/user-prefrences", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({is_active: false}),
    });

    if (response.ok) {
      setPrefrences((prev) => (prev ? {...prev, is_active: false} : null));
    } else {
      alert("Failed to pause newsletter please try again later.");
    }
  };

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
      {prefrences === null ? (
        <div className="flex gap-2 justify-center items-center rounded-md w-full dark:text-white dark:border-transparent dark:bg-slate-800 bg-slate-100 border border-slate-800 text-slate-800 py-2 px-4">
          <ShieldQuestion className="w-5 h-5" />
          <p>Loading Newsletter Status</p>
        </div>
      ) : prefrences.is_active ? (
        <button
          onClick={pauseNewsletter}
          disabled={prefrences === null}
          className="flex gap-2 justify-center items-center rounded-md w-full dark:text-white dark:border-transparent dark:bg-red-800 dark:hover:bg-red-900 bg-red-100 border hover:bg-red-200 transition-colors duration-300 border-red-800 text-red-800 py-2 px-4 cursor-pointer"
        >
          <ShieldMinus className="w-5 h-5" />
          <p>Pause Newsletter</p>
        </button>
      ) : (
        <button
          onClick={activateNewsletter}
          disabled={prefrences === null}
          className="flex gap-2 justify-center items-center rounded-md w-full dark:text-white dark:border-transparent dark:bg-green-800 dark:hover:bg-green-900 bg-green-100 border hover:bg-green-200 transition-colors duration-300 border-green-800 text-green-800 py-2 px-4 cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5" />
          <p>Activate Newsletter</p>
        </button>
      )}
      <button className="flex gap-2 justify-center items-center rounded-md w-full dark:text-white dark:border-transparent dark:bg-zinc-700 dark:hover:bg-zinc-800 bg-white border hover:bg-zinc-200 transition-colors duration-300 border-zinc-500 text-zinc-800 py-2 px-4 cursor-pointer">
        <CreditCard className="w-5 h-5" />
        <p>Manage Subscription</p>
      </button>
    </div>
  );
}
