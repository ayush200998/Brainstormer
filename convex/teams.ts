import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTeams = query({
    args: { createdBy: v.string() },
    handler: async (ctx, args) => {
        const teams = await ctx.db
            .query("teams")
            .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
            .collect();

        return teams;
  },
});

export const createTeam = mutation({
    args: {
        name: v.string(),
        createdBy: v.string() // Email of the creator
    },
    handler: async (ctx, args) => {
      const team = await ctx.db
        .insert("teams", {
            name: args.name,
            createdBy: args.createdBy,
        });

      return team;
    },
});