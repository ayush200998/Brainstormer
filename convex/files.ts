import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserFiles = query({
    args: {
        createdBy: v.string(),
        archive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const files = await ctx.db
            .query("files")
            .filter((q) => 
                q.and(
                    q.eq(q.field("createdBy"), args.createdBy),
                    q.eq(q.field("archive"), args.archive)
                )
            )
            .order('desc')
            .collect();

        return files;
  },
});

export const getFile = query({
    args: { _id: v.id('files') },
    handler: async (ctx, args) => {
        const file = await ctx.db.get(args._id);
        return file;
  },
});

export const getFileByFileName = query({
    args: { fileName: v.string() },
    handler: async (ctx, args) => {
        const files = await ctx.db
            .query("files")
            .filter((q) => q.eq(q.field("fileName"), args.fileName))
            .collect();
        return files;
    },
});

export const createNewFile = mutation({
    args: {
        fileName: v.string(),
        createdBy: v.string(), // Email of the creator
        teamId: v.string(), // Team ID
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
    },
    handler: async (ctx, args) => {
      const fileId = await ctx.db
        .insert("files", {
            fileName: args.fileName,
            createdBy: args.createdBy,
            teamId: args.teamId,
            archive: args.archive,
            document: args.document,
            whiteboard: args.whiteboard,
        });

      const file = await ctx.db.get(fileId);
      return file;
    },
});

export const updateFileName = mutation({
    args: {
        _id: v.id('files'),
        fileName: v.string(),
    },
    handler: async (ctx, args) => {
        const { _id, fileName } = args;
        await ctx.db.patch(_id, {
            fileName,
        });

        const updatedFile = await ctx.db.get(_id);
        return updatedFile;
    },
});

export const archiveFile = mutation({
    args: {
        _id: v.id('files'),
    },
    handler: async (ctx, args) => { 
        const { _id } = args;
        await ctx.db.patch(_id, {
            archive: true,
        });

        const updatedFile = await ctx.db.get(_id);
        return updatedFile;
    },
});

export const unarchiveFile = mutation({
    args: {
        _id: v.id('files'),
    },
    handler: async (ctx, args) => { 
        const { _id } = args;
        await ctx.db.patch(_id, {
            archive: false,
        });

        const updatedFile = await ctx.db.get(_id);
        return updatedFile;
    },
});

export const updateFileDocument = mutation({
    args: {
        _id: v.id('files'),
        document: v.string(),
    },
    handler: async (ctx, args) => {
      const { _id } = args;
      await ctx.db.patch(_id, {
          document: args.document,
      });

      const updatedFile = await ctx.db.get(_id);
      return updatedFile;
    },
});

export const updateFileCanvas = mutation({
    args: {
        _id: v.id('files'),
        whiteboard: v.string(),
    },
    handler: async (ctx, args) => {
      const { _id } = args;
      await ctx.db.patch(_id, {
          whiteboard: args.whiteboard,
      });

      const updatedFile = await ctx.db.get(_id);
      return updatedFile;
    },
});