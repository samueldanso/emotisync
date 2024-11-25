import type { Metadata } from "next";
import { config } from "@/lib/utils/config";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrlRelative?: string;
}

export function getSEOTags({
  title = config.appName,
  description = config.appDescription,
  canonicalUrlRelative = "/",
}: SEOProps): Metadata {
  const siteUrl = `https://${config.domainName}`;

  return {
    title: {
      default: `${title} — Your AI voice companion for emotional well-being`,
      template: `%s — ${config.appName}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: siteUrl + canonicalUrlRelative,
      siteName: config.appName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
