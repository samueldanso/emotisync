export const siteConfig = {
  name: "EmotiSync",
  title: "EmotiSync - Your AI voice companion for emotional well-being",
  description:
    "Skip writing, just talk naturally. Your AI companion transforms your daily voice conversations into personalized insights and recommendations, helping you find clarity and growth in minutes.",
  domain: "emotisync.xyz",
  ogImage: "/opengraph-image.png",
  links: {
    twitter: "https://twitter.com/emotisync_xyz",
    telegram: "https://t.me/emotisync_bot",
  },
} as const;

export type SiteConfig = typeof siteConfig;
