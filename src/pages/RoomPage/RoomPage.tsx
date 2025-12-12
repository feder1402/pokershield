import { RoomHeader } from "./RoomHeader";
import usePokerRoom from "@/hooks/usePokerRoom";
import { EstimationCardSelector } from "./EstimationCardSelector";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { VotingResults } from "./VotingResults";
import { ModeratorControls } from "./ModeratorControls";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function RoomPage() {
  const params = useParams();
  const roomName = params.roomName as string;
  const setVote = useMutation(api.participants.setVote);
  const updateStoryTitle = useMutation(api.rooms.updateStoryTitle);

  const {
    numberOfParticipants,
    isModerator,
    participantId,
    vote,
    isVotingEnabled,
    storyTitle,
  } = usePokerRoom(roomName);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState(storyTitle || "");

  useEffect(() => {
    setNewStoryTitle(storyTitle || "");
  }, [storyTitle]);

  const handleVote = (vote: string) => {
    participantId && setVote({ participantId, vote });
    console.log("Voted: ", vote);
  };

  const handleSaveTitle = async () => {
    if (!roomName) return;
    await updateStoryTitle({ roomName, storyTitle: newStoryTitle });
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setNewStoryTitle(storyTitle || "");
    setIsEditingTitle(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RoomHeader
        numberOfParticipants={numberOfParticipants || 0}
        roomName={roomName}
        isModerator={isModerator}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 flex-1 flex flex-col">
        {/* Story Title Section (moved from header) */}
        <div className="flex items-center justify-center gap-2 ml-4 border-l border-background/20 pl-4 pr-4 py-2 rounded-md bg-card/50 text-foreground">
          <span className="hidden sm:inline text-foreground">Story:</span>
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={newStoryTitle}
                onChange={(e) => setNewStoryTitle(e.target.value)}
                className="h-8 w-64 font-bold bg-background text-foreground"
                placeholder="Enter story title..."
                autoFocus
                onBlur={handleSaveTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveTitle();
                  if (e.key === "Escape") handleCancelEdit();
                }}
              />
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 ${
                isModerator ? "cursor-pointer hover:opacity-80" : ""
              }`}
              onClick={() => isModerator && setIsEditingTitle(true)}
            >
              <span className="text-lg font-bold text-foreground">
                {storyTitle || (isModerator ? "Click to add story title" : "")}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {roomName && (
            <VotingResults
              room={roomName}
              isVotingEnabled={isVotingEnabled ?? false}
            />
          )}

          <div className="mt-8">
            {isModerator && roomName && (
              <ModeratorControls
                room={roomName}
                isVotingEnabled={isVotingEnabled ?? false}
              />
            )}
          </div>
        </div>

        <EstimationCardSelector
          enabled={isVotingEnabled || false}
          votedValue={vote}
          onVote={handleVote}
        />
      </div>
    </div>
  );
}