export const siteConfig = {
  name: "EmotiSync",
  title: "EmotiSync — Your AI voice companion for wellbeing",
  description:
    "Speak freely with your AI companion that turns daily conversations into personalized reflections and mood-boosting recommendations, helping you feel better and connect emotionally.",
  domain: "emotisync.xyz",
  ogImage: "/opengraph-image.png",
  links: {
    twitter: "https://twitter.com/emotisync_xyz",
    telegram: "https://t.me/emotisync_bot",
  },
} as const;

export type SiteConfig = typeof siteConfig;
