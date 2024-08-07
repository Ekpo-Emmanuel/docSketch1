import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    trash: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.insert("files", args);

    return result;
  },
});

export const addUserToFile = mutation({
  args: {
    _id: v.id("files"),
    userId: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const result = await ctx.db
      .query("files")
      .filter((q: any) => q.eq(q.field("teamId"), args._id))
      .modify((q: any) => q.addUnique("users", args.userId))
      .collect();
    return result;
  }
})

export const getFiles = query({
  args: {},
  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.query("files").collect();

    return result;
  },
});

export const getFilesByTeamId = query({
  args: {
    teamId: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    const result = await ctx.db
      .query("files")
      .filter((q: any) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();

    return result;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },

  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.patch(args._id, {
      document: args.document,
    });
    return result;
  },
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    console.log("Updating whiteboard with ID:", args._id);
    const result = await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
    });
    return result;
  },
});

// export const deleteFilesByTeamId = mutation({
//   args: {
//     teamId: v.id("teams"),
//   },
//   handler: async (ctx: any, args: any) => {
//     try {
//       const files = await ctx.db.query("files").filter((q: any) => q.eq("teamId", args.teamId)).collect();

//       for (const file of files) {
//         await ctx.db.delete(file._id);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },
// })
export const deleteFilesById = mutation({
  args: {
    fileId: v.id("files"),
  },
  handler: async (ctx: any, args: any) => {
    try {
      await ctx.db.delete(args.fileId);
    } catch (error) {
      console.log(error);
    }
  },
});

export const renameFile = mutation({
  args: {
    _id: v.id("files"),
    name: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.patch(args._id, {
      name: args.name,
    });

    return result;
  },
})

export const archiveFile = mutation({
  args: {
    _id: v.id("files"),
    archive: v.boolean()
  },

  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.patch(args._id, {
      archive: true,
    });

    return result;
  },
})

export const unarchiveFile = mutation({
  args: {
    _id: v.id("files"),
    archive: v.boolean()
  },

  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.patch(args._id, {
      archive: false,
    });

    return result;
  },
})

export const trashProject = mutation({
  args: {
    _id: v.id("files"),
    trash: v.boolean()
  },

  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.patch(args._id, {
      trash: true,
    });

    return result;
  },
})

export const untrashProject = mutation({
  args: {
    _id: v.id("files"),
    trash: v.boolean()
  },

  handler: async (ctx: any, args: any) => {
    const result = await ctx.db.patch(args._id, {
      trash: false,
    });

    return result;
  },
})

export const deleteFilesByTeamId = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx: any, args: any) => {
    try {
      const files = await ctx.db
        .query("files")
        .filter((q: any) => q.eq("teamId", args.teamId))
        .collect();

      for (const file of files) {
        await ctx.db.delete(file._id);
      }
    } catch (error) {
      console.log(error);
    }
  },
});

export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});