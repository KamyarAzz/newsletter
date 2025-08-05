"use client";

import React, {useState} from "react";
import CategoryCard from "./CategoryCard";
import type {StaticImageData} from "next/image";
import sportsImage from "@/assets/categories/sports.jpg";
import politicsImage from "@/assets/categories/politics.jpg";
import gamingImage from "@/assets/categories/gaming.jpg";

type Category = {
  id: string;
  title: string;
  image: StaticImageData;
};

const categories: Category[] = [
  {id: "1", title: "Sports", image: sportsImage},
  {id: "2", title: "Technology", image: gamingImage},
  {id: "3", title: "Business", image: politicsImage},
  {id: "4", title: "Entertainment", image: politicsImage},
  {id: "5", title: "Science", image: politicsImage},
  {id: "6", title: "Health", image: politicsImage},
  {id: "7", title: "Politics", image: politicsImage},
  {id: "8", title: "Environment", image: politicsImage},
];

export default function Categories() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const handleSelect = (categoryId: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  return (
    <div className="flex flex-col gap-4 shadow-sm-base dark:bg-darkFr rounded-md px-8 py-4 flex-auto">
      <h1 className="text-2xl font-bold">Choose Your Categories</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        Select the topics you would like to see in your personalized newsletter{" "}
        {selectedCategoryIds.length > 0 && (
          <span>{selectedCategoryIds.length} selected</span>
        )}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <CategoryCard
            clickHandler={handleSelect}
            isSelected={Boolean(
              selectedCategoryIds.find((id) => id === category.id)
            )}
            category={category}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
}
