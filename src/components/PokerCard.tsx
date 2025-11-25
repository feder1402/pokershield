"use client"

import { cn } from "@/lib/utils"
import { ReactNode, useEffect, useRef } from "react"

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
  faceUp = true,
  onClick,
  className,
  size = "md",
}: PokerCardProps) {
  const isFirstMount = useRef(true)

  useEffect(() => {
    isFirstMount.current = false
  }, [])

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

  const baseCardClasses = cn(
    "absolute inset-0 rounded-xl",
    "flex items-center justify-center",
    "font-bold",
    "border-2",
    "shadow-md",
    "[backface-visibility:hidden]",
  )

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative group",
        sizeClasses[size],
        // Hover lift effect
        !disabled && !selected && "hover:-translate-y-2 transition-transform duration-200",
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",
        // Focus state
        !disabled &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
        className,
      )}
      style={{
        perspective: "1000px",
      }}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      <div
        className={cn(
          "relative w-full h-full",
          // Flip animation - only apply transition-transform after first mount
          !isFirstMount.current && "transition-transform duration-[600ms]",
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: faceUp ? "rotateY(0deg)" : "rotateY(180deg)",
        }}
      >
        {/* Front face */}
        <div
          className={cn(
            baseCardClasses,
            "bg-card text-card-foreground border-border",
            // Hover state
            !disabled && !selected && "group-hover:border-primary group-hover:shadow-lg group-hover:bg-secondary/90",
            // Selected state
            selected && "bg-primary text-primary-foreground border-primary shadow-xl scale-105",
          )}
        >
          <span className={cn("select-none", textSizeClasses[size])}>{value}</span>
        </div>

        {/* Back face */}
        <div
          className={cn(
            baseCardClasses,
            "bg-card border-dotted border-primary",
          )}
          style={{
            transform: "rotateY(180deg)",
          }}
        >
          {/* Empty back face - could add a pattern or logo here */}
        </div>
      </div>
    </button>
  )
}
