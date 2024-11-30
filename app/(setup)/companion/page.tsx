import { CompanionSelection } from "@/components/companion-form"
import { constructMetadata } from "@/lib/config/metadata"

export const metadata = constructMetadata({
  title: "Choose Your Companion",
  path: "/companion",
})

export default function CompanionPage() {
  return <CompanionSelection />
}
