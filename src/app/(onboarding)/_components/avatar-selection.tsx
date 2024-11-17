"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { avatarSchema, type AvatarFormValues } from "@/lib/validations/avatar"
import { showErrorToast } from "@/lib/utils/errors"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Bot } from "lucide-react"
import { supabaseClient } from "@/lib/supabase/client"
import { useOnboardingStore } from "@/lib/stores/onboarding"
import { createCompleteProfile } from "@/actions/profiles"
import { ProgressSteps } from "./progress-steps"
import { NavigationButtons } from "./navigation-buttons"
import { getAvatars } from "@/actions/avatars"
import type { Avatar } from "@/db/schemas"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

function getPersonalityColor(personality: string): string {
  const colorMap: Record<string, string> = {
    "Calm and insightful": "border-blue-500",
    "Empathetic and supportive": "border-purple-500",
    "Energetic and motivating": "border-orange-500",
    // Add more personality-color mappings as needed
  }

  return colorMap[personality] || "border-gray-200"
}

export function AvatarSelection() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const { goal, reset } = useOnboardingStore()

  async function loadAvatars() {
    setIsLoadingAvatars(true)
    setLoadError(null)
    const { data, error } = await getAvatars()
    if (error) {
      setLoadError(error)
      showErrorToast(error)
      return
    }
    if (data) {
      setAvatars(data)
    }
    setIsLoadingAvatars(false)
  }

  useEffect(() => {
    loadAvatars()
  }, [])

  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: "",
      companionName: "",
    },
  })

  async function onSubmit(data: AvatarFormValues) {
    setIsLoading(true)
    try {
      if (!goal) {
        throw new Error("Please complete the previous step first")
      }

      const {
        data: { user },
      } = await supabaseClient.auth.getUser()
      if (!user?.id || !user?.email) throw new Error("User not found")

      const { error } = await createCompleteProfile(user.id, {
        goal,
        companionName: data.companionName,
        companionAvatar: data.avatar,
        email: user.email,
      })

      if (error) {
        throw new Error(error)
      }

      reset() // Clear onboarding state
      toast.success(`${data.companionName} is ready to be your AI companion!`)
      router.push("/app")
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[440px] rounded-xl border bg-card p-8 shadow-lg">
      <ProgressSteps />

      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="mb-2 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="text-center font-semibold text-2xl tracking-tight">
              Choose Your AI Companion
            </h2>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            Select a personality and give your companion a unique name
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {isLoadingAvatars ? (
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center space-y-2 rounded-lg p-3"
                  >
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : loadError ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <p className="text-destructive text-sm">
                  Failed to load avatars
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => loadAvatars()}
                  className="gap-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Retry
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {avatars.map((avatar) => (
                  <label key={avatar.id} className="cursor-pointer">
                    <input
                      type="radio"
                      value={avatar.id}
                      {...form.register("avatar")}
                      className="hidden"
                    />
                    <div
                      className={cn(
                        "flex flex-col items-center space-y-2 rounded-lg p-3 transition-all",
                        form.watch("avatar") === avatar.id
                          ? "bg-primary/10 ring-2 ring-primary"
                          : "hover:bg-accent",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-full p-1 transition-all duration-300",
                          form.watch("avatar") === avatar.id && "animate-pulse",
                          getPersonalityColor(avatar.personality),
                          form.watch("avatar") === avatar.id
                            ? "border-4"
                            : "border-2",
                        )}
                      >
                        <img
                          src={avatar.image_url}
                          alt={`AI companion with ${avatar.personality} personality`}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                      </div>
                      <p
                        className={cn(
                          "text-center text-xs",
                          form.watch("avatar") === avatar.id
                            ? "font-medium text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {avatar.personality}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {form.formState.errors.avatar && (
              <p className="text-center text-destructive text-sm">
                {form.formState.errors.avatar.message}
              </p>
            )}

            <FormField
              control={form.control}
              name="companionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Give your companion a name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a name for your companion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <NavigationButtons
              isLoading={isLoading}
              showBack={true}
              onBack={() => {
                useOnboardingStore.getState().goBack()
                router.push("/welcome")
              }}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}
