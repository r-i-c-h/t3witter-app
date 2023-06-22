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
    .input(z.object({ userId: z.string() })) // id of whom to follow
    .mutation(async ({ input: { userId }, ctx }) => {
      const currentUserId = ctx.session.user.id;

      const existingFollow = await ctx.prisma.user.findFirst({ // only get data if followed by currently auth'd
        where: {
          id: userId, // target acct
          followers: { some: { id: currentUserId } } // do I follow?
        }
      });

      let didAddAsNewFollower;

      if (existingFollow == null) {
        await ctx.prisma.user.update({
          where: { id: userId },
          data: {
            followers: {
              connect: { id: currentUserId } // ADD
            },
          }
        })
        didAddAsNewFollower = true;
      } else {
        await ctx.prisma.user.update({
          where: { id: userId },
          data: {
            followers: {
              disconnect: { id: currentUserId } // REMOVE
            },
          }
        })
        didAddAsNewFollower = false;
      }

      // Revalidation - Profiles are SSG, without revalidation they will have a bad Followers qty
      return { didAddAsNewFollower }
    })
});
