"use client";

import {createClient} from "@/lib/client";
import {AuthError, Session, User} from "@supabase/supabase-js";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  signUp: (email: string, password: string) => Promise<AuthError | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createClient();

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const fetchUser = () => {
    setLoading(true);
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut().then(() => {
      setSession(null);
      setUser(null);
      setLoading(false);
    });
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const {error} = await supabase.auth.signUp({
        email,
        password,
      });
      return error;
    } finally {
      fetchUser();
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return error;
    } finally {
      fetchUser();
    }
  };

  const value = {user, session, loading, signOut, signIn, signUp};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error("Something went wrong!");
  return context;
};
