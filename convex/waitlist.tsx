import {v} from "convex/values";
import { query, mutation } from "./_generated/server";


// Query to check if email exists in the waitlist
export const checkEmailExists = query({
    args: {
      email: v.string(),
    },
    handler: async (ctx: any, args: any) => {
      const result = await ctx.db.select("waitlist", { where: { email: args.email } });
      return result.length > 0; 
    },
  });


export const addUserToWaitlist = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
    },
handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("waitlist", { text: args });
},
});



