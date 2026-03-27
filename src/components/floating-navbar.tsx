"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { CommandMenu } from "@/components/command-menu"
import { cn } from "@/lib/utils"

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.388-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.493.998.108-.776.418-1.305.762-1.605-2.666-.304-5.467-1.333-5.467-5.93 0-1.312.469-2.382 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.009-.323 3.301 1.23A11.52 11.52 0 0 1 12 5.8c1.02.005 2.047.139 3.006.404 2.291-1.553 3.298-1.23 3.298-1.23.652 1.653.241 2.874.117 3.176.769.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.431.371.824 1.103.824 2.222v3.293c0 .319.192.688.802.576C20.566 21.795 24 17.298 24 12 24 5.372 18.627 0 12 0Z" />
    </svg>
  )
}

export function FloatingNavbar() {
    const pathname = usePathname()
    const isDocs = pathname?.startsWith("/docs")

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[600px] px-4 pointer-events-none">
            <nav className="pointer-events-auto flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/60 bg-white/80 p-2 pl-4 shadow-lg shadow-zinc-200/20 backdrop-blur-md dark:border-zinc-800/60 dark:bg-[#121212]/80 dark:shadow-black/20 transition-all duration-300">

                {/* Logo & Brand */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ComponentryLogomark className="size-6 text-zinc-900 dark:text-white transition-opacity group-hover:opacity-80" />
                        <span className="text-sm font-bold tracking-wide text-zinc-900 dark:text-white">COMPONENTRY</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 text-[13px] font-medium">
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1 mr-1">
                        <Link
                            href="/pricing"
                            className="hidden px-3 py-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/docs"
                            className={cn(
                                "px-3 py-1.5 transition-colors",
                                isDocs
                                    ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            )}
                        >
                            Docs
                        </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Search / Command */}
                        <CommandMenu trigger={
                            <div className="flex size-9 items-center justify-center rounded-[12px] bg-zinc-100/80 dark:bg-zinc-800/50 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
                                <button type="button" className="flex size-full items-center justify-center">
                                    <Search className="size-4 text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100 transition-colors" />
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        } />

                        {/* GitHub */}
                        <Link
                            href="https://github.com/harshjdhv/componentry"
                            target="_blank"
                            className="flex size-9 items-center justify-center rounded-[12px] bg-zinc-100/80 dark:bg-zinc-800/50 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors group"
                        >
                            <GitHubIcon className="size-4 text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100 transition-colors" />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
