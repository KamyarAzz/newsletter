"use client";

import AlertBox from "@/components/ui/AlertBox";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {createClient} from "@/lib/client";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

type FormData = {
  email: string;
  password: string;
};

type TMessage = {
  type: "success" | "danger" | "warn" | null;
  message: string | null;
};

const initialFormData = {
  email: "",
  password: "",
};

const initialMessage: TMessage = {
  type: null,
  message: null,
};

export default function SigninPage() {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [message, setMessage] = useState<TMessage>(initialMessage);
  const supabase = createClient();
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(initialMessage);
      if (isSignup) {
        const {error} = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (error) {
          setMessage({type: "danger", message: error.message});
          throw error;
        }
        setMessage({
          type: "success",
          message: "Check your email for the confirmation link!",
        });
      } else {
        const {error} = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setMessage({type: "danger", message: error.message});
          throw error;
        }
        router.push("/dashboard");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setMessage({type: "danger", message: errorMessage});
      throw Error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: "email" | "password"
  ) => {
    setFormData((prev) => ({...prev, [title]: e.target.value}));
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex rounded-md flex-col dark:bg-darkFr gap-5 w-[90%] md:w-auto max-w-[400px] mx-auto p-8 shadow-sm-base mt-5"
    >
      <h1 className="text-2xl font-bold">
        {isSignup ? "Create Account" : "Sign In"}
      </h1>
      {message.type && (
        <AlertBox type={message.type}>{message.message}</AlertBox>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email address</label>
        <Input
          id="email"
          name="email"
          required
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => changeHandler(e, "email")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          required
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => changeHandler(e, "password")}
        />
      </div>
      <Button disabled={loading} type="submit">
        {isSignup ? "Create Account" : "Sign In"}
      </Button>
      {isSignup ? (
        <p>
          Already have an account?{" "}
          <span
            className="cursor-pointer hover:text-zinc-500 transition-colors duration-150"
            onClick={() => setIsSignup(false)}
          >
            Sign in
          </span>
        </p>
      ) : (
        <p>
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer hover:text-zinc-500 transition-colors duration-150"
            onClick={() => setIsSignup(true)}
          >
            Sign up
          </span>
        </p>
      )}
    </form>
  );
}
