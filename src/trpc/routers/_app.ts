import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query((opts) => {
      // throw new TRPCError({ code: "BAD_REQUEST", message: "This is a test error" });
      // console.log(opts.ctx.clerkUserId);
      console.log(opts.ctx.user);
      return {
        greeting: `hello ${opts.input.text}`
      };
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;
