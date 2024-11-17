"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { User, Users } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  onboardingSchema,
  type OnboardingFormValues,
} from "@/lib/validations/onboarding"
import { showErrorToast } from "@/lib/utils/errors"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabaseClient } from "@/lib/supabase/client"
import { useOnboardingStore } from "@/lib/stores/onboarding"
import { ProgressSteps } from "./progress-steps"
import { NavigationButtons } from "./navigation-buttons"

export function WelcomeForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setGoal, goNext } = useOnboardingStore()

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser()
      const firstName = user?.user_metadata?.full_name
        ? user.user_metadata.full_name.split(" ")[0]
        : user?.email?.split("@")[0] || ""

      return {
        name: firstName,
        goal: "",
      }
    },
  })

  async function onSubmit(data: OnboardingFormValues) {
    setIsLoading(true)
    try {
      setGoal(data.goal)
      goNext()
      router.push("/avatar")
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
          <div className="mb-2">
            <Image
              src="/images/icon.png"
              alt="EmotiSync"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="text-center font-semibold text-2xl tracking-tight">
            Welcome to EmotiSync! 👋
          </h1>
          <p className="text-center text-muted-foreground text-sm">
            Your personal AI companion for emotional well-being. Let’s get
            started on your journey to a happier you!
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Your name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Your main goal with EmotiSync
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Use it to brainstorm, write my newsletter faster, etc."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <NavigationButtons
              isLoading={isLoading}
              showBack={false} // First step, no back button
            />
          </form>
        </Form>
      </div>
    </div>
  )
}
