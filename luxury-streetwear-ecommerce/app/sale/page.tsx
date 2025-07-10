"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Filter, Heart, Eye, ShoppingBag, Star, Flame, Tag, Clock, TrendingDown, Zap } from "lucide-react"
import Image from "next/image"

export default function SalePage() {
  const [sortBy, setSortBy] = useState("discount")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const saleProducts = [
    {
      id: 1,
      name: "DIVINE HOODIE",
      originalPrice: 399,
      salePrice: 299,
      discount: 25,
      image: "/placeholder.svg?height=500&width=400",
      badge: "FLASH SALE",
      category: "hoodies",
      colors: ["#000", "#fff", "#ff0080"],
      rating: 4.9,
      reviews: 127,
      timeLeft: "2h 45m",
      stock: 12,
      description: "Premium heavyweight hoodie with mythological embroidery",
      isFlashSale: true,
    },
    {
      id: 2,
      name: "NEON TEE PACK",
      originalPrice: 129,
      salePrice: 89,
      discount: 31,
      image: "/placeholder.svg?height=500&width=400",
      badge: "BUNDLE DEAL",
      category: "tees",
      colors: ["#00ff00", "#ff0080", "#0080ff"],
      rating: 4.8,
      reviews: 89,
      timeLeft: "1d 12h",
      stock: 45,
      description: "Set of 2 glow-in-the-dark tees with retro-future aesthetics",
      isBundleDeal: true,
    },
    {
      id: 3,
      name: "RETRO BOMBER",
      originalPrice: 799,
      salePrice: 559,
      discount: 30,
      image: "/placeholder.svg?height=500&width=400",
      badge: "LAST CHANCE",
      category: "outerwear",
      colors: ["#000", "#8B7355"],
      rating: 5.0,
      reviews: 45,
      timeLeft: "5h 20m",
      stock: 3,
      description: "Vintage-inspired bomber with holographic details",
      isLastChance: true,
    },
    {
      id: 4,
      name: "CHAOS CARGO",
      originalPrice: 299,
      salePrice: 199,
      discount: 33,
      image: "/placeholder.svg?height=500&width=400",
      badge: "CLEARANCE",
      category: "bottoms",
      colors: ["#000", "#8B7355", "#556B2F"],
      rating: 4.7,
      reviews: 156,
      timeLeft: "3d 8h",
      stock: 28,
      description: "Multi-pocket cargo pants with tech fabric construction",
      isClearance: true,
    },
    {
      id: 5,
      name: "CYBER GLOVES",
      originalPrice: 149,
      salePrice: 99,
      discount: 34,
      image: "/placeholder.svg?height=500&width=400",
      badge: "WEEKEND SPECIAL",
      category: "accessories",
      colors: ["#000", "#C0C0C0"],
      rating: 4.6,
      reviews: 78,
      timeLeft: "2d 15h",
      stock: 67,
      description: "LED-embedded tactical gloves with touch screen compatibility",
      isWeekendSpecial: true,
    },
    {
      id: 6,
      name: "ANCIENT SNEAKERS",
      originalPrice: 449,
      salePrice: 299,
      discount: 33,
      image: "/placeholder.svg?height=500&width=400",
      badge: "FINAL SALE",
      category: "footwear",
      colors: ["#fff", "#000", "#ff0080"],
      rating: 4.9,
      reviews: 234,
      timeLeft: "6h 30m",
      stock: 8,
      description: "Limited edition sneakers with ancient symbol detailing",
      isFinalSale: true,
    },
  ]

  const categories = [
    { id: "hoodies", name: "Hoodies", count: 8 },
    { id: "tees", name: "T-Shirts", count: 15 },
    { id: "outerwear", name: "Outerwear", count: 5 },
    { id: "bottoms", name: "Bottoms", count: 12 },
    { id: "footwear", name: "Footwear", count: 4 },
    { id: "accessories", name: "Accessories", count: 23 },
  ]

  const filteredProducts = saleProducts.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1]
    return matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        return b.discount - a.discount
      case "price-low":
        return a.salePrice - b.salePrice
      case "price-high":
        return b.salePrice - a.salePrice
      case "ending-soon":
        return a.timeLeft.localeCompare(b.timeLeft)
      default:
        return 0
    }
  })

  const getBadgeColor = (product: any) => {
    if (product.isFlashSale) return "bg-red-500 animate-pulse"
    if (product.isLastChance) return "bg-orange-500"
    if (product.isFinalSale) return "bg-purple-500"
    if (product.isBundleDeal) return "bg-green-500"
    if (product.isWeekendSpecial) return "bg-blue-500"
    if (product.isClearance) return "bg-yellow-500 text-black"
    return "bg-gradient-to-r from-pink-500 to-cyan-500 text-black"
  }

  const getStockColor = (stock: number) => {
    if (stock <= 5) return "text-red-400"
    if (stock <= 15) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-500/30 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-red-500 text-white font-bold text-lg px-6 py-2 animate-pulse">
              <Flame className="w-4 h-4 mr-2" />
              SACRED SALE
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              DIVINE DEALS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transcendent pieces at mortal prices. Limited time offers on our most coveted collections.
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="flex items-center space-x-2 text-red-400">
                <TrendingDown className="w-5 h-5" />
                <span>Up to 50% OFF</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-400">
                <Clock className="w-5 h-5" />
                <span>Limited Time</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Zap className="w-5 h-5" />
                <span>Flash Sales</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">{sortedProducts.length} items on sale</span>
              <Badge variant="outline" className="border-red-500 text-red-400">
                Up to 50% OFF
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                </SelectContent>
              </Select>
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
                  SALE FILTERS
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
                        <input
                          type="checkbox"
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category.id])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category.id))
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-pink-500 focus:ring-pink-500"
                        />
                        <label htmlFor={category.id} className="text-sm flex-1 cursor-pointer">
                          {category.name}
                        </label>
                        <span className="text-xs text-gray-400">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange([0, 1000])
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Sale Info */}
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-800">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center text-red-400">
                  <Tag className="w-4 h-4 mr-2" />
                  SALE INFO
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Flash sales end when timer expires</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>Final sale items are non-returnable</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span>Bundle deals available on selected items</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Free shipping on sale orders over $150</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
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
                  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
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

                        {/* Sale Badge */}
                        <Badge className={`absolute top-4 left-4 font-bold ${getBadgeColor(product)}`}>
                          {product.badge}
                        </Badge>

                        {/* Discount Badge */}
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white font-bold text-lg">
                          -{product.discount}%
                        </Badge>

                        {/* Timer */}
                        {(product.isFlashSale || product.isLastChance) && (
                          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                            <div className="flex items-center space-x-2 text-red-400">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-bold">{product.timeLeft}</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="absolute top-16 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

                        {/* Pricing */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-red-400">${product.salePrice}</span>
                            <span className="text-gray-500 line-through">${product.originalPrice}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-400">{product.rating}</span>
                          </div>
                        </div>

                        {/* Stock Info */}
                        <div className="flex items-center justify-between mb-4 text-sm">
                          <span className={`font-semibold ${getStockColor(product.stock)}`}>
                            {product.stock <= 5 ? `Only ${product.stock} left!` : `${product.stock} in stock`}
                          </span>
                          <span className="text-gray-400">{product.reviews} reviews</span>
                        </div>

                        {/* Colors */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex space-x-1">
                            {product.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-gray-600"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-green-400">
                            Save ${product.originalPrice - product.salePrice}
                          </span>
                        </div>

                        <Button
                          className={`w-full font-bold hover:scale-105 transition-transform ${
                            product.isFlashSale
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-gradient-to-r from-pink-500 to-cyan-500 text-black"
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          {product.isFlashSale ? "FLASH BUY" : "ADD TO CART"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sale Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-900/10 to-orange-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              NEVER MISS A SALE
            </h2>
            <p className="text-gray-400 mb-8">
              Get exclusive access to flash sales, early bird discounts, and member-only deals
            </p>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-8 py-3">
              JOIN SALE ALERTS
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
