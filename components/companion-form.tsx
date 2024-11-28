"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  companionSchema,
  type CompanionFormValues,
} from "@/lib/validations/companion-schema"
import { supabaseClient } from "@/lib/supabase/client"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { createCompleteProfile } from "@/actions/profile"
import { ProgressSteps } from "@/components/progress-steps"
import { WelcomeButtons } from "@/components/onboarding-buttons"
import { getCompanions } from "@/actions/companion"
import type { Companion } from "@/lib/db/schemas"
import Image from "next/image"
import {
  PERSONALITY_MAPPING,
  PERSONALITY_DESCRIPTIONS,
  ONBOARDING_LABELS,
  ONBOARDING_PLACEHOLDERS,
} from "@/lib/constants"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

export function CompanionSelection() {
  const router = useRouter()
  const [companions, setCompanions] = useState<Companion[]>([])
  const { goal } = useOnboardingStore()
  const [isLoading, setIsLoading] = useState(false)

  // Load companions on mount
  useEffect(() => {
    loadCompanions()
  }, [])

  async function loadCompanions() {
    const { data } = await getCompanions()
    if (data) setCompanions(data)
  }

  const form = useForm<CompanionFormValues>({
    resolver: zodResolver(companionSchema),
    defaultValues: {
      avatar: "",
      companionName: "",
    },
  })

  async function onSubmit(data: CompanionFormValues) {
    setIsLoading(true)
    try {
      if (!goal) throw new Error("Please complete the previous step first")

      toast.loading("Creating your companion...", {
        description: `Setting up ${data.companionName} for you`,
      })

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

      if (error) throw error

      toast.success("Success!", {
        description: `${data.companionName} is ready to chat!`,
      })

      router.push("/app/chat")
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="w-full bg-brand-background p-6 lg:sticky lg:top-0 lg:h-screen lg:w-[340px] lg:p-8">
          <div className="mb-8 flex items-center gap-2 lg:mb-16">
            <Image
              src="/emotisync-icon.svg"
              alt="EmotiSync"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="font-heading font-semibold text-xl">
              EmotiSync
            </span>
          </div>

          <div className="space-y-2 lg:space-y-3">
            <h2 className="text-brand-primary text-xl">Almost there!</h2>
            <p className="text-brand-muted text-sm leading-relaxed">
              Choose your AI companion's personality and give them a name.
            </p>
          </div>

          <div className="mt-8 lg:mt-12">
            <ProgressSteps />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 lg:min-h-screen lg:px-24 xl:px-32">
          <div className="mx-auto max-w-[480px] pt-8 lg:pt-16">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="mb-8 block text-center text-xl">
                        Choose your AI companion's personality
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-6">
                          {companions.map((companion) => {
                            const mappedPersonality =
                              PERSONALITY_MAPPING[
                                companion.personality as keyof typeof PERSONALITY_MAPPING
                              ]

                            return (
                              <label
                                key={companion.id}
                                className="flex cursor-pointer flex-col"
                              >
                                <input
                                  {...field}
                                  type="radio"
                                  value={companion.id}
                                  className="hidden"
                                />
                                <div className="flex flex-col items-center">
                                  <div
                                    className={cn(
                                      "relative mb-4 transform rounded-full transition-all duration-200",
                                      field.value === companion.id && [
                                        "ring-4",
                                        "ring-brand-primary",
                                        "shadow-lg",
                                        "scale-125",
                                      ],
                                    )}
                                  >
                                    <img
                                      src={companion.image_url}
                                      alt={`AI companion with ${companion.personality} personality`}
                                      className="h-24 w-24 rounded-full object-cover"
                                    />
                                  </div>
                                  <div className="mt-2 space-y-1 text-center">
                                    <p
                                      className={cn(
                                        "font-medium",
                                        field.value === companion.id
                                          ? "text-brand-primary"
                                          : "text-muted-foreground",
                                      )}
                                    >
                                      {mappedPersonality}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                      {PERSONALITY_DESCRIPTIONS[
                                        mappedPersonality
                                      ] || ""}
                                    </p>
                                  </div>
                                </div>
                              </label>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companionName"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-lg">
                        {ONBOARDING_LABELS.companionName}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={ONBOARDING_PLACEHOLDERS.companionName}
                          className="h-[48px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <WelcomeButtons
                    isLoading={isLoading}
                    showBack={true}
                    onBack={() => {
                      useOnboardingStore.getState().goBack()
                      router.push("/welcome/profile")
                    }}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}
