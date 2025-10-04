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

export const enableVoting = query({
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
