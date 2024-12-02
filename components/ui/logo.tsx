import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/emotisync-icon.svg"
        alt="EmotiSync Logo"
        width={32}
        height={32}
        className={className}
      />
      <span className="font-heading font-semibold text-brand-foreground text-xl">
        EmotiSync
      </span>
    </Link>
  )
}
