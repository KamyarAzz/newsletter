"use client";

import {useEffect, useState} from "react";
import Actions from "@/components/dashboard/Actions";
import CurrentPref from "@/components/dashboard/CurrentPref";
import InfoList from "@/components/dashboard/InfoList";
import {UserPrefrences} from "@/types";
import {Loader} from "lucide-react";

export default function DashboardPage() {
  const [prefrences, setPrefrences] = useState<UserPrefrences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPrefrences() {
      try {
        setLoading(true);
        const response = await fetch("/api/user-prefrences");
        const data = await response.json();
        setPrefrences(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrefrences();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-5 w-[90%] md:w-[60%] mx-auto">
      <h1 className="text-2xl font-bold">Your Newsletter Dashboard</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        Manage your personalized newsletter prefrences
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-2 w-full">
        {loading ? (
          <div className="flex flex-col  items-center justify-center  gap-4 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 flex-auto">
            <Loader className="animate-spin" />
          </div>
        ) : prefrences ? (
          <CurrentPref prefrences={prefrences} />
        ) : (
          <div className="flex flex-col gap-4 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 flex-auto">
            <p className="text-red-600 text-lg">
              Could not fetch prefrences. Please try again later.
            </p>
          </div>
        )}
        <Actions setPrefrences={setPrefrences} prefrences={prefrences} />
      </div>
      <InfoList />
    </div>
  );
}
