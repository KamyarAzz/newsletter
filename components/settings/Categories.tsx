"use client";

import React, {useState} from "react";
import CategoryCard from "./CategoryCard";
import sportsImage from "@/assets/categories/sports.jpg";
import politicsImage from "@/assets/categories/politics.jpg";
import businessImage from "@/assets/categories/business.jpg";
import technologyImage from "@/assets/categories/technology.jpg";
import entertainmentImage from "@/assets/categories/entertainment.jpg";
import healthImage from "@/assets/categories/health.jpg";
import scienceImage from "@/assets/categories/science.jpg";
import environmentImage from "@/assets/categories/environment.jpg";
import travelImage from "@/assets/categories/travel.jpg";

import gamingImage from "@/assets/categories/gaming.jpg";
import {Category} from "@/types";

type Props = {
  selectedCategoryIds: string[];
  setSelectedCategoryIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const categories: Category[] = [
  {id: "1", title: "Sports", image: sportsImage},
  {id: "2", title: "Technology", image: technologyImage},
  {id: "3", title: "Business", image: businessImage},
  {id: "4", title: "Entertainment", image: entertainmentImage},
  {id: "5", title: "Science", image: scienceImage},
  {id: "6", title: "Health", image: healthImage},
  {id: "7", title: "Politics", image: politicsImage},
  {id: "8", title: "Environment", image: environmentImage},
  {id: "9", title: "Gaming", image: gamingImage},
  {id: "10", title: "Travel", image: travelImage},
];

export default function Categories({
  selectedCategoryIds,
  setSelectedCategoryIds,
}: Props) {
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
    <div className="flex flex-col gap-4 flex-auto">
      <h1 className="text-2xl font-bold">Choose Your Categories</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        Select the topics you would like to see in your personalized newsletter.{" "}
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
      <p className="mt-2 h-3">
        {selectedCategoryIds.length > 0 &&
          `${selectedCategoryIds.length} categories selected`}
      </p>
    </div>
  );
}
