"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PokerCardProps {
  value: ReactNode
  selected?: boolean
  disabled?: boolean
  faceUp?: boolean
  onClick?: () => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PokerCard({
  value,
  selected = false,
  disabled = false,
  faceUp =true,
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
        !disabled && !selected && "hover:border-primary hover:shadow-lg hover:-translate-y-2 hover:bg-secondary/90",
        // Selected state
        selected && "bg-primary text-primary-foreground border-primary shadow-xl scale-105",
        // Disabled state
        disabled && "opacity-50 cursor-arrow",
        // Focus state
        !disabled &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:cursor-pointer",
        !faceUp && "border-dotted border-primary opacity-20",
        className,
      )}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      <span className={cn("select-none", textSizeClasses[size])}>{value}</span>
    </button>
  )
}
