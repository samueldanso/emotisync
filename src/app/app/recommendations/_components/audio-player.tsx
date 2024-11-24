"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2 } from "lucide-react"
import { useState, useRef } from "react"

interface AudioPlayerProps {
  url: string
  title: string
}

export function AudioPlayer({ url, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-lg bg-accent/50 p-3">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <div className="flex-1">
        <p className="font-medium text-sm">{title}</p>
      </div>
      <Volume2 className="h-4 w-4 text-muted-foreground" />
      <audio ref={audioRef} src={url}>
        <track
          kind="captions"
          src={`/captions/${title}.vtt`}
          srcLang="en"
          label="English"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
