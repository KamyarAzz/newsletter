"use client";

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
  selectedCategoryTitles: string[];
  setSelectedCategoryTitles: React.Dispatch<React.SetStateAction<string[]>>;
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
  selectedCategoryTitles,
  setSelectedCategoryTitles,
}: Props) {
  const handleSelect = (categoryTitle: string) => {
    setSelectedCategoryTitles((prev) => {
      if (prev.includes(categoryTitle)) {
        return prev.filter((title) => title !== categoryTitle);
      } else {
        return [...prev, categoryTitle];
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
              selectedCategoryTitles.find((title) => title === category.title)
            )}
            category={category}
            key={category.id}
          />
        ))}
      </div>
      <p className="mt-2 h-3">
        {selectedCategoryTitles.length > 0 &&
          `${selectedCategoryTitles.length} categories selected`}
      </p>
    </div>
  );
}
