export function HowItWorks() {
  return (
    <div id="how-it-works" className="text-center">
      <h2 className="text-3xl font-bold mb-8">How it Works</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
            1
          </div>
          <div>
            <h3 className="font-semibold mb-2">Create or Join Room</h3>
            <p className="text-muted-foreground">
              The first person creates a room and becomes the moderator. Share the room ID with your team.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
            2
          </div>
          <div>
            <h3 className="font-semibold mb-2">Vote on Stories</h3>
            <p className="text-muted-foreground">
              Team members select estimation cards to vote on user story complexity.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
            3
          </div>
          <div>
            <h3 className="font-semibold mb-2">Reveal & Discuss</h3>
            <p className="text-muted-foreground">
              Moderator reveals votes simultaneously to avoid bias and facilitate discussion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
