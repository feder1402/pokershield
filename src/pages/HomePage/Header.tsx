import { Shield } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">PokerShield</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </Link>
          <ThemeToggle />
        </nav>
        {/* Mobile theme toggle */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
