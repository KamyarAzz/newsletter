"use client";

import clsx from "clsx";
import type {Frequencies, FrequencyOptions} from "@/types";

type Props = {
  selectedFrequencyId: Frequencies;
  setSelectedFrequencyId: React.Dispatch<React.SetStateAction<Frequencies>>;
};

const frequencyOptions: FrequencyOptions[] = [
  {
    id: "daily",
    name: "Daily",
    description: "Every day",
  },
  {
    id: "weekly",
    name: "Weekly",
    description: "Once a week",
  },
  {
    id: "biweekly",
    name: "Bi-weekly",
    description: "Twice a week",
  },
];

export default function Frequency({
  selectedFrequencyId,
  setSelectedFrequencyId,
}: Props) {
  const handleSelect = (frequencyId: Frequencies) => {
    setSelectedFrequencyId(frequencyId);
  };

  return (
    <div className="flex flex-col gap-4 w-full flex-auto">
      <h1 className="text-2xl font-bold">Delivery Frequency</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        How often would you like to recieve your newsletter?
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {frequencyOptions.map((frequency) => (
          <label
            key={frequency.id}
            className={clsx(
              "cursor-pointer border rounded-xl p-4 w-48 text-center",
              "transition-all duration-200",
              selectedFrequencyId === frequency.id
                ? "ring-2 ring-blue-800 bg-blue-50 dark:bg-blue-900"
                : "bg-white dark:bg-zinc-800"
            )}
          >
            <input
              type="radio"
              name="frequency"
              value={frequency.id}
              checked={selectedFrequencyId === frequency.id}
              onChange={() => handleSelect(frequency.id)}
              className="hidden"
            />
            <p className="font-medium text-lg">{frequency.name}</p>
            <p className="text-zinc-700 dark:text-zinc-400 text-sm">
              {frequency.description}
            </p>
          </label>
        ))}
      </div>
    </div>
  );
}
