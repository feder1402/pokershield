import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useLocalStorage } from "@uidotdev/usehooks";
import useParticipant from "./useParticipant";

export default function usePokerRoom() {
  const params = useParams();
  const roomName = params.roomName;

  const vote = useMutation(api.participants.vote);

  const sessionId = useParticipant(roomName);
  console.log("usePokerRoom: roomName", roomName, "sessioniId", sessionId);

  const room = roomName ? useQuery(api.rooms.getRoom, { roomName }) : null;
  const voteEnabled = room?.voting;
  const isModerator = room?.moderator === sessionId;

  return {roomName, sessionId, isModerator, voteEnabled, vote};
}