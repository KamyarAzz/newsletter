import Actions from "@/components/dashboard/Actions";
import CurrentPref from "@/components/dashboard/CurrentPref";
import InfoList from "@/components/dashboard/InfoList";
import React from "react";

const infoList = {
  title: "How it works",
  items: [
    "Your newsletter is generated based on your selected categories.",
    "Newsletters are delivered to your email at 9 AM according to your chosen frequency.",
    "You can pause or resume your newsletter at any time.",
    "Update your prefrences anytime to change categories or frequency.",
  ],
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-5 w-[90%] md:w-[60%] mx-auto">
      <h1 className="text-2xl font-bold">Your Newsletter Dashboard</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        Manage your personalized newsletter prefrences
      </p>
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-2 w-full">
        <CurrentPref />
        <Actions />
      </div>
      <InfoList listItems={infoList.items} title={infoList.title} />
    </div>
  );
}
