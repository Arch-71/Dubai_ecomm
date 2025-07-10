"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Filter, Grid, List, Search, Heart, Eye, ShoppingBag } from "lucide-react"
import Image from "next/image"

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")

  const products = [
    {
      id: 1,
      name: "DIVINE HOODIE",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg?height=400&width=300",
      badge: "LIMITED",
      category: "hoodies",
      colors: ["black", "white", "pink"],
      description: "Premium heavyweight hoodie with mythological embroidery",
    },
    {
      id: 2,
      name: "NEON TEE",
      price: 89,
      image: "/placeholder.svg?height=400&width=300",
      badge: "NEW",
      category: "tees",
      colors: ["neon", "pink", "blue"],
      description: "Glow-in-the-dark print with retro-future aesthetics",
    },
    {
      id: 3,
      name: "CYBER JACKET",
      price: 599,
      image: "/placeholder.svg?height=400&width=300",
      badge: "EXCLUSIVE",
      category: "outerwear",
      colors: ["black", "gray"],
      description: "Technical jacket with LED accent strips",
    },
    {
      id: 4,
      name: "MYTHIC PANTS",
      price: 199,
      image: "/placeholder.svg?height=400&width=300",
      badge: "BESTSELLER",
      category: "bottoms",
      colors: ["black", "cargo"],
      description: "Cargo pants with ancient symbol embroidery",
    },
    {
      id: 5,
      name: "RETRO SNEAKERS",
      price: 249,
      image: "/placeholder.svg?height=400&width=300",
      badge: "COLLAB",
      category: "footwear",
      colors: ["white", "black", "neon"],
      description: "Limited collaboration with underground artists",
    },
    {
      id: 6,
      name: "GLITCH MASK",
      price: 79,
      image: "/placeholder.svg?height=400&width=300",
      badge: "ACCESSORY",
      category: "accessories",
      colors: ["black", "chrome"],
      description: "Digital-inspired face mask with holographic details",
    },
  ]

  const categories = [
    { id: "hoodies", name: "Hoodies", count: 12 },
    { id: "tees", name: "T-Shirts", count: 24 },
    { id: "outerwear", name: "Outerwear", count: 8 },
    { id: "bottoms", name: "Bottoms", count: 16 },
    { id: "footwear", name: "Footwear", count: 6 },
    { id: "accessories", name: "Accessories", count: 18 },
  ]

  const colors = [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "pink", name: "Pink", hex: "#FF0080" },
    { id: "neon", name: "Neon", hex: "#00FF00" },
    { id: "blue", name: "Blue", hex: "#0080FF" },
    { id: "gray", name: "Gray", hex: "#808080" },
    { id: "cargo", name: "Cargo", hex: "#8B7355" },
    { id: "chrome", name: "Chrome", hex: "#C0C0C0" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesColor = selectedColors.length === 0 || product.colors.some((color) => selectedColors.includes(color))
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesColor && matchesPrice
  })

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                SACRED COLLECTION
              </h1>
              <p className="text-gray-400 mt-2">
                Explore the complete Sacred Mayhem universe. Each piece channels divine rebellion into wearable art.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white w-64"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-gray-700 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 space-y-8 sticky top-32 h-fit">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  FILTERS
                </h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category.id])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category.id))
                            }
                          }}
                        />
                        <label htmlFor={category.id} className="text-sm flex-1 cursor-pointer">
                          {category.name}
                        </label>
                        <span className="text-xs text-gray-400">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Colors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => {
                          if (selectedColors.includes(color.id)) {
                            setSelectedColors(selectedColors.filter((c) => c !== color.id))
                          } else {
                            setSelectedColors([...selectedColors, color.id])
                          }
                        }}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColors.includes(color.id) ? "border-white" : "border-gray-600"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedColors([])
                    setPriceRange([0, 1000])
                    setSearchQuery("")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300">
                    <CardContent className="p-0">
                      {viewMode === "grid" ? (
                        <>
                          <div className="relative overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={300}
                              height={400}
                              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold">
                              {product.badge}
                            </Badge>
                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-gray-500 line-through">${product.originalPrice}</span>
                                )}
                              </div>
                              <div className="flex space-x-1">
                                {product.colors.slice(0, 3).map((colorId, i) => {
                                  const color = colors.find((c) => c.id === colorId)
                                  return (
                                    <div
                                      key={i}
                                      className="w-4 h-4 rounded-full border border-gray-600"
                                      style={{ backgroundColor: color?.hex }}
                                    />
                                  )
                                })}
                              </div>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-transform">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              ADD TO CART
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex p-6">
                          <div className="relative w-32 h-32 mr-6">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                            <Badge className="absolute -top-2 -left-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold text-xs">
                              {product.badge}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-gray-500 line-through">${product.originalPrice}</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex space-x-1">
                                  {product.colors.slice(0, 3).map((colorId, i) => {
                                    const color = colors.find((c) => c.id === colorId)
                                    return (
                                      <div
                                        key={i}
                                        className="w-4 h-4 rounded-full border border-gray-600"
                                        style={{ backgroundColor: color?.hex }}
                                      />
                                    )
                                  })}
                                </div>
                                <Button size="icon" variant="ghost">
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold">
                                  <ShoppingBag className="w-4 h-4 mr-2" />
                                  ADD TO CART
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold mb-4">No products found</h3>
                <p className="text-gray-400 mb-8">Try adjusting your filters or search terms</p>
                <Button
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedColors([])
                    setPriceRange([0, 1000])
                    setSearchQuery("")
                  }}
                  className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
