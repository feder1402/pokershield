import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

interface RoomNotFoundCardProps {
  roomId: string
}

export function RoomNotFoundCard({ roomId }: RoomNotFoundCardProps) {
  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Room Not Found</h1>
          <p className="text-muted-foreground mb-4">Room {roomId} doesn&apos;t exist or has been closed.</p>
          <Link to="/">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
