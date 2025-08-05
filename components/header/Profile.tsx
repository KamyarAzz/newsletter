import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useAuth} from "@/contexts/AuthContext";
import {LogOut, User} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "../ui/button";

export default function Profile() {
  const {user, signOut, loading} = useAuth();
  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/signin");
  };

  const convertDate = (date: string) => {
    const newDate = new Date(date);

    const formatted = newDate.toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });

    return formatted;
  };

  return (
    <Popover>
      <PopoverTrigger>
        <User className="w-6 h-6 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full flex flex-col gap-3">
          {user && user.email && (
            <div className="flex flex-col">
              <p className="font-semibold">Email</p>
              <p className="text-zinc-600 dark:text-zinc-300">{user.email}</p>
            </div>
          )}
          {user && user.created_at && (
            <div className="flex flex-col">
              <p className="font-semibold">Joined</p>
              <p className="text-zinc-600 dark:text-zinc-300">
                {convertDate(user.created_at)}
              </p>
            </div>
          )}
          <Button
            disabled={loading}
            className="mx-auto mt-2 !px-8 flex items-center"
            onClick={logout}
          >
            <LogOut className="w-6 h-6" />
            <p>{loading ? "Logging Out" : "Logout"}</p>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
