export const ONBOARDING_STEPS = [
  { id: 1, name: "Create Account", status: "In Progress" },
  { id: 2, name: "Companion", status: "Not started" },
] as const;

export const PERSONALITY_TYPES = {
  LISTENER: "The Listener",
  ANCHOR: "The Anchor",
  ENERGIZER: "The Energizer",
} as const;

export const PERSONALITY_MAPPING = {
  Supportive: PERSONALITY_TYPES.LISTENER,
  Calm: PERSONALITY_TYPES.ANCHOR,
  Joyful: PERSONALITY_TYPES.ENERGIZER,
} as const;

export const PERSONALITY_DESCRIPTIONS = {
  [PERSONALITY_TYPES.LISTENER]: "I'm here to listen and help you reflect.",
  [PERSONALITY_TYPES.ENERGIZER]: "Let's brighten your day together!",
  [PERSONALITY_TYPES.ANCHOR]: "I'll be your calm in the storm.",
} as const;

export const ONBOARDING_PLACEHOLDERS = {
  companionName: "What should we call your new friend?",
  goal: "e.g., Track my daily emotions, Find better ways to manage stress, Understand my mood patterns...",
  name: "John Doe",
} as const;

export const ONBOARDING_LABELS = {
  companionName: "Give your companion a name",
  goal: "Your main goal with EmotiSync",
  name: "Your name",
} as const;

export type PersonalityDescriptions = typeof PERSONALITY_DESCRIPTIONS;
