import {v} from "convex/values";
import { query, mutation } from "./_generated/server";


export const getUser = query({
    args: { email:v.string() }, 

    handler: async (ctx: { db: { query: (arg0: string) => { (): any; new(): any; filter: { (arg0: (q: any) => any): { (): any; new(): any; collect: { (): any; new(): any; }; }; new(): any; }; }; }; }, args: { email: any; }) => {
        const user = await ctx.db
        .query('users')
        .filter((q) => q.eq(q.field('email'), args.email))
        .collect()

        return user;
    }
})


export const createUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        image: v.string()
    },
    handler: async (ctx: any, args: any) => {
      return await ctx.db.insert("users", { text: args });
    },
  });
