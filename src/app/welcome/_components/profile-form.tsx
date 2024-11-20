"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Trophy, User } from "lucide-react";
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
} from "@/lib/validations/profile";
import { showErrorToast } from "@/lib/utils/errors";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabaseClient } from "@/lib/supabase/client";
import { useWelcomeStore } from "@/lib/stores/welcome";
import { ProgressSteps } from "./progress-steps";
import { WelcomeButtons } from "./welcome-buttons";

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setGoal, goNext } = useWelcomeStore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      const firstName = user?.user_metadata?.full_name
        ? user.user_metadata.full_name.split(" ")[0]
        : user?.email?.split("@")[0] || "";

      return {
        name: firstName,
        goal: "",
      };
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      setGoal(data.goal);
      goNext();
      router.push("/welcome/avatar");
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
          <span className="font-heading font-semibold text-xl">EmotiSync</span>
        </div>

        <div className="space-y-2 lg:space-y-3">
          <h2 className="text-brand-primary text-xl">
            Welcome to EmotiSync, {form.watch("name")}
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed">
            To get started with better emotional well-being, complete your
            account setup in a few easy steps.
          </p>
        </div>

        <div className="mt-8 lg:mt-12">
          <ProgressSteps />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 lg:min-h-screen lg:px-24 xl:px-32">
        <div className="mx-auto max-w-[480px] pt-8 lg:pt-16">
          <div className="mb-6 text-center">
            <h1 className="mb-1 font-heading font-semibold text-2xl">
              Let's get to know you better!
            </h1>
            <p className="text-brand-muted">
              Fill in a few details to personalize your experience.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Your name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Your main goal with EmotiSync
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Talk to a friendly companion, Keep a daily journal, Find better ways to manage stress..."
                        className="min-h-[100px] resize-none focus-visible:ring-brand-primary"
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
  );
}
