import type {StaticImageData} from "next/image";

export type Frequencies = "daily" | "weekly" | "biweekly";

export type Category = {
  id: string;
  title: string;
  image: StaticImageData;
};

export type FrequencyOptions = {
  id: Frequencies;
  name: string;
  description: string;
};

export type UserPrefrences = {
  categories: string[];
  frequency: string;
  email: string;
  is_active: boolean;
  created_at: string;
};
