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

export default function InfoList() {
  return (
    <div className="flex flex-col gap-2 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 w-full">
      <h2 className="text-lg font-semibold">{infoList.title}</h2>
      <ul className="list-disc pl-4 flex flex-col gap-1">
        {infoList.items.map((listItem, i) => (
          <li className="text-zinc-600 dark:text-zinc-400" key={i}>
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
}
