"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Heart,
  ShoppingBag,
  Star,
  Zap,
  Crown,
  Flame,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  if (!mounted) return null;

  const heroSlides = [
    {
      id: 1,
      title: "DIVINE REBELLION",
      subtitle: "SS24 COLLECTION",
      description: "Where ancient mythology meets street rebellion",
      image: "/placeholder.svg?height=800&width=1200",
      video: "/placeholder-video.mp4",
      cta: "EXPLORE COLLECTION",
      theme: "mythology",
    },
    {
      id: 2,
      title: "NEON GODS",
      subtitle: "LIMITED DROP",
      description: "Transcend reality with our cyberpunk mythology series",
      image: "/placeholder.svg?height=800&width=1200",
      video: "/placeholder-video2.mp4",
      cta: "SHOP NOW",
      theme: "cyberpunk",
    },
    {
      id: 3,
      title: "RETRO FUTURE",
      subtitle: "ARCHIVE COLLECTION",
      description: "Vintage aesthetics reimagined for the digital age",
      image: "/placeholder.svg?height=800&width=1200",
      video: "/placeholder-video3.mp4",
      cta: "DISCOVER",
      theme: "retro",
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "DIVINE HOODIE",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg?height=500&width=400",
      badge: "LIMITED",
      colors: ["#000", "#fff", "#ff0080"],
      rating: 4.9,
      reviews: 127,
      isHot: true,
    },
    {
      id: 2,
      name: "NEON TEE",
      price: 89,
      image: "/placeholder.svg?height=500&width=400",
      badge: "NEW",
      colors: ["#00ff00", "#ff0080", "#0080ff"],
      rating: 4.8,
      reviews: 89,
      isNew: true,
    },
    {
      id: 3,
      name: "CYBER JACKET",
      price: 599,
      image: "/placeholder.svg?height=500&width=400",
      badge: "EXCLUSIVE",
      colors: ["#000", "#333"],
      rating: 5.0,
      reviews: 45,
      isExclusive: true,
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Street Artist",
      content: "Sacred Mayhem isn't just clothing—it's wearable mythology. Every piece tells a story.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      role: "Fashion Influencer",
      content: "The quality is unmatched. These pieces are investment art that you can wear.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      id: 3,
      name: "Jordan Kim",
      role: "Creative Director",
      content: "Finally, a brand that understands the intersection of culture, art, and fashion.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>
      {/* Enhanced Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-12 h-12 border border-pink-500/30 rounded-full pointer-events-none z-50"
        animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />

      {/* Enhanced Navigation */}
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
                    className="relative hover:text-pink-400 transition-colors group"
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
              className="flex items-center space-x-4"
            >
               <Button variant="ghost" size="icon" className="relative group">
                <Heart className="w-5 h-5 group-hover:text-pink-400 transition-colors" />
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative group">
                <ShoppingBag className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                <Badge className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </Badge>
              </Button>
              {typeof window !== "undefined" && localStorage.getItem("token") ? (
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

      {/* Enhanced Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 z-10" />
            <Image
              src={heroSlides[currentSlide].image || "/placeholder.svg"}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />

            {/* Enhanced Glitch Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 mix-blend-overlay z-20 animate-pulse" />

            {/* Floating Particles */}
            <div className="absolute inset-0 z-15">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
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
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Hero Content */}
        <div className="relative z-30 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-5xl px-6"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold text-lg px-8 py-3 rounded-full">
                <Zap className="w-4 h-4 mr-2" />
                {heroSlides[currentSlide].subtitle}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-110 transition-all duration-300 px-8 py-4 text-lg rounded-full shadow-2xl"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg rounded-full"
              >
                WATCH FILM
                <Play className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Hero Controls */}
        <div className="absolute bottom-8 left-8 z-30 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-8 right-8 z-30 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-16 bg-gradient-to-r from-pink-500 to-cyan-500" : "w-8 bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "CULT MEMBERS", icon: Crown },
              { number: "200+", label: "PIECES DROPPED", icon: Zap },
              { number: "99%", label: "SATISFACTION", icon: Star },
              { number: "24H", label: "AVG SELLOUT", icon: Flame },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="mb-4 flex justify-center">
                  <stat.icon className="w-8 h-8 text-pink-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-white/10 text-white backdrop-blur-sm px-6 py-2">FEATURED DROPS</Badge>
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              DIVINE DROPS
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Exclusive pieces that transcend the ordinary. Each drop tells a story of rebellion and divinity, crafted
              for those who dare to stand apart.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -20, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm hover:border-pink-500/50 transition-all duration-500 shadow-2xl">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={500}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Enhanced Badges */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`font-bold text-xs px-3 py-1 ${
                            product.isHot
                              ? "bg-red-500 animate-pulse"
                              : product.isNew
                                ? "bg-green-500"
                                : product.isExclusive
                                  ? "bg-purple-500"
                                  : "bg-gradient-to-r from-pink-500 to-cyan-500 text-black"
                          }`}
                        >
                          {product.badge}
                        </Badge>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-black/70 backdrop-blur-sm hover:bg-pink-500/20"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-black/70 backdrop-blur-sm hover:bg-cyan-500/20"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quick Add Button */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-transform">
                          QUICK ADD
                        </Button>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold">{product.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-400">{product.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-gray-500 line-through text-lg">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {product.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-5 h-5 rounded-full border-2 border-gray-600 hover:border-white transition-colors cursor-pointer"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                        <span>{product.reviews} reviews</span>
                        <span>Free shipping</span>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-all duration-300 py-3">
                        <ShoppingBag className="w-5 h-5 mr-2" />
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

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-900/10 to-cyan-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              CULT TESTIMONIALS
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from our community of rebels, artists, and visionaries who wear Sacred Mayhem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group"
              >
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-900/20 to-cyan-900/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,128,0.3),transparent_50%)]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-8 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold text-lg px-8 py-3 rounded-full">
              JOIN THE REVOLUTION
            </Badge>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              JOIN THE CULT
            </h2>
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Be the first to know about exclusive drops, behind-the-scenes content, and mythological inspirations. Join
              50,000+ rebels in the Sacred Mayhem community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                placeholder="Enter your email to transcend"
                className="bg-black/50 border-gray-700 text-white placeholder-gray-400 backdrop-blur-sm text-lg py-6 rounded-full"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold text-lg py-6 px-8 rounded-full hover:scale-105 transition-transform">
                TRANSCEND
              </Button>
            </div>
            <p className="text-gray-500 text-sm mt-4">No spam, just divine drops and sacred updates.</p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-6 border-t border-gray-800 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                SACRED MAYHEM
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Where mythology meets streetwear. We create wearable art that channels divine rebellion into
                contemporary fashion. Transcend the ordinary.
              </p>
              <div className="flex space-x-4">
                {["Instagram", "Twitter", "TikTok", "Discord"].map((social) => (
                  <Button key={social} variant="ghost" size="icon" className="hover:text-pink-400 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current" />
                  </Button>
                ))}
              </div>
            </div>

            {[
              {
                title: "SHOP",
                links: ["New Arrivals", "Collections", "Sale", "Gift Cards"],
              },
              {
                title: "SUPPORT",
                links: ["Contact", "Shipping", "Returns", "Size Guide"],
              },
              {
                title: "COMPANY",
                links: ["About", "Careers", "Press", "Sustainability"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-bold mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 SACRED MAYHEM. All rights reserved. Transcend reality.
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
