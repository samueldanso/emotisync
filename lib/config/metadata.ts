import type { Metadata } from "next"
import { siteConfig } from "./site"

interface MetadataProps {
  title?: string
  description?: string
  path?: string
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
}: MetadataProps = {}): Metadata {
  const url = `https://${siteConfig.domain}${path}`
  const isHome = path === "/"

  return {
    metadataBase: new URL(`https://${siteConfig.domain}`),
    title: isHome
      ? siteConfig.title
      : {
          default: title,
          template: `%s — ${siteConfig.name}`,
        },
    description,
    openGraph: {
      title: isHome ? siteConfig.title : title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? siteConfig.title : title,
      description,
    },
  }
}
