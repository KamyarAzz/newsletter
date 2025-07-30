import {cn} from "@/lib/utils";
import React, {ReactNode} from "react";

type Props = {children: ReactNode; type?: "success" | "danger" | "warn"};

export default function AlertBox({children, type = "success"}: Props) {
  return (
    <div
      className={cn(
        " border  rounded-md p-4",
        {
          "bg-green-50 border-green-200": type === "success",
        },
        {
          "bg-red-50 border-red-200": type === "danger",
        },
        {
          "bg-yellow-50 border-yellow-200": type === "warn",
        }
      )}
    >
      <p
        className={cn(
          "text-sm text-green-600",
          {
            "text-green-600": type === "success",
          },
          {
            "text-red-600": type === "danger",
          },
          {
            "text-yellow-600": type === "warn",
          }
        )}
      >
        Message: {children}
      </p>
    </div>
  );
}
