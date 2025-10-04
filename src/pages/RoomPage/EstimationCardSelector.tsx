import { PokerCard } from "@/components/PokerCard"
import { getScaleValues, EstimationScaleId } from "@/lib/estimation-scales"

interface EstimationCardSelectorProps {
  enabled: boolean
  onVote: (vote: string) => void
  votedValue?: string
  scale?: EstimationScaleId
}

export function EstimationCardSelector({ enabled, onVote, votedValue, scale = "fibonacci" }: EstimationCardSelectorProps) {
  const currentScale = getScaleValues(scale)

  return (

      <div className="mb-16 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-13 gap-8 max-w-4xl mx-auto">
        {currentScale.map((value) => (
          <PokerCard key={value} value={value} selected={value == votedValue} onClick={() => onVote(value)} disabled={!enabled} size="sm"/>
        ))}
      </div>
  )
}
