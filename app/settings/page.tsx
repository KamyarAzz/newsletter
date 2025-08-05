import Categories from "@/components/settings/Categories";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-5 w-[90%] md:w-[60%] mx-auto">
      <Categories />
    </div>
  );
}
