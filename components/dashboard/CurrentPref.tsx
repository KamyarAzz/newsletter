"use client";

import React from "react";
import CategoryItem from "../ui/CategoryItem";
import StatusCircle from "../ui/StatusCircle";
import {useAuth} from "@/contexts/AuthContext";

export default function CurrentPref() {
  const {user} = useAuth();

  const convertDate = (date: string) => {
    const newDate = new Date(date);

    const formatted = newDate.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });

    return formatted;
  };

  const c = ["Technology", "Science", "Politics"];
  return (
    <div className="flex flex-col gap-4 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 flex-auto">
      <h1 className="text-xl font-bold">Current Prefrences</h1>
      <div className="flex flex-col gap-2">
        <p>Categories</p>
        <div className="flex  gap-2">
          {c.map((category) => (
            <CategoryItem key={category} title={category} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Frequency</p>
        <p className="text-zinc-600 dark:text-zinc-400">daily</p>
      </div>
      {user && user.email && (
        <div className="flex flex-col gap-2">
          <p>Email</p>
          <p className="text-zinc-600 dark:text-zinc-400">{user.email}</p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p>Status</p>
        <div className="flex gap-3 items-center">
          <StatusCircle type={true ? "success" : "danger"} />
          <p className="text-zinc-600 dark:text-zinc-400">
            {true ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
      {user && user.created_at && (
        <div className="flex flex-col gap-2">
          <p>Created</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            {convertDate(user.created_at)}
          </p>
        </div>
      )}
    </div>
  );
}
