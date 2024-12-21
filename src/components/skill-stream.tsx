"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { VideoPlayer } from "./video-player"
import { NotesSection } from "./notes-section"
import { Footer } from "./footer"

const initialVideos = [
  {
    id: "jJExHdqJUmA",
    title: "How To Become A Quantitative Analyst In The Age of AI",
  },
  {
    id: "MqAuCW37DHA",
    title: "NumPy Tutorial For Beginners",
  },
  {
    id: "Mdq1WWSdUtw",
    title: "Web Development Guide For Beginners",
  }
]

export function SkillStream() {
  const [currentVideo, setCurrentVideo] = useState(initialVideos[0])
  const [playlists, setPlaylists] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('playlists')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('playlists', JSON.stringify(playlists))
    }
  }, [playlists])

  const handleVideoEnd = () => {
    const currentIndex = initialVideos.findIndex(v => v.id === currentVideo.id)
    if (currentIndex < initialVideos.length - 1) {
      const nextVideo = initialVideos[currentIndex + 1]
      setCurrentVideo(nextVideo)
      toast.success(`Playing next: ${nextVideo.title}`)
    }
  }

  const addToPlaylist = (playlistId: string, video: typeof currentVideo) => {
    setPlaylists(current => {
      const playlist = current.find(p => p.id === playlistId)
      if (!playlist) return current

      if (playlist.videos.some(v => v.id === video.id)) {
        toast.error('Video already in playlist')
        return current
      }

      const updated = current.map(p => {
        if (p.id === playlistId) {
          return { ...p, videos: [...p.videos, video] }
        }
        return p
      })

      toast.success('Added to playlist')
      return updated
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-neutral-100 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-neutral-50 rounded-lg shadow-md flex flex-col"
      >
        <Header
          playlists={playlists}
          setPlaylists={setPlaylists}
          onAddToPlaylist={addToPlaylist}
        />
        <main className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          <Sidebar
            onVideoSelect={setCurrentVideo}
            currentVideo={currentVideo}
          />
          <div className="flex-1 p-6 space-y-6">
            <VideoPlayer video={currentVideo} onVideoEnd={handleVideoEnd} />
            <NotesSection videoId={currentVideo.id} />
          </div>
        </main>
        <Footer />
      </motion.div>
    </motion.div>
  );
}

