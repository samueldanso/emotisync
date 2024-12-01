import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/emotisync-icon.svg"
        alt="EmotiSync Logo"
        width={32}
        height={32}
        className={className}
      />
      {showText && (
        <span className="font-heading text-lg font-semibold text-brand-foreground">
          EmotiSync
        </span>
      )}
    </Link>
  );
}
