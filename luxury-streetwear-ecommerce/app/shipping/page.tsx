"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  Globe,
  Clock,
  Shield,
  Package,
  MapPin,
  Search,
  CheckCircle,
  AlertCircle,
  Plane,
  Ship,
} from "lucide-react"

export default function ShippingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)

  const shippingOptions = [
    {
      id: "standard",
      name: "STANDARD DELIVERY",
      price: "FREE",
      time: "3-5 Business Days",
      description: "Free shipping on orders over $200",
      icon: Truck,
      features: ["Tracking included", "Signature required", "Insurance up to $100"],
    },
    {
      id: "express",
      name: "EXPRESS DELIVERY",
      price: "$15",
      time: "1-2 Business Days",
      description: "Fast delivery for urgent orders",
      icon: Plane,
      features: ["Priority handling", "Real-time tracking", "Insurance up to $500"],
    },
    {
      id: "overnight",
      name: "OVERNIGHT DELIVERY",
      price: "$35",
      time: "Next Business Day",
      description: "Get your sacred pieces tomorrow",
      icon: Package,
      features: ["Next day guarantee", "Premium packaging", "Insurance up to $1000"],
    },
  ]

  const internationalRates = [
    { region: "North America", price: "$25", time: "5-7 days" },
    { region: "Europe", price: "$35", time: "7-10 days" },
    { region: "Asia Pacific", price: "$45", time: "10-14 days" },
    { region: "Rest of World", price: "$55", time: "14-21 days" },
  ]

  const trackingSteps = [
    { status: "Order Confirmed", date: "Dec 15, 2024", completed: true },
    { status: "Processing", date: "Dec 16, 2024", completed: true },
    { status: "Shipped", date: "Dec 17, 2024", completed: true },
    { status: "In Transit", date: "Dec 18, 2024", completed: false, current: true },
    { status: "Out for Delivery", date: "", completed: false },
    { status: "Delivered", date: "", completed: false },
  ]

  const handleTracking = () => {
    setIsTracking(true)
    // Simulate tracking lookup
    setTimeout(() => setIsTracking(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-pink-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold text-lg px-6 py-2">
              <Truck className="w-4 h-4 mr-2" />
              WORLDWIDE DELIVERY
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              SHIPPING INFO
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Fast, secure, and reliable delivery to transcend geographical boundaries. Your sacred pieces deserve
              divine treatment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-12 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              TRACK YOUR ORDER
            </h2>
            <p className="text-gray-400 mb-8">Enter your tracking number to see the journey of your sacred pieces</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                onClick={handleTracking}
                disabled={isTracking || !trackingNumber}
                className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold"
              >
                {isTracking ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    TRACKING...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    TRACK ORDER
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Tracking Results */}
          {trackingNumber && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Order #SM-{trackingNumber}</h3>
                      <p className="text-gray-400">DIVINE HOODIE + NEON TEE</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-pink-500 to-cyan-500 text-black font-bold">
                      IN TRANSIT
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {trackingSteps.map((step, index) => (
                      <div key={step.status} className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            step.completed
                              ? "bg-green-500"
                              : step.current
                                ? "bg-gradient-to-r from-pink-500 to-cyan-500 animate-pulse"
                                : "bg-gray-600"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-semibold ${
                                step.current ? "text-pink-400" : step.completed ? "text-white" : "text-gray-400"
                              }`}
                            >
                              {step.status}
                            </span>
                            <span className="text-sm text-gray-400">{step.date}</span>
                          </div>
                        </div>
                        {step.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {step.current && <AlertCircle className="w-5 h-5 text-pink-400" />}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-pink-900/20 rounded-lg border border-pink-500/30">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-pink-400" />
                      <div>
                        <p className="font-semibold">Current Location</p>
                        <p className="text-sm text-gray-400">Distribution Center - Los Angeles, CA</p>
                        <p className="text-sm text-gray-400">Expected delivery: Dec 19, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="domestic" className="w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                DELIVERY OPTIONS
              </h2>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-900">
                <TabsTrigger value="domestic" className="text-lg">
                  <Globe className="w-4 h-4 mr-2" />
                  Domestic
                </TabsTrigger>
                <TabsTrigger value="international" className="text-lg">
                  <Ship className="w-4 h-4 mr-2" />
                  International
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="domestic">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {shippingOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <Card className="bg-gray-900/50 border-gray-800 hover:border-pink-500/50 transition-all duration-300 h-full">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <option.icon className="w-8 h-8 text-black" />
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-center mb-2">{option.name}</h3>
                        <div className="text-center mb-4">
                          <span className="text-3xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            {option.price}
                          </span>
                          <p className="text-gray-400 mt-1">{option.time}</p>
                        </div>

                        <p className="text-gray-400 text-center mb-6">{option.description}</p>

                        <ul className="space-y-3">
                          {option.features.map((feature, i) => (
                            <li key={i} className="flex items-center space-x-3">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="international">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">INTERNATIONAL SHIPPING RATES</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {internationalRates.map((rate, index) => (
                        <motion.div
                          key={rate.region}
                          initial={{ y: 30, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold">{rate.region}</h4>
                            <p className="text-sm text-gray-400">{rate.time}</p>
                          </div>
                          <span className="text-xl font-bold text-pink-400">{rate.price}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-cyan-900/20 rounded-lg p-6 border border-cyan-500/30">
                      <h4 className="font-bold mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                        International Shipping Notes
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• All international orders include tracking and insurance</li>
                        <li>• Customs duties and taxes are the responsibility of the recipient</li>
                        <li>• Delivery times may vary due to customs processing</li>
                        <li>• Free shipping available on orders over $500 to select countries</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Shipping Policy */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-900/10 to-cyan-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-black mb-8 text-center bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              SHIPPING POLICY
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-pink-400" />
                    Order Processing
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Orders placed before 2 PM EST ship same day</li>
                    <li>• Custom pieces require 2-3 additional business days</li>
                    <li>• Limited edition items ship within 1-2 business days</li>
                    <li>• Orders placed on weekends ship the following Monday</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                    Package Security
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• All packages require signature confirmation</li>
                    <li>• Discreet packaging protects your privacy</li>
                    <li>• Full insurance coverage on all orders</li>
                    <li>• Eco-friendly packaging materials used</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
