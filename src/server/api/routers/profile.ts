import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({ id: z.string() })
    )
    .query(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session?.user.id

      // Check auth & if this profile has the logged in user's ID as a follower
      const followerArg = currentUserId ? { where: { id: currentUserId } } : undefined;

      const profile = await ctx.prisma.user.findUnique({
        where: { id },
        select: {
          name: true,
          image: true,
          followers: followerArg, // See above
          _count: { select: { followers: true, follows: true, tweets: true } },
        }
      })

      if (profile == null) { return null; }

      return {
        name: profile.name,
        image: profile.image,
        followersCount: profile._count.followers,
        followsCount: profile._count.follows,
        tweetsCount: profile._count.tweets,
        isFollowing: profile.followers.length > 0
      };
    }),
  toggleFollowing: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      //TODO...
      return null;
    })
});
