"use client";

import {FormEvent, useState} from "react";
import Categories from "@/components/settings/Categories";
import Frequency from "@/components/settings/Frequency";
import {Button} from "@/components/ui/button";
import type {Frequencies} from "@/types";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";

export default function SettingsPage() {
  const [selectedFrequencyId, setSelectedFrequencyId] =
    useState<Frequencies>("weekly");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {user} = useAuth();
  const router = useRouter();

  const saveHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedCategoryIds.length === 0) {
      alert("Please select atleast one category!");
      return;
    }
    if (!user) {
      alert("Please sign in to continue!");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/user-prefrences", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          categories: selectedCategoryIds,
          frequency: selectedFrequencyId,
          email: user.email,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save prefrences please try again");
      }
      alert("Prefrences updated successfuly.");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save prefrences please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={saveHandler}
      className="flex flex-col gap-2 items-center justify-center p-5 m-5 w-[95%] md:w-[90%] lg:w-[85%] xl:w-[75%] max-w-[1150px] mx-auto shadow-sm-base dark:bg-darkFr rounded-md"
    >
      <Categories
        selectedCategoryIds={selectedCategoryIds}
        setSelectedCategoryIds={setSelectedCategoryIds}
      />
      <Frequency
        selectedFrequencyId={selectedFrequencyId}
        setSelectedFrequencyId={setSelectedFrequencyId}
      />
      <div className="w-full flex justify-center md:justify-end mt-6 pt-3 border-t md:border-none dark:border-zinc-700">
        <Button
          type="submit"
          disabled={selectedCategoryIds.length === 0 || loading}
          className="text-lg p-6"
        >
          {loading ? "Updating Prefrences..." : "Save Prefrences"}
        </Button>
      </div>
    </form>
  );
}
