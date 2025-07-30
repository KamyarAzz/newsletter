"use client";

import {createClient} from "@/lib/client";
import {Session, User} from "@supabase/supabase-js";
import {createContext, ReactNode, useEffect, useState} from "react";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const signOut = async () => {
    supabase.auth.signOut();
  };

  const value = {user, session, loading, signOut};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
