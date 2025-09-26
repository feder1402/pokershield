import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: { name  : v.string(), moderator_id: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const roomId = await ctx.db.insert("rooms", { name: args.name, moderator_id: args.moderator_id });
    return roomId;
  },
});

// export const joinRoom = mutation({
//   args: { room_id: v.id("rooms"), participant_id: v.string() },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("participants", { room_id: args.room_id, participant_id: args.participant_id });
//   },
// });