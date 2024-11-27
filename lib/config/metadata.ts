import type { Metadata } from "next";
import { siteConfig } from "./site";

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
}: MetadataProps = {}): Metadata {
  const url = `https://${siteConfig.domain}${path}`;

  return {
    title: {
      default: `${title} — Your AI voice companion for emotional well-being`,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
