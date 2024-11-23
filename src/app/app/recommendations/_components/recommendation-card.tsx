"use client"

import { AudioPlayer } from "./audio-player"

interface RecommendationCardProps {
  recommendation: {
    title: string
    type: "breathing" | "meditation" | "sound" | "action"
    description: string
    duration?: string
    content: string
    audio_url?: string
    steps?: string[]
  }
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <div className="rounded-lg border p-4 hover:bg-accent/50">
      <h3 className="font-semibold">{recommendation.title}</h3>
      {recommendation.duration && (
        <span className="text-muted-foreground text-xs">
          {recommendation.duration}
        </span>
      )}
      <p className="mt-2">{recommendation.description}</p>

      {recommendation.audio_url && (
        <div className="mt-4">
          <AudioPlayer
            url={recommendation.audio_url}
            title={recommendation.title}
          />
        </div>
      )}

      {recommendation.steps && (
        <ul className="mt-2 space-y-1">
          {recommendation.steps.map((step, index) => (
            <li
              key={`${recommendation.title}-step-${step}-${index}`}
              className="flex items-center gap-2"
            >
              <span className="text-primary">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
