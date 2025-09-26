import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("participants").collect();
  },
});

export const createParticipant = mutation({
    args: { name: v.string(), room_id: v.id("rooms") },
    handler: async (ctx, args) => {
      const participantId = await ctx.db.insert("participants", { name: args.name, roomId: args.room_id });
      return participantId;
    },
  });