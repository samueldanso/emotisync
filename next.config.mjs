import { fileURLToPath } from "node:url"
import createJiti from "jiti"

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti("./env")

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    // Disable SSR for mini-app routes
    appDir: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
}

export default nextConfig
