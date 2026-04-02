"use client"

import { cn } from "@/lib/utils"

export interface MyNewTestComponentProps {
  className?: string
}

export function MyNewTestComponent({ className }: MyNewTestComponentProps) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <div className="rounded-xl border border-border/50 bg-background px-4 py-3 text-sm text-muted-foreground">
        My New Test Component (preview)
      </div>
    </div>
  )
}