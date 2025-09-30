import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: { roomName: v.string() },
  returns: v.id("rooms"),
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("rooms", { name: args.roomName, voting: true });
    console.log(`Room "${args.roomName}" created with id ${roomId}`);
    return roomId;
  },
});

export const getRoom = query({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db.query("rooms").withIndex("by_name", q => q.eq("name", args.roomName)).first();
    if (!room) {
      throw new Error(`Room "${args.roomName}" not found`);
    }
    return room;
  },
});

export const voteEnabled = query({
  args: { roomName: v.string() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const room = await ctx.db.query("rooms").withIndex("by_name", q => q.eq("name", args.roomName)).first();
    if (!room) {
      throw new Error(`Room "${args.roomName}" not found`);
    }
    return room.voting;
  },
});