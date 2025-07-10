"use client";
import React from "react";
import Link from "next/link";

export default function AuthButton() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setLoggedIn(!!localStorage.getItem("token"));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!mounted) return null;

  return loggedIn ? (
    <button
      onClick={handleSignOut}
      className="ml-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold rounded-full px-5 py-2 hover:scale-105 transition-transform border border-white/10 shadow-lg"
    >
      Sign Out
    </button>
  ) : (
    <Link href="/login">
      <button className="ml-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold rounded-full px-5 py-2 hover:scale-105 transition-transform border border-white/10 shadow-lg">
        Login / Sign Up
      </button>
    </Link>
  );
}
