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
            "bg-gradient-to-br from-primary/90 to-primary border-primary",
            "overflow-hidden",
          )}
          style={{
            transform: "rotateY(180deg)",
          }}
        >
          {/* Poker card back design */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Decorative border pattern */}
            <div className="absolute inset-2 border-2 border-primary-foreground/20 rounded-lg" />
            <div className="absolute inset-3 border border-primary-foreground/10 rounded-md" />

            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary-foreground/30 rounded-tl" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary-foreground/30 rounded-tr" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary-foreground/30 rounded-bl" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary-foreground/30 rounded-br" />

            {/* Center shield icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-1/2 h-1/2 text-primary-foreground/80 drop-shadow-lg"
              fill="currentColor"
            >
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v5.66c0 4.11-2.71 7.93-6 8.86-3.29-.93-6-4.75-6-8.86V6.43l6-2.25z" />
              <text
                x="12"
                y="14"
                textAnchor="middle"
                className="text-[8px] font-bold"
                fill="currentColor"
              >
                PS
              </text>
            </svg>

            {/* Background pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="card-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="currentColor" className="text-primary-foreground" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#card-pattern)" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  )
}
