interface HeroSectionProps {
  children: React.ReactNode
}

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full mb-4">
          Planning Poker for Agile Teams
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
        Collaborative estimation
        <br />
        <span className="text-muted-foreground">made simple</span>
      </h1>

      <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
        Empower your agile team to estimate user stories collaboratively with seamless planning poker sessions. No
        sign-ups required.
      </p>

      {children}
    </div>
  )
}
