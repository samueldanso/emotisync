"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { avatarSchema, type AvatarFormValues } from "@/lib/validations/avatar";
import { showErrorToast } from "@/lib/utils/errors";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabaseClient } from "@/lib/supabase/client";
import { useWelcomeStore } from "@/lib/stores/welcome";
import { createCompleteProfile } from "@/actions/profiles";
import { ProgressSteps } from "./progress-steps";
import { WelcomeButtons } from "./welcome-buttons";
import { getAvatars } from "@/actions/avatars";
import type { Avatar } from "@/db/schemas";
import Image from "next/image";

export function AvatarSelection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const { goal, reset } = useWelcomeStore();

  async function loadAvatars() {
    try {
      const { data, error } = await getAvatars();
      if (error) {
        showErrorToast(error);
        return;
      }
      if (data) {
        setAvatars(data);
      }
    } catch (error) {
      showErrorToast(error);
    }
  }

  useEffect(() => {
    loadAvatars();
  }, []);

  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: "",
      companionName: "",
    },
  });

  async function onSubmit(data: AvatarFormValues) {
    setIsLoading(true);
    try {
      if (!goal) {
        throw new Error("Please complete the previous step first");
      }

      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (!user?.id || !user?.email) throw new Error("User not found");

      const { error } = await createCompleteProfile(user.id, {
        goal,
        companionName: data.companionName,
        companionAvatar: data.avatar,
        email: user.email,
      });

      if (error) {
        throw new Error(error);
      }

      reset();
      toast.success(`${data.companionName} is ready to be your AI companion!`);
      router.push("/app");
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Avatar grid */}
              <div className="grid grid-cols-3 gap-3 lg:gap-6">
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
                        "flex flex-col items-center space-y-2 rounded-lg p-2 transition-all lg:p-3",
                        form.watch("avatar") === avatar.id
                          ? "bg-transparent"
                          : "hover:bg-accent"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-full transition-all",
                          form.watch("avatar") === avatar.id
                            ? "ring-4 ring-brand-primary"
                            : ""
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
                            ? "font-medium text-brand-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {avatar.personality}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <FormField
                control={form.control}
                name="companionName"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">
                      Name your companion
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Give your companion a name"
                        className="h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <WelcomeButtons
                isLoading={isLoading}
                showBack={true}
                onBack={() => {
                  useWelcomeStore.getState().goBack();
                  router.push("/welcome/profile");
                }}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
