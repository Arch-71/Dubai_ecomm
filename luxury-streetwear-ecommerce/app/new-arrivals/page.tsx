"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Eye, ShoppingBag, Sparkles, Clock } from "lucide-react"
import Image from "next/image"

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const newArrivals = [
    {
      id: 1,
      name: "CHAOS HOODIE",
      price: 349,
      image: "/placeholder.svg?height=500&width=400",
      badge: "JUST DROPPED",
      category: "hoodies",
      colors: ["#000", "#8B0000", "#FF0080"],
      description: "Embroidered with ancient chaos symbols",
      releaseDate: "2024-01-15",
      isNew: true,
    },
    {
      id: 2,
      name: "DIVINE FURY TEE",
      price: 129,
      image: "/placeholder.svg?height=500&width=400",
      badge: "NEW",
      category: "tees",
      colors: ["#000", "#fff", "#00FFFF"],
      description: "Hand-painted mythological artwork",
      releaseDate: "2024-01-12",
      isNew: true,
    },
    {
      id: 3,
      name: "SACRED BOMBER",
      price: 699,
      image: "/placeholder.svg?height=500&width=400",
      badge: "EXCLUSIVE",
      category: "outerwear",
      colors: ["#000", "#2F4F4F"],
      description: "Premium leather with holographic details",
      releaseDate: "2024-01-10",
      isNew: true,
    },
    {
      id: 4,
      name: "MAYHEM CARGO",
      price: 249,
      image: "/placeholder.svg?height=500&width=400",
      badge: "HOT",
      category: "bottoms",
      colors: ["#000", "#8B7355", "#556B2F"],
      description: "Multi-pocket design with tech fabric",
      releaseDate: "2024-01-08",
      isNew: true,
    },
    {
      id: 5,
      name: "NEON RITUAL MASK",
      price: 99,
      image: "/placeholder.svg?height=500&width=400",
      badge: "LIMITED",
      category: "accessories",
      colors: ["#FF0080", "#00FFFF", "#000"],
      description: "LED-embedded ceremonial mask",
      releaseDate: "2024-01-05",
      isNew: true,
    },
    {
      id: 6,
      name: "CYBER PROPHET JACKET",
      price: 799,
      image: "/placeholder.svg?height=500&width=400",
      badge: "PREMIUM",
      category: "outerwear",
      colors: ["#000", "#C0C0C0"],
      description: "Reflective panels with smart fabric technology",
      releaseDate: "2024-01-03",
      isNew: true,
    },
  ]

  const sortedProducts = [...newArrivals].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    }
  })

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-pink-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold text-lg px-6 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              FRESH DROPS
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              NEW ARRIVALS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              The latest pieces from the sacred realm. Each design channels divine energy into wearable art.
            </p>
            <div className="flex items-center justify-center space-x-2 text-pink-400">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Updated daily with fresh drops</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Sort */}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">{sortedProducts.length} new pieces</span>
              <Badge variant="outline" className="border-pink-500 text-pink-400">
                Last 30 days
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={500}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* New Badge */}
                      {product.isNew && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold animate-pulse">
                            {product.badge}
                          </Badge>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Release Date */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge variant="outline" className="border-white/30 text-white text-xs">
                          Dropped {new Date(product.releaseDate).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <div className="flex space-x-1">
                          {product.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-gray-600"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-transform">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        ADD TO CART
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-900/10 to-cyan-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              NEVER MISS A DROP
            </h2>
            <p className="text-gray-400 mb-8">Get notified the moment new pieces hit the sacred realm</p>
            <Button className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold px-8 py-3">
              JOIN THE CULT
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
