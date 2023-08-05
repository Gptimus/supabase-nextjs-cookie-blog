"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClientComponentClient());

  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // refresh data
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signUp = () => {
    supabase.auth.signUp({
      email: "guerthmanzala@gmail.com",
      password: "12345678",
    });
  };

  const signIn = () => {
    supabase.auth.signInWithPassword({
      email: "guerthmanzala@gmail.com",
      password: "12345678",
    });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex space-x-3 mt-2 mb-2">
          <button
            className="bg-purple-700 hover:bg-purple-700/90 duration-300 py-1 px-3 rounded-md text-xs"
            onClick={signUp}
          >
            Sign Up
          </button>
          <button
            className="bg-purple-700 hover:bg-purple-700/90 duration-300 py-1 px-3 rounded-md text-xs"
            onClick={signIn}
          >
            Sign In
          </button>
          <button
            className="bg-purple-700 hover:bg-purple-700/90 duration-300 py-1 px-3 rounded-md text-xs"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
