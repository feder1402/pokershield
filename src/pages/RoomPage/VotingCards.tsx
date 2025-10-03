import { PokerCard } from "@/components/PokerCard"
import { getScaleValues } from "@/lib/estimation-scales"

interface VotingCardsProps {
  isVotingEnabled: boolean
  onVote: (vote: string) => void
  selectedValue: string
}

export function VotingCards({ isVotingEnabled, onVote, selectedValue }: VotingCardsProps) {
  const currentScale = getScaleValues("fibonacci")

  return (
    <div className="mb-8">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-13 gap-8 max-w-4xl mx-auto">
        {currentScale.map((value) => (
          <PokerCard key={value} value={value} selected={value == selectedValue} onClick={() => onVote(value)} disabled={!isVotingEnabled} size="sm"/>
        ))}
      </div>
    </div>
  )
}
