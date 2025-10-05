import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createParticipant = mutation({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    // Validate that room already exists
    const room = await ctx.db
      .query("rooms")
      .withIndex("by_room_name", (q) => q.eq("roomName", args.roomName))
      .first();

    if (!room) {
      return { participantId: undefined, isModerator: false };
    }

    await ctx.db.patch(room._id, { numberOfParticipants: room.numberOfParticipants + 1 });

    const participantId = await ctx.db.insert("participants", { roomId: room._id, isVotingParticipant: true });
    
    // Set participant as moderator if there is no moderator in the room yet
    let isModerator = false;
    if (!room.moderator) {
      await ctx.db.patch(room._id, { moderator: participantId });
      isModerator = true;
    }

    console.log(`Participant created with id ${participantId}, moderator: ${isModerator}`);
    return { participantId, isModerator };
  },
});

export const getParticipant = query({
  args: { participantId: v.optional(v.id("participants")) },
  handler: async (ctx, args) => {
    if (!args.participantId) {
      return undefined;
    }
    return await ctx.db.get(args.participantId);
  },
});

export const setVote = mutation({
  args: { participantId: v.id("participants"), vote: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // Check that participant is enabled to vote
    const participant = await ctx.db.get(args.participantId);

    if (!participant) {
      throw new Error("Participant not found");
    }

    if (!participant.isVotingParticipant) {
      throw new Error("Participant is not a voting participant");
    }

    // Check that voting is enabled in the room
    const room = await ctx.db.get(participant.roomId);
    if (!room?.isVotingEnabled) {
      throw new Error("Voting is not enabled");
    }

    // Update participant's vote
    await ctx.db.patch(args.participantId, { vote: args.vote });
    console.log(`Participant ${args.participantId} vote changed to ${args.vote}`);

    // Disable voting in the room if all participants have voted
    const participants = await ctx.db.query("participants").withIndex("by_room_id", (q) => q.eq("roomId", participant.roomId)).collect();
    if (participants.filter((participant) => participant.isVotingParticipant).every((participant) => participant.vote !== undefined)) {
      await ctx.db.patch(room._id, { isVotingEnabled: false });
    }
  },
});

export const resetVotes = mutation({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    // Find room
    const room = await ctx.db.query("rooms").withIndex("by_room_name", (q) => q.eq("roomName", args.roomName)).first();
    if (!room) {
      throw new Error("Room not found");
    }
    // Reset votes for all participants in the room
    await ctx.db.query("participants").withIndex("by_room_id", (q) => q.eq("roomId", room._id)).collect().then((participants) => {
      participants.forEach((participant) => {
        ctx.db.patch(participant._id, { vote: undefined });
      });
    });
    // Enable voting in the room
    await ctx.db.patch(room._id, { isVotingEnabled: true });
    console.log(`Votes reset for room ${args.roomName}`);
  },
});

export const setVotingParticipant = mutation({
  args: { participantId: v.id("participants"), isVotingParticipant: v.boolean() },
  handler: async (ctx, args) => {
    ctx.db.patch(args.participantId, { isVotingParticipant: args.isVotingParticipant });
    console.log(`Participant ${args.participantId} voting participant changed to ${args.isVotingParticipant}`);
  },
});
