"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Music, Timer, Brain } from "lucide-react";
import { AudioPlayer } from "./_components/audio-player";

export default function RecommendationsPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 font-heading text-3xl">Recommendations</h1>

      {/* Actions Section */}
      <section className="mb-12">
        <h2 className="mb-4 font-semibold text-xl">Actions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Five Senses Grounding</h3>
                <p className="text-muted-foreground text-sm">
                  Bring yourself back to the present moment through sensory
                  awareness.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Start Exercise
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Timer className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Box Breathing</h3>
                <p className="text-muted-foreground text-sm">
                  Calm your mind with this simple breathing technique.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Start Exercise
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Sounds Section */}
      <section>
        <h2 className="mb-4 font-semibold text-xl">Sounds</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Calming Nature Sounds</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Gentle rain and forest ambience to help you relax.
                </p>
                <AudioPlayer url="/sounds/nature.mp3" title="Nature Sounds" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">White Noise</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Consistent background noise to help you focus.
                </p>
                <AudioPlayer
                  url="/sounds/white-noise.mp3"
                  title="White Noise"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
