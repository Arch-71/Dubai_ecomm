"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, ShoppingBag, Star, Truck, Shield, RotateCcw, Zap } from "lucide-react"
import Image from "next/image"

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: 1,
    name: "DIVINE HOODIE",
    price: 299,
    originalPrice: 399,
    description:
      "Transcend the ordinary with our Divine Hoodie. Crafted from premium heavyweight cotton with mythological embroidery that tells the story of ancient gods in modern streetwear.",
    badge: "LIMITED EDITION",
    rating: 4.8,
    reviews: 127,
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    colors: [
      { id: "obsidian", name: "Obsidian Black", hex: "#000000" },
      { id: "pearl", name: "Pearl White", hex: "#FFFFFF" },
      { id: "neon", name: "Neon Pink", hex: "#FF0080" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "Premium 450GSM heavyweight cotton",
      "Hand-embroidered mythological motifs",
      "Oversized fit with dropped shoulders",
      "Kangaroo pocket with hidden compartments",
      "Limited to 100 pieces worldwide",
    ],
    story:
      "Inspired by the ancient myth of divine rebellion, this hoodie represents the eternal struggle between order and chaos. Each piece is individually numbered and comes with a certificate of authenticity.",
    care: "Machine wash cold, hang dry, do not bleach. The embroidery will develop a unique patina over time.",
  }

  const relatedProducts = [
    {
      id: 2,
      name: "NEON TEE",
      price: 89,
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 3,
      name: "CYBER JACKET",
      price: 599,
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 4,
      name: "MYTHIC PANTS",
      price: 199,
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-900"
            >
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold">
                {product.badge}
              </Badge>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-pink-500" : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold">${product.price}</span>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <Badge variant="destructive">Save ${product.originalPrice - product.price}</Badge>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">{product.description}</p>
            </motion.div>

            {/* Color Selection */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="font-bold">
                Color: {selectedColor && product.colors.find((c) => c.id === selectedColor)?.name}
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.id ? "border-white scale-110" : "border-gray-600 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size Selection */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="font-bold">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? "border-pink-500 bg-pink-500/20 text-pink-400"
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quantity and Add to Cart */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="font-bold">Quantity</h3>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                  <SelectTrigger className="w-24 bg-gray-900 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-transform"
                  disabled={!selectedColor || !selectedSize}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  ADD TO CART - ${product.price * quantity}
                </Button>
                <Button size="lg" variant="outline" className="border-gray-700">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-gray-700">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 bg-gray-900/50 rounded-lg">
                <Truck className="w-6 h-6 text-pink-400" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-gray-400">On orders over $200</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-900/50 rounded-lg">
                <Shield className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="font-semibold">Authenticity</p>
                  <p className="text-sm text-gray-400">Certificate included</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-900/50 rounded-lg">
                <RotateCcw className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold">30-Day Returns</p>
                  <p className="text-sm text-gray-400">Easy returns policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-900/50 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="font-semibold">Limited Edition</p>
                  <p className="text-sm text-gray-400">Only 100 pieces</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16"
        >
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Product Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full mt-2" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="story" className="mt-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">The Divine Story</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{product.story}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Care Instructions</h3>
                  <p className="text-gray-300 leading-relaxed">{product.care}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-700 pb-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full" />
                          <div>
                            <p className="font-semibold">Anonymous User</p>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300">
                          Amazing quality and the design is absolutely stunning. The embroidery work is incredible and
                          the fit is perfect.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            COMPLETE THE LOOK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="bg-gray-900/50 border-gray-800 overflow-hidden group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={250}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <p className="text-xl font-bold">${product.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
