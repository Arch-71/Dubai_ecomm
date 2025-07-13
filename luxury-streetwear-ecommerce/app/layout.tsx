"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, User } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import AuthButton from "./AuthButton"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Global nav state
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const closeMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!localStorage.getItem("token"));
    }
  }, []);
  const handleMenuEnter = () => {
    if (closeMenuTimeout.current) {
      clearTimeout(closeMenuTimeout.current);
    }
    setShowUserMenu(true);
  };
  const handleMenuLeave = () => {
    closeMenuTimeout.current = setTimeout(() => {
      setShowUserMenu(false);
    }, 120);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        <nav className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link
                  href="/"
                  className="text-2xl font-black tracking-wider bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  SACRED MAYHEM
                </Link>
              </motion.div>
              <div className="hidden md:flex items-center space-x-8">
                {["SHOP", "DROPS", "LOOKBOOK", "ARCHIVE", "EDITORIAL"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="relative text-white hover:text-pink-400 transition-colors group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4 "
              >
                <Button variant="ghost" size="icon" className="relative group">
                  <Heart className="w-5 h-5 text-white group-hover:text-pink-400 transition-colors" />
                  <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" size="icon" className="relative group">
                  <ShoppingBag className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors" />
                  <Badge className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    2
                  </Badge>
                </Button>
                {/* User icon and dropdown: only show if signed in and not on login/signup pages */}
                {isAuthenticated && pathname !== "/login" && pathname !== "/signup" && (
                  <div
                    className="relative "
                    onMouseEnter={handleMenuEnter}
                    onMouseLeave={handleMenuLeave}
                  >
                    <Button variant="ghost" size="icon" className="relative group">
                      <User className={`w-5 h-5 text-white group-hover:text-cyan-400 transition-colors`} />
                    </Button>
                    {showUserMenu && (
                      <div
                        className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-black via-gray-900 to-cyan-900 text-white rounded-xl shadow-2xl z-50 border border-cyan-500/30"
                      >
                        <ul className="py-2">
                          {[
                            { label: "Profile", href: "/profile" },
                            { label: "Returns / Exchange", href: "/returns" },
                            { label: "My Orders", href: "/orders" },
                            { label: "My Wishlist", href: "/wishlist" },
                            { label: "Addresses", href: "/addresses" },
                            { label: "Powerlook Wallet", href: "/wallet" }
                          ].map((item) => (
                            <li key={item.label}>
                              <Button
                                variant="ghost"
                                className="w-full text-left px-5 py-3 rounded-lg font-semibold text-base bg-gradient-to-r from-pink-500/10 to-cyan-500/10 hover:from-pink-500/30 hover:to-cyan-500/30 hover:text-cyan-400 transition-all"
                                onClick={() => {
                                  setShowUserMenu(false);
                                  window.location.href = item.href;
                                }}
                              >
                                {item.label}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="ml-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-bold rounded-full px-5 py-2 hover:scale-105 transition-transform"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant="outline" className="ml-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold rounded-full px-5 py-2 hover:scale-105 transition-transform">
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  )
}