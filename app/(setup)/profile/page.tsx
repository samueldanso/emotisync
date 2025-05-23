import { ProfileForm } from "@/components/profile-form"
import { constructMetadata } from "@/lib/config/metadata"

export const metadata = constructMetadata({
  title: "Complete Your Profile",
  path: "/profile",
})

export default function ProfilePage() {
  return <ProfileForm />
}
