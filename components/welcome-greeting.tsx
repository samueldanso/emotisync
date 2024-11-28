"use client"

interface WelcomeGreetingProps {
  avatar: string
  companionName: string
  displayName: string
}

export function WelcomeGreeting({
  avatar,
  companionName,
  displayName,
}: WelcomeGreetingProps) {
  function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="flex flex-col items-center gap-16">
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-brand-primary/20">
        <img
          src={avatar}
          alt={companionName}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-6 text-center">
        <h1 className="font-semibold text-2xl md:text-3xl">
          {getGreeting()}, {displayName}
        </h1>
        <p className="font-medium text-lg text-muted-foreground">
          I'm {companionName}, How are you feeling today? Let’s talk.
        </p>
      </div>
    </div>
  )
}
