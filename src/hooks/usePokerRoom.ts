import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useParticipant from "./useParticipant";

export default function usePokerRoom(roomName: string) {

  const participant = useParticipant(roomName);
  console.log("usePokerRoom: roomName", roomName, "participantId", participant?._id);

  const room = useQuery(api.rooms.getRoom, roomName != null ? { roomName } : "skip");
  const isModerator = room?.moderator === participant?._id;

  const isLoading = !room || !participant;

  return {room, ...room, participantId: participant?._id, ...(participant ?? {}), isModerator, isLoading};
}