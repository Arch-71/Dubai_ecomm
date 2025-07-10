"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 z-50 origin-left shadow-lg"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
