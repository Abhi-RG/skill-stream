"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Loader2 } from 'lucide-react'

export function VideoPlayer({
  video,
  onVideoEnd,
}: {
  video: { id: string; title: string }
  onVideoEnd: () => void
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Simulate minimum loading time for smooth transitions
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [video.id])

  return (
    <section className="space-y-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg text-neutral-950"
      >
        Now Playing: {video.title}
      </motion.h2>
      <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-sm bg-neutral-100">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-neutral-100"
            >
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-medium bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
                >
                  SkillStream is loading...
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <iframe
          title="YouTube Video"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&enablejsapi=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </section>
  )
}

