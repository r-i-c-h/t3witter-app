import { type Prisma, type User/*, type Like */ } from "@prisma/client";
import { type inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  type createTRPCContext,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  infiniteProfileFeed: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional()
      })
    )
    .query(
      async ({ input: { limit = 10, userId, cursor }, ctx }) => {
        return await getInfiniteTweets({
          limit, ctx, cursor,
          whereClause: { userId }
        });
      }
    ),
  infiniteFeed: publicProcedure
    .input(
      z.object({
        onlyFollowed: z.boolean().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional()
      })
    )
    .query(
      async ({ input: { onlyFollowed = false, limit = 10, cursor }, ctx }) => {
        const currentUserId = ctx.session?.user.id;
        return await getInfiniteTweets({
          limit, ctx, cursor,
          whereClause: currentUserId == null || !onlyFollowed ? // Check for current User or the onlyFollowed arg...
            undefined : { user: { followers: { some: { id: currentUserId } } } }, // return obj{} or undefined
        });
      }
    ),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: {
          content,
          userId: ctx.session.user.id
        }
      })

      //** Trigger SSG Profile Revalidation\Rebuild **/
      void ctx.revalidateSSG?.(`/profiles/${ctx.session.user.id}`) // "void" = do not bother to [a]wait

      return tweet;
    }),
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { tweetId: id, userId: ctx.session.user.id }

      const existingLike = await ctx.prisma.like.findUnique({
        where: { userId_tweetId: data }
      })

      if (existingLike == null) {
        await ctx.prisma.like.create({ data })
        return { didAddLike: true }
      } else {
        await ctx.prisma.like.delete({ where: { userId_tweetId: data } })
        return { didAddLike: false }
      }
    })
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
interface InfiniteTweetGetter {
  whereClause?: Prisma.TweetWhereInput;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
  limit: number;
  cursor: { id: string, createdAt: Date } | undefined;
}

async function getInfiniteTweets({ whereClause, ctx, limit, cursor }: InfiniteTweetGetter) {
  const currentUserId = ctx.session?.user.id;

  const data = await ctx.prisma.tweet.findMany({
    take: limit + 1, // if there *is* a tweet beyond the limit, grab it to set up the nextCursor below
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: whereClause, //! Logic for the definition is above in the query() call
    select: {
      id: true,
      content: true,
      createdAt: true,
      _count: { select: { likes: true } },
      likes: currentUserId == null ? false : { where: { userId: currentUserId } },
      user: {
        select: {
          name: true,
          id: true,
          image: true
        }
      }
    }
  });

  /** Setup Next Cursor for data 'pagination' */
  let nextCursor: typeof cursor | undefined;
  if ((data) && (data.length > limit)) {
    const nextItem = data.pop();
    if (nextItem != null) { // @ts is unhappy with "!=="? Wants "!="" instead 🤷‍♂️
      nextCursor = { id: nextItem?.id, createdAt: nextItem?.createdAt }
    }
  }
  /** Change Tweet-Data formatting to make front-end implementation a bit nicer **/
  const tweets = data.map((tweet) => {
    const { id, content, createdAt, _count } = tweet;
    const countVal = _count as { likes: number } // Makes @ts happy
    const likeCount = countVal.likes;
    const likedByMe: boolean = tweet.likes?.length > 0;
    const user = tweet.user as User // Makes @ts happy
    return { id, content, createdAt, user, likeCount, likedByMe };
  })

  return { nextCursor, tweets };
}