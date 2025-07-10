"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Eye, Users, Calendar } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CollectionsPage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)

  const collections = [
    {
      id: "divine-rebellion",
      name: "DIVINE REBELLION",
      subtitle: "SS24 COLLECTION",
      description:
        "Where ancient mythology meets street rebellion. Our flagship collection channels the raw energy of forgotten gods into contemporary streetwear.",
      image: "/placeholder.svg?height=600&width=800",
      pieces: 24,
      priceRange: "$89 - $799",
      status: "AVAILABLE",
      theme: "Mythology × Rebellion",
      inspiration: "Ancient Greek mythology reimagined through the lens of modern street culture",
      colors: ["#000000", "#8B0000", "#FF0080", "#FFD700"],
      featured: true,
    },
    {
      id: "neon-gods",
      name: "NEON GODS",
      subtitle: "CYBERPUNK MYTHOLOGY",
      description:
        "Transcend reality with our cyberpunk mythology series. Digital deities meet street fashion in this electrifying collection.",
      image: "/placeholder.svg?height=600&width=800",
      pieces: 18,
      priceRange: "$99 - $699",
      status: "LIMITED STOCK",
      theme: "Cyberpunk × Divinity",
      inspiration: "Neo-Tokyo aesthetics fused with mythological symbolism",
      colors: ["#00FFFF", "#FF0080", "#00FF00", "#000000"],
      featured: true,
    },
    {
      id: "retro-future",
      name: "RETRO FUTURE",
      subtitle: "ARCHIVE COLLECTION",
      description:
        "Vintage aesthetics reimagined for the digital age. A nostalgic journey through time with futuristic twists.",
      image: "/placeholder.svg?height=600&width=800",
      pieces: 16,
      priceRange: "$79 - $599",
      status: "RESTOCKED",
      theme: "Retro × Future",
      inspiration: "80s and 90s streetwear culture meets contemporary design",
      colors: ["#FF6B35", "#F7931E", "#8E44AD", "#3498DB"],
      featured: false,
    },
    {
      id: "sacred-geometry",
      name: "SACRED GEOMETRY",
      subtitle: "MYSTICAL PATTERNS",
      description:
        "Explore the mathematical beauty of the universe through sacred geometric patterns and mystical symbolism.",
      image: "/placeholder.svg?height=600&width=800",
      pieces: 12,
      priceRange: "$129 - $899",
      status: "COMING SOON",
      theme: "Sacred × Geometric",
      inspiration: "Ancient sacred geometry meets modern minimalism",
      colors: ["#FFFFFF", "#000000", "#C0C0C0", "#FFD700"],
      featured: false,
    },
    {
      id: "chaos-theory",
      name: "CHAOS THEORY",
      subtitle: "EXPERIMENTAL SERIES",
      description:
        "Embrace the beautiful chaos of creation. Experimental designs that challenge conventional streetwear boundaries.",
      image: "/placeholder.svg?height=600&width=800",
      pieces: 20,
      priceRange: "$149 - $1299",
      status: "PRE-ORDER",
      theme: "Chaos × Order",
      inspiration: "Mathematical chaos theory visualized through fashion",
      colors: ["#8B0000", "#000000", "#FF0080", "#00FFFF"],
      featured: false,
    },
    {
      id: "ancient-tech",
      name: "ANCIENT TECH",
      subtitle: "COLLABORATION SERIES",
      description:
        "Where ancient wisdom meets cutting-edge technology. A collaborative exploration of past and future.",
      image: "/placeholder.svg?height=600&width=800",
      pieces: 14,
      priceRange: "$199 - $999",
      status: "SOLD OUT",
      theme: "Ancient × Technology",
      inspiration: "Archaeological artifacts reimagined as tech-wear",
      colors: ["#8B7355", "#2F4F4F", "#000000", "#C0C0C0"],
      featured: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500"
      case "LIMITED STOCK":
        return "bg-yellow-500"
      case "RESTOCKED":
        return "bg-blue-500"
      case "COMING SOON":
        return "bg-purple-500"
      case "PRE-ORDER":
        return "bg-orange-500"
      case "SOLD OUT":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              COLLECTIONS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Curated universes of design. Each collection tells a story, channels an energy, and defines a moment in
              the sacred mayhem timeline.
            </p>
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>6 Collections</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Updated Monthly</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black mb-12 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            FEATURED COLLECTIONS
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {collections
              .filter((c) => c.featured)
              .map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:border-pink-500/50 transition-all duration-500">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden h-80">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        <Badge
                          className={`absolute top-6 left-6 ${getStatusColor(collection.status)} text-white font-bold`}
                        >
                          {collection.status}
                        </Badge>

                        <div className="absolute bottom-6 left-6 right-6">
                          <Badge className="mb-3 bg-white/20 text-white backdrop-blur-sm">{collection.subtitle}</Badge>
                          <h3 className="text-3xl font-black mb-3 text-white">{collection.name}</h3>
                          <p className="text-gray-200 mb-4 line-clamp-2">{collection.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-300">
                              <span>
                                {collection.pieces} pieces • {collection.priceRange}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              EXPLORE
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>

          {/* All Collections Grid */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black mb-12 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            ALL COLLECTIONS
          </motion.h2>

          {/* Collection Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white w-64"
              />
              <Select value={selectedTheme || "all"} onValueChange={(value) => setSelectedTheme(value || "all")}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Filter by theme" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Themes</SelectItem>
                  <SelectItem value="mythology">Mythology</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  <SelectItem value="retro">Retro</SelectItem>
                  <SelectItem value="sacred">Sacred</SelectItem>
                  <SelectItem value="chaos">Chaos</SelectItem>
                  <SelectItem value="ancient">Ancient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-gray-400">
              {
                collections.filter(
                  (c) =>
                    (!selectedTheme || c.theme.toLowerCase().includes(selectedTheme.toLowerCase())) &&
                    (!searchQuery ||
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.description.toLowerCase().includes(searchQuery.toLowerCase())),
                ).length
              }{" "}
              collections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections
              .filter(
                (c) =>
                  (!selectedTheme || c.theme.toLowerCase().includes(selectedTheme.toLowerCase())) &&
                  (!searchQuery ||
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.description.toLowerCase().includes(searchQuery.toLowerCase())),
              )
              .map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden h-64">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                        <Badge
                          className={`absolute top-4 left-4 ${getStatusColor(collection.status)} text-white font-bold text-xs`}
                        >
                          {collection.status}
                        </Badge>

                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-6">
                        <Badge className="mb-2 bg-white/10 text-white text-xs">{collection.subtitle}</Badge>
                        <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{collection.description}</p>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                            <span>Theme: {collection.theme}</span>
                            <span>{collection.pieces} pieces</span>
                          </div>
                          <div className="text-sm text-gray-400 mb-3">{collection.priceRange}</div>

                          {/* Color Palette */}
                          <div className="flex space-x-1 mb-4">
                            {collection.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-gray-600"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-transform"
                          disabled={collection.status === "SOLD OUT"}
                        >
                          {collection.status === "SOLD OUT"
                            ? "SOLD OUT"
                            : collection.status === "COMING SOON"
                              ? "NOTIFY ME"
                              : collection.status === "PRE-ORDER"
                                ? "PRE-ORDER"
                                : "EXPLORE COLLECTION"}
                          {collection.status !== "SOLD OUT" && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Collection Philosophy */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-900/10 to-cyan-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              OUR PHILOSOPHY
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Each collection is a universe unto itself—a carefully crafted narrative that explores the intersection of
              ancient wisdom and contemporary rebellion. We don't just create clothing; we channel energies, tell
              stories, and build communities around shared mythologies.
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold px-8 py-3">
              LEARN MORE ABOUT OUR PROCESS
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
