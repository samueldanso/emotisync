"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form"
import {
  companionSchema,
  type CompanionFormValues,
} from "@/lib/validations/companion-schema"
import { showErrorToast } from "@/lib/utils/errors"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { supabaseClient } from "@/lib/supabase/client"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { createCompleteProfile } from "@/actions/profile"
import { ProgressSteps } from "@/components/progress-steps"
import { WelcomeButtons } from "@/components/onboarding-buttons"
import { getCompanions } from "@/actions/companion"
import type { Companion } from "@/lib/db/schemas"
import {
  PERSONALITY_MAPPING,
  PERSONALITY_DESCRIPTIONS,
  ONBOARDING_LABELS,
  ONBOARDING_PLACEHOLDERS,
} from "@/lib/constants"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { generateTypewriterKey } from "@/lib/utils/text"

export function CompanionSelection() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [companions, setCompanions] = useState<Companion[]>([])
  const { goal, reset } = useOnboardingStore()

  async function loadCompanions() {
    try {
      const { data, error } = await getCompanions()
      if (error) {
        showErrorToast(error)
        return
      }
      if (data) {
        setCompanions(data)
      }
    } catch (error) {
      showErrorToast(error)
    }
  }

  useEffect(() => {
    loadCompanions()
  }, [])

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

      reset()

      toast.success(`${data.companionName} is ready for you!`, {
        duration: 2000,
        className: "bg-brand-background border-brand-accent",
        description: "Taking you to your companion...",
      })

      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/app/chat")
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden lg:flex-row">
      {/* Left gradient section - hidden on mobile */}
      <div className="relative hidden bg-gradient-to-b from-brand-accent via-brand-primary to-brand-primary lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_transparent_100%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center p-8">
          <div className="space-y-4 text-center">
            <motion.h2
              className="text-3xl text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {Array.from("Almost there!").map((char, index) => (
                <motion.span
                  key={generateTypewriterKey(char, index, "companion")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.05,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              className="font-medium text-base text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Choose your AI companion's personality and give them a name.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right form section - full width on mobile */}
      <div className="flex w-full flex-col bg-brand-background lg:w-1/2">
        {/* Mobile gradient banner */}
        <div className="h-32 bg-gradient-to-b from-brand-accent via-brand-primary to-brand-primary p-4 lg:hidden">
          <motion.h2 className="text-center text-2xl text-white">
            Almost there!
          </motion.h2>
          <motion.p
            className="mt-2 text-center text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Choose your AI companion's personality and give them a name.
          </motion.p>
        </div>

        <div className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
          {/* Progress steps */}
          <div className="mb-8 px-4">
            <ProgressSteps />
          </div>

          {/* Form content */}
          <div className="mx-auto w-full max-w-[400px] space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-brand-muted text-sm">
                        Choose your AI companion's personality
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-6">
                          {companions.length === 0 ? (
                            // Loading skeletons
                            <>
                              {[1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className="flex flex-col items-center space-y-4"
                                >
                                  <Skeleton className="h-24 w-24 rounded-full" />
                                  <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-24" />
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            // Actual avatars
                            companions.map((companion) => {
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
                            })
                          )}
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
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-brand-muted text-sm">
                        {ONBOARDING_LABELS.companionName}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={ONBOARDING_PLACEHOLDERS.companionName}
                          className="h-11 rounded-lg border-zinc-200 bg-white/60 shadow-sm transition-colors focus:bg-white/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <div className="flex gap-4">
                    <WelcomeButtons
                      isLoading={isLoading}
                      showBack={true}
                      onBack={() => {
                        useOnboardingStore.getState().goBack()
                        router.push("/onboarding/profile")
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
