import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("rooms", {
      roomName: args.roomName,
      isVotingEnabled: true,
      numberOfParticipants: 0,
      estimationScale: "fibonacci",
    });
    console.log(`Room "${args.roomName}" created with id ${roomId}`);
    return roomId;
  },
});

export const getRoom = query({
  args: { roomName: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.roomName != undefined) {
      const room = await ctx.db
        .query("rooms")
        .withIndex("by_room_name", (q) => q.eq("roomName", args.roomName!))
        .first();
      return room;
    }
    return undefined;
  },
});

export const isVotingEnabled = query({
  args: { roomName: v.string() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const room =
      await ctx.db
        .query("rooms")
        .withIndex("by_room_name", (q) => q.eq("roomName", args.roomName))
        .first();
    if (!room) {
      throw new Error(`Room "${args.roomName}" not found`);
    }
    return room.isVotingEnabled;
  },
});

export const getVotes = query({
  args: { roomName: v.string() },
  returns: v.array(v.object({ hasVoted: v.boolean(), vote: v.optional(v.string())})),
  handler: async (ctx, args) => {
    const room =
      await ctx.db
        .query("rooms")
        .withIndex("by_room_name", (q) => q.eq("roomName", args.roomName))
        .first();
    if (!room) {
      throw new Error(`Room "${args.roomName}" not found`);
    }

    const participants = await ctx.db
      .query("participants")
      .withIndex("by_room_id", (q) => q.eq("roomId", room._id))
      .collect();

    const votes = participants.filter((participant) => participant.isVotingParticipant).map((participant) => ({
      hasVoted: participant.vote !== undefined,
      vote: room.isVotingEnabled ? undefined : participant.vote, // Do not return vote while voting is enabled
    }));

    return votes;
  },
});

export const disableVoting = mutation({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db.query("rooms").withIndex("by_room_name", (q) => q.eq("roomName", args.roomName)).first();
    if (!room) {
      throw new Error(`Room "${args.roomName}" not found`);
    }
    ctx.db.patch(room._id, { isVotingEnabled: false });
    console.log(`Voting disabled for room "${args.roomName}"`);
  },
});

export const enableVoting = mutation({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db.query("rooms").withIndex("by_room_name", (q) => q.eq("roomName", args.roomName)).first();
    if (!room) {
      throw new Error(`Room "${args.roomName}" not found`);
    }
    ctx.db.patch(room._id, { isVotingEnabled: true });
    console.log(`Voting enabled for room "${args.roomName}"`);
  },
});
