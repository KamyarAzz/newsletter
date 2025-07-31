import {cn} from "@/lib/utils";
import React, {ReactNode} from "react";

type Props = {children: ReactNode; type?: "success" | "danger" | "warn"};

export default function AlertBox({children, type = "success"}: Props) {
  return (
    <div
      className={cn(
        "border rounded-md p-4",
        type === "success" &&
          "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
        type === "danger" &&
          "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
        type === "warn" &&
          "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800"
      )}
    >
      <p
        className={cn(
          "text-sm",
          type === "success" && "text-green-600 dark:text-green-300",
          type === "danger" && "text-red-600 dark:text-red-300",
          type === "warn" && "text-yellow-600 dark:text-yellow-300"
        )}
      >
        Message: {children}
      </p>
    </div>
  );
}
