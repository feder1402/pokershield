import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Room } from "@/lib/room-store"

interface VotingResultsProps {
  room: Room
}

export function VotingResults({ room }: VotingResultsProps) {
  const getVoteCounts = () => {
    return room.participants
      .filter((p) => p.hasVoted && p.vote)
      .reduce(
        (acc, p) => {
          const vote = p.vote!
          acc[vote] = (acc[vote] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
  }

  if (!room.votesRevealed) {
    return null
  }

  return (
    <div className="mt-8 text-center">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Voting Results</h3>
          <div className="space-y-2">
            {Object.entries(getVoteCounts()).map(([vote, count]) => (
              <div key={vote} className="flex justify-between items-center">
                <span className="font-medium">{vote}</span>
                <Badge variant="secondary">
                  {count} vote{count !== 1 ? "s" : ""}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
