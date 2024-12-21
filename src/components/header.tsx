"use client";

import { motion } from "framer-motion";
import { Settings, Plus, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

interface Playlist {
  id: string;
  name: string;
  videos: Array<{ id: string; title: string; url: string }>;
}

interface HeaderProps {
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  onAddToPlaylist: (
    playlistId: string,
    video: { id: string; title: string; url: string }
  ) => void;
}

export function Header({
  playlists,
  setPlaylists,
  onAddToPlaylist,
}: HeaderProps) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [videoUrl, setVideoUrl] = useState(""); // State for video URL
  const [isPlaylistsOpen, setIsPlaylistsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }

    if (!videoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }

    // Simple validation for video URL (can be enhanced)
    const videoUrlPattern =
      /^(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+)$/; // Example: YouTube URL validation
    if (!videoUrlPattern.test(videoUrl)) {
      toast.error("Please enter a valid YouTube video URL");
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      videos: [
        {
          id: Date.now().toString(),
          title: `Video - ${newPlaylistName}`, // Default title or can be user-defined
          url: videoUrl,
        },
      ],
    };

    setPlaylists((current) => [...current, newPlaylist]);
    setNewPlaylistName("");
    setVideoUrl(""); // Clear the video URL field
    toast.success("Playlist created with video!");
  };

  const deletePlaylist = (id: string) => {
    setPlaylists((current) => current.filter((p) => p.id !== id));
    toast.success("Playlist deleted");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-[#2A9D8F] text-white py-4 px-6 flex justify-between items-center rounded-t-lg"
    >
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-bold text-xl"
      >
        SkillStream
      </motion.h1>
      <nav className="space-x-4 flex items-center">
        {/* Playlists Dropdown */}
        <DropdownMenu onOpenChange={setIsPlaylistsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Playlists</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-[320px] ${isPlaylistsOpen ? "bg-white" : ""}`}
          >
            <DropdownMenuLabel>Your Playlists</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {playlists.map((playlist) => (
              <DropdownMenuItem
                key={playlist.id}
                className="flex justify-between"
              >
                <span>
                  {playlist.name} ({playlist.videos.length} videos)
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deletePlaylist(playlist.id)}
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            ))}
            <div className="p-4 space-y-2">
              <Input
                placeholder="New Playlist Name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <Input
                placeholder="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <Button className="w-full" onClick={createPlaylist}>
                <Plus className="w-4 h-4 mr-2" />
                Create Playlist
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Icon Button */}
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>

        {/* Settings Dropdown */}
        <DropdownMenu onOpenChange={setIsSettingsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`${isSettingsOpen ? "bg-white" : ""}`}
          >
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Appearance</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </motion.header>
  );
}
