import type React from "react"
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

export const metadata: Metadata = {
  title: "SACRED MAYHEM - Luxury Streetwear Revolution",
  description:
    "Where mythology meets streetwear. Transcend the ordinary with our divine collection of luxury streetwear inspired by ancient gods and modern rebellion. Join 50,000+ rebels in the Sacred Mayhem cult.",
  keywords:
    "luxury streetwear, mythology fashion, limited edition, designer clothing, premium streetwear, sacred mayhem, divine rebellion",
  openGraph: {
    title: "SACRED MAYHEM - Luxury Streetwear Revolution",
    description: "Where mythology meets streetwear. Transcend the ordinary.",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SACRED MAYHEM - Luxury Streetwear Revolution",
    description: "Where mythology meets streetwear. Transcend the ordinary.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        {/* Enhanced Navigation Bar - now global */}
        <nav className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black tracking-wider bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                <a href="/">SACRED MAYHEM</a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {["SHOP", "DROPS", "LOOKBOOK", "ARCHIVE", "EDITORIAL"].map((item, index) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="relative hover:text-pink-400 transition-colors group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative group" type="button">
                  <svg className="w-5 h-5 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
                </button>
                <button className="relative group" type="button">
                  <svg className="w-5 h-5 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6h15l-1.68 9.39A2 2 0 0 1 17.34 17H8.66a2 2 0 0 1-1.98-1.61L4 4H2"/><circle cx="9" cy="21" r="1"/><circle cx="17" cy="21" r="1"/></svg>
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
                </button>
                <AuthButton />
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-24">{children}</div>
      </body>
    </html>
  )
}
