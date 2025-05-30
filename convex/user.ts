import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const users = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        return users;
  },
});

export const createUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        image: v.string(),
    },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .insert("user", {
            name: args.name,
            email: args.email,
            image: args.image,
        });
  
      return user;
    },
});