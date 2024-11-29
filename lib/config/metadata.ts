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
  const titleTemplate = isHome ? title : `${title} — ${siteConfig.name}`

  return {
    title: {
      default: titleTemplate,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title: titleTemplate,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleTemplate,
      description,
    },
  }
}
