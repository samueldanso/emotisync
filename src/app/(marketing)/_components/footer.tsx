import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { FOOTER_MENU } from "@/lib/constants/menus"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="container mx-auto max-w-[1250px] px-4 pt-12 md:pt-16 lg:pt-32">
      <footer className="border-t px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Logo className="h-7 w-7 md:h-8 md:w-8" />
            <p className="mt-4 max-w-[300px] text-brand-muted">
              Turn your voice into emotional clarity.
            </p>
            <p className="mt-2 text-brand-muted text-sm">
              &copy; {currentYear} EmotiSync. All rights reserved.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex md:gap-12">
            {Object.entries(FOOTER_MENU).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-heading font-semibold text-brand-foreground">
                  {title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-brand-muted transition-colors hover:text-brand-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </footer>

      <span className="mx-auto block max-w-[1200px] bg-gradient-to-b from-brand-muted/20 to-brand-muted/5 bg-clip-text text-center font-bold font-heading text-[80px] text-transparent leading-none tracking-tight md:text-[120px] lg:text-[230px]">
        EmotiSync
      </span>
    </div>
  )
}
