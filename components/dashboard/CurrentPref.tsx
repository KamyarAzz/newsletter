"use client";

import CategoryItem from "@/components/ui/CategoryItem";
import StatusCircle from "@/components/ui/StatusCircle";
import {useAuth} from "@/contexts/AuthContext";
import {UserPrefrences} from "@/types";

type Props = {
  prefrences: UserPrefrences;
};

export default function CurrentPref({prefrences}: Props) {
  const {user} = useAuth();

  const convertDate = (date: string) => {
    const newDate = new Date(date);

    const formatted = newDate.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });

    return formatted;
  };

  return (
    <div className="flex flex-col gap-4 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 flex-auto">
      <h1 className="text-xl font-bold">Current Prefrences</h1>
      <div className="flex flex-col gap-2">
        <p>Categories</p>
        <div className="flex  gap-2">
          {prefrences.categories.map((category) => (
            <CategoryItem key={category} title={category} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Frequency</p>
        <p className="text-zinc-600 dark:text-zinc-400">
          {prefrences.frequency}
        </p>
      </div>
      {user && user.email && (
        <div className="flex flex-col gap-2">
          <p>Email</p>
          <p className="text-zinc-600 dark:text-zinc-400">{prefrences.email}</p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p>Status</p>
        <div className="flex gap-3 items-center">
          <StatusCircle type={prefrences.is_active ? "success" : "danger"} />
          <p className="text-zinc-600 dark:text-zinc-400">
            {prefrences.is_active ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
      {user && user.created_at && (
        <div className="flex flex-col gap-2">
          <p>Created</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            {convertDate(prefrences.created_at)}
          </p>
        </div>
      )}
    </div>
  );
}
