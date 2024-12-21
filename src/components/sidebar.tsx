"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "../components/ui/button";

const upcomingVideos = [
  {
    id: "quant-analyst",
    title: "How To Become A Quantitative Analyst In The Age of AI",
    videoId: "jJExHdqJUmA",
  },
  {
    id: "numpy-tutorial",
    title: "NumPy Tutorial For Beginners",
    videoId: "MqAuCW37DHA",
  },
  {
    id: "web-development",
    videoId: "Mdq1WWSdUtw",
    title: "Web Development Guide For Beginners",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export function Sidebar({
  onVideoSelect,
  currentVideo,
}: {
  onVideoSelect: (video: { id: string; title: string }) => void;
  currentVideo: { id: string; title: string };
}) {
  return (
    <aside className="w-full md:w-[300px] p-6 space-y-4 bg-neutral-50 rounded-lg shadow-lg">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg text-neutral-950"
      >
        Upcoming Videos
      </motion.h2>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {upcomingVideos.map((video) => (
          <motion.li
            key={video.id}
            variants={item}
            className={`flex justify-between items-center rounded-md p-3 transition-all ease-in-out ${
              currentVideo.id === video.videoId
                ? "bg-primary text-primary-foreground shadow-md transform scale-105"
                : "bg-neutral-200 hover:bg-neutral-300"
            }`}
          >
            <span
              className={`flex-1 ${currentVideo.id === video.videoId ? "font-semibold" : ""}`}
            >
              {video.title}
            </span>
            <Button
              variant="link"
              className={`text-sm ${
                currentVideo.id === video.videoId
                  ? "text-primary-foreground"
                  : "text-primary"
              }`}
              onClick={() =>
                onVideoSelect({ id: video.videoId, title: video.title })
              }
            >
              {currentVideo.id === video.videoId ? (
                <span>Now Playing</span>
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </motion.li>
        ))}
      </motion.ul>
    </aside>
  );
}
