import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useAuth} from "@/contexts/AuthContext";
import {LogOut, User} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "./ui/button";

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
      dateStyle: "medium",
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
          {user && user.email && <p>Email: {user.email}</p>}
          {user && user.created_at && (
            <p>Joined: {convertDate(user.created_at)}</p>
          )}
          <Button disabled={loading} className="mx-auto" onClick={logout}>
            <p>{loading ? "Logging Out" : "Logout"}</p>
            <LogOut className="w-6 h-6" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
