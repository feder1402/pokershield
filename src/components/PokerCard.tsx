"use client"

import { cn } from "@/lib/utils"

export interface PokerCardProps {
  value: string | number
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PokerCard({
  value,
  selected = false,
  disabled = false,
  onClick,
  className,
  size = "md",
}: PokerCardProps) {
  const sizeClasses = {
    sm: "w-16 h-24",
    md: "w-24 h-36",
    lg: "w-32 h-48",
  }

  const textSizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative rounded-xl transition-all duration-200",
        "flex items-center justify-center",
        "font-bold",
        sizeClasses[size],
        // Default state
        "bg-card text-card-foreground",
        "border-2 border-border",
        "shadow-md",
        // Hover state
        !disabled && !selected && "hover:border-primary hover:shadow-lg hover:-translate-y-1 hover:bg-secondary/90",
        // Selected state
        selected && "bg-primary text-primary-foreground border-primary shadow-xl scale-105",
        // Disabled state
        disabled && "opacity-50 cursor-arrow bg-card text-card-foreground",
        // Focus state
        !disabled &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:cursor-pointer",
        className,
      )}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      <span className={cn("select-none", textSizeClasses[size])}>{value}</span>

      {/* Corner decorations for poker card aesthetic */}
      {/* <span
        className={cn(
          "absolute top-2 left-2 text-xs font-semibold",
          selected ? "text-primary-foreground" : "text-muted-foreground",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "absolute bottom-2 right-2 text-xs font-semibold rotate-180",
          selected ? "text-primary-foreground" : "text-muted-foreground",
        )}
      >
        {value}
      </span> */}
    </button>
  )
}
