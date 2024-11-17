import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/emotisync-icon.svg"
        alt="EmotiSync Logo"
        width={32}
        height={32}
        className={className}
      />
      <span className="font-heading font-semibold text-brand-foreground text-xl tracking-tight md:text-[22px]">
        EmotiSync
      </span>
    </Link>
  )
}
