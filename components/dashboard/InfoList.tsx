import React from "react";

type Props = {title: string; listItems: string[]};

export default function InfoList({title, listItems}: Props) {
  return (
    <div className="flex flex-col gap-2 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 w-full">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="list-disc pl-4 flex flex-col gap-1">
        {listItems.map((listItem, i) => (
          <li className="text-zinc-600 dark:text-zinc-400" key={i}>
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
}
