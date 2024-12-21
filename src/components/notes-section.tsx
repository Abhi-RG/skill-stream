"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Save, FileText, FileDown } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { toast } from "sonner"

export function NotesSection({ videoId }: { videoId: string }) {
  const [notes, setNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load saved notes when video changes
    const savedNotes = localStorage.getItem(`notes-${videoId}`)
    if (savedNotes) {
      setNotes(savedNotes)
      toast.success("Loaded saved notes")
    } else {
      setNotes("")
    }
  }, [videoId])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      localStorage.setItem(`notes-${videoId}`, notes)
      toast.success("Notes saved successfully!")
    } catch (error) {
      toast.error("Failed to save notes")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = (format: "txt" | "pdf") => {
    try {
      const element = document.createElement("a")
      const file = new Blob([notes], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `notes-${videoId}.${format}`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      toast.success(`Notes downloaded as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error("Failed to download notes")
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <h2 className="font-bold text-lg text-neutral-950">Notes</h2>
      <Textarea
        placeholder="Take notes here..."
        className="min-h-[150px] font-mono"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Notes"}
        </Button>
        <Button 
          onClick={() => handleDownload("txt")}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Download (.txt)
        </Button>
        <Button 
          onClick={() => handleDownload("pdf")}
          className="flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Download (.pdf)
        </Button>
      </div>
    </motion.section>
  )
}

