"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Bell, Eye, Heart, Share2, Calendar, Zap } from "lucide-react"
import Image from "next/image"

export default function DropsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [email, setEmail] = useState("")
  const [isNotified, setIsNotified] = useState(false)

  const upcomingDrop = {
    id: 1,
    name: "DIVINE REBELLION SS24",
    description: "The most anticipated drop of the season. Limited to 500 pieces worldwide.",
    image: "/placeholder.svg?height=600&width=800",
    releaseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    price: "Starting at $199",
    pieces: 12,
    totalStock: 500,
    previewImages: [
      "/placeholder.svg?height=300&width=250",
      "/placeholder.svg?height=300&width=250",
      "/placeholder.svg?height=300&width=250",
    ],
  }

  const pastDrops = [
    {
      id: 2,
      name: "NEON GODS",
      description: "Cyberpunk mythology collection",
      image: "/placeholder.svg?height=400&width=600",
      status: "SOLD OUT",
      originalStock: 300,
      soldOut: true,
      dropDate: "2024-01-01",
      soldOutTime: "2 minutes",
    },
    {
      id: 3,
      name: "RETRO FUTURE",
      description: "Vintage aesthetics reimagined",
      image: "/placeholder.svg?height=400&width=600",
      status: "LIMITED STOCK",
      originalStock: 200,
      remaining: 23,
      soldOut: false,
      dropDate: "2023-12-15",
    },
    {
      id: 4,
      name: "ANCIENT TECH",
      description: "Where mythology meets technology",
      image: "/placeholder.svg?height=400&width=600",
      status: "SOLD OUT",
      originalStock: 150,
      soldOut: true,
      dropDate: "2023-12-01",
      soldOutTime: "45 minutes",
    },
    {
      id: 5,
      name: "SACRED GEOMETRY",
      description: "Mathematical beauty in fashion",
      image: "/placeholder.svg?height=400&width=600",
      status: "SOLD OUT",
      originalStock: 100,
      soldOut: true,
      dropDate: "2023-11-15",
      soldOutTime: "1 minute",
    },
  ]

  const upcomingSchedule = [
    {
      id: 6,
      name: "CHAOS THEORY",
      description: "Experimental designs that challenge boundaries",
      date: "2024-02-15",
      pieces: 8,
      estimatedStock: 200,
      status: "ANNOUNCED",
    },
    {
      id: 7,
      name: "DIGITAL SHAMANS",
      description: "Tech-wear meets spiritual symbolism",
      date: "2024-03-01",
      pieces: 15,
      estimatedStock: 400,
      status: "TEASED",
    },
    {
      id: 8,
      name: "URBAN MYTHOLOGY",
      description: "Street legends reimagined",
      date: "2024-03-15",
      pieces: 20,
      estimatedStock: 600,
      status: "CONCEPT",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = upcomingDrop.releaseDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [upcomingDrop.releaseDate])

  const handleNotifyMe = () => {
    if (email) {
      setIsNotified(true)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section - Upcoming Drop */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
        <Image
          src={upcomingDrop.image || "/placeholder.svg"}
          alt={upcomingDrop.name}
          fill
          className="object-cover opacity-60"
          priority
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold text-lg px-6 py-2">
              <Zap className="w-4 h-4 mr-2" />
              NEXT DROP
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              {upcomingDrop.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">{upcomingDrop.description}</p>
            <p className="text-2xl font-bold mb-12 text-pink-400">
              {upcomingDrop.price} • {upcomingDrop.pieces} Pieces • Limited to {upcomingDrop.totalStock}
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
              {[
                { label: "DAYS", value: timeLeft.days },
                { label: "HOURS", value: timeLeft.hours },
                { label: "MINUTES", value: timeLeft.minutes },
                { label: "SECONDS", value: timeLeft.seconds },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                >
                  <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Preview Images */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              {upcomingDrop.previewImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image src={image || "/placeholder.svg"} alt={`Preview ${index + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Notify Me Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="max-w-md mx-auto"
            >
              {!isNotified ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email for drop alerts"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/50 border-gray-700 text-white placeholder-gray-400 backdrop-blur-sm"
                  />
                  <Button
                    onClick={handleNotifyMe}
                    className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-transform"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    NOTIFY ME
                  </Button>
                </div>
              ) : (
                <div className="bg-green-900/50 border border-green-700 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-green-400 font-semibold">✓ You'll be notified when the drop goes live!</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Drops Tabs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="past" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 mb-12">
              <TabsTrigger value="past" className="text-lg">
                Past Drops
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="text-lg">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-lg">
                Schedule
              </TabsTrigger>
            </TabsList>

            {/* Past Drops */}
            <TabsContent value="past">
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  LEGENDARY DROPS
                </h2>
                <p className="text-gray-400 mb-12 text-lg">
                  Explore our previous collections. Some pieces may still be available in limited quantities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {pastDrops.map((drop, index) => (
                    <motion.div
                      key={drop.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer"
                    >
                      <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden h-64">
                            <Image
                              src={drop.image || "/placeholder.svg"}
                              alt={drop.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                            {/* Status Badge */}
                            <Badge
                              className={`absolute top-4 left-4 font-bold ${
                                drop.soldOut
                                  ? "bg-red-500 text-white"
                                  : "bg-gradient-to-r from-pink-500 to-cyan-500 text-black"
                              }`}
                            >
                              {drop.status}
                            </Badge>

                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="bg-black/50 backdrop-blur-sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Drop Info */}
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center space-x-4 mb-2 text-sm text-gray-300">
                                <span>Dropped: {new Date(drop.dropDate).toLocaleDateString()}</span>
                                {drop.soldOutTime && (
                                  <span className="text-red-400">Sold out in {drop.soldOutTime}</span>
                                )}
                              </div>
                              <h3 className="text-2xl font-bold mb-2 text-white">{drop.name}</h3>
                              <p className="text-gray-300 mb-4">{drop.description}</p>

                              {!drop.soldOut && drop.remaining && (
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-2">
                                    <span>Stock Remaining</span>
                                    <span>
                                      {drop.remaining}/{drop.originalStock}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-pink-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${(drop.remaining / drop.originalStock) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-6">
                            {drop.soldOut ? (
                              <Button disabled className="w-full bg-gray-700 text-gray-400 cursor-not-allowed">
                                SOLD OUT
                              </Button>
                            ) : (
                              <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold hover:scale-105 transition-transform">
                                SHOP NOW
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Upcoming Drops */}
            <TabsContent value="upcoming">
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  WHAT'S COMING
                </h2>
                <p className="text-gray-400 mb-12 text-lg">
                  Get ready for the next wave of sacred mayhem. These drops are in various stages of development.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {upcomingSchedule.map((drop, index) => (
                    <motion.div
                      key={drop.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group"
                    >
                      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              className={`${
                                drop.status === "ANNOUNCED"
                                  ? "bg-green-500"
                                  : drop.status === "TEASED"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                              } text-white font-bold`}
                            >
                              {drop.status}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-400">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(drop.date).toLocaleDateString()}
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-2">{drop.name}</h3>
                          <p className="text-gray-400 mb-4">{drop.description}</p>

                          <div className="space-y-2 text-sm text-gray-400 mb-6">
                            <div className="flex justify-between">
                              <span>Pieces:</span>
                              <span>{drop.pieces}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Est. Stock:</span>
                              <span>{drop.estimatedStock}</span>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold">
                            <Bell className="w-4 h-4 mr-2" />
                            GET NOTIFIED
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Drop Schedule */}
            <TabsContent value="schedule">
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  DROP SCHEDULE
                </h2>
                <p className="text-gray-400 mb-12 text-lg">
                  Stay ahead of the game. All drops happen at 12:00 PM EST on the scheduled date.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <Card className="bg-gray-900/50 border-gray-800 p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Clock className="w-8 h-8 text-pink-400" />
                      <div className="text-left">
                        <h3 className="font-bold text-lg">Regular Drops</h3>
                        <p className="text-gray-400">Every 2nd Friday of the month</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Our main collections featuring 8-12 pieces with limited quantities.
                    </p>
                  </Card>

                  <Card className="bg-gray-900/50 border-gray-800 p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Bell className="w-8 h-8 text-cyan-400" />
                      <div className="text-left">
                        <h3 className="font-bold text-lg">Surprise Drops</h3>
                        <p className="text-gray-400">Unscheduled releases</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Exclusive pieces and collaborations announced 24 hours before release.
                    </p>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-lg p-8 backdrop-blur-sm border border-gray-700">
                  <h3 className="text-2xl font-bold mb-4">Never Miss a Drop</h3>
                  <p className="text-gray-300 mb-6">
                    Join our exclusive drop notifications and get early access to limited releases.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input
                      placeholder="Enter your email"
                      className="bg-black/50 border-gray-700 text-white placeholder-gray-400"
                    />
                    <Button className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold">
                      JOIN WAITLIST
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
