"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/validations/profile-schema";
import { showErrorToast } from "@/lib/utils/errors";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { ProgressSteps } from "@/components/progress-steps";
import { WelcomeButtons } from "@/components/onboarding-buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { generateTypewriterKey } from "@/lib/utils/text";

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    setGoal,
    goNext,
    setName,
    name: storedName,
    goal: storedGoal,
    dateOfBirth: storedDob,
    gender: storedGender,
  } = useOnboardingStore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      const firstName = user?.user_metadata?.full_name
        ? user.user_metadata.full_name.split(" ")[0]
        : user?.email?.split("@")[0] || "";

      const validGender = storedGender as
        | "male"
        | "female"
        | "nonbinary"
        | undefined;

      return {
        name: storedName || firstName,
        goal: storedGoal || "",
        dateOfBirth: storedDob || "",
        gender: validGender,
      };
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      setName(data.name);
      setGoal(data.goal);
      useOnboardingStore.getState().setDateOfBirth(data.dateOfBirth || "");
      useOnboardingStore.getState().setGender(data.gender || "");
      goNext();
      await router.push("/companion");
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden lg:flex-row">
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
              {Array.from(`Welcome, ${form.watch("name")}`).map(
                (char, index) => (
                  <motion.span
                    key={generateTypewriterKey(char, index, "profile")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: index * 0.05,
                    }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </motion.h2>
            <motion.p
              className="font-medium text-base text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              We use your preferred name, birthday, gender and goal so your AI
              companion can address you naturally and personalize your
              experience.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col bg-brand-background lg:w-1/2">
        <div className="h-32 bg-gradient-to-b from-brand-accent via-brand-primary to-brand-primary p-4 lg:hidden">
          <motion.h2 className="text-center text-2xl text-white">
            {Array.from(`Welcome, ${form.watch("name")}`).map((char, index) => (
              <motion.span
                key={generateTypewriterKey(char, index, "profile")}
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
            className="mt-2 text-center text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            We use your preferred name, birthday, gender and goal so your AI
            companion can address you naturally.
          </motion.p>
        </div>

        <div className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
          <div className="mb-8 px-4">
            <ProgressSteps />
          </div>

          <div className="mx-auto w-full max-w-[400px] space-y-6">
            <div className="mb-8 space-y-2">
              <h1 className="font-heading font-semibold text-2xl">
                Let's get to know you better!
              </h1>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-brand-muted text-sm">
                        What should we call you?
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="h-11 rounded-lg border-zinc-200 bg-white/60 shadow-sm transition-colors focus:bg-white/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-brand-muted text-sm">
                        Your date of birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="e.g., 1990-01-01"
                          className="h-11 rounded-lg border-zinc-200 bg-white/60 shadow-sm transition-colors focus:bg-white/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-brand-muted text-sm">
                        Your gender
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-lg border-zinc-200 bg-white/60 shadow-sm transition-colors focus:bg-white/80">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="nonbinary">Non-binary</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-brand-muted text-sm">
                        Your main goal with EmotiSync
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Talk with a friend, manage stress better..."
                          className="min-h-[64px] resize-none rounded-lg border-zinc-200 bg-white/60 shadow-sm transition-colors focus:bg-white/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <WelcomeButtons isLoading={isLoading} showBack={false} />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
