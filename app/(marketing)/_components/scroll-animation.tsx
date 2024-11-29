"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
}

export function ScrollAnimation({ children, className }: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.4 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
