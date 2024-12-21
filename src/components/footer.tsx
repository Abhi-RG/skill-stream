"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-neutral-100 text-center py-3 rounded-b-lg shadow-sm"
    >
      <p className="text-neutral-500">
        Powered by DataDriven Dev with Passion
      </p>
    </motion.footer>
  )
}

