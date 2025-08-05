import React from "react";

type Props = {
  title: string;
};

export default function CategoryItem({title}: Props) {
  return (
    <div className="bg-blue-100 dark:bg-blue-900 dark:text-zinc-100 text-xs rounded-full py-1 px-2 text-blue-800">
      {title}
    </div>
  );
}
