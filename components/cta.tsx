"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { MOTIVATIONAL_PHRASES } from "@/lib/utils"
import useMediaQuery from '@/hooks/useMediaQuery'

export default function CTA() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const isSmallMobile = useMediaQuery(360)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex === MOTIVATIONAL_PHRASES.length - 1) {
          setDirection(-1)
          return prevIndex - 1
        } else if (prevIndex === 0 && direction === -1) {
          setDirection(1)
          return prevIndex + 1
        } else {
          return prevIndex + direction
        }
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [direction])

  return (
    <div className="flex items-center justify-center mt-2">
      <div className="relative min-h-10 md:min-h-14 lg:min-h-20 w-screen overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ y: direction > 0 ? 20 : -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction > 0 ? -20 : 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`absolute left-0 inset-0 flex items-center justify-center 
              ${isSmallMobile ? "text-[15px]" : ""} 
              text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
              text-slate-700 text-center font-bold w-full`}
          >
            {MOTIVATIONAL_PHRASES[currentIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  )
}