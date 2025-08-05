import React from "react";
import type {StaticImageData} from "next/image";
import clsx from "clsx";

type Category = {
  id: string;
  title: string;
  image: StaticImageData;
};

type Props = {
  category: Category;
  isSelected: boolean;
  clickHandler: (category: string) => void;
};

export default function CategoryCard({
  category,
  isSelected,
  clickHandler,
}: Props) {
  return (
    <div
      onClick={() => clickHandler(category.id)}
      className={clsx(
        "relative overflow-hidden rounded-xl aspect-video w-48 cursor-pointer group transition-all duration-300 shadow-md hover:shadow-lg max-w-48",
        {
          "ring-4 ring-blue-600": isSelected,
          "opacity-90 hover:opacity-100": !isSelected,
        }
      )}
      style={{
        backgroundImage: `url(${category.image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

      <div className="absolute bottom-2 left-2 text-white text-lg font-semibold  z-10 drop-shadow-md">
        {category.title}
      </div>
    </div>
  );
}
