//!!! Profiles use Static Site Generation
import type { NextPage, GetStaticPropsContext, GetStaticPaths, InferGetStaticPropsType } from "next";
import ssgHelper from "~/server/api/ssgHelper";
import Head from "next/head";
import ErrorPage from 'next/error';
import Link from "next/link";
import { api } from "~/utils/api";
import getPluralString from "~/utils/getPluralString";
import { LeftArrow } from "~/components/IconsLib";
import HoverEffectWidget from "~/components/HoverEffectWidget";
import ProfileImage from "~/components/ProfileImage";
import InfiniteTweetList from "~/components/InfiniteTweetsList";
import FollowUserButton from "~/components/FollowUserButton";

// NextPage needs an arrow func 🤷‍♂️
// Props are defined by the getStaticProps() function below.
export const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id }) => {
  const trpcUtils = api.useContext()

  const { data: profile } = api.profile.getById.useQuery({ id }) // data *should* be in cache because of `prefetch()` below
  if (!profile || !profile.name) { // should be impossible = no user found with this id
    return <ErrorPage statusCode={404} />
  }

  const { tweetsCount, followersCount, followsCount, isFollowing } = profile;
  const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
    { userId: id },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  )
  const toggleFollowing = api.profile.toggleFollowing.useMutation({
    onSuccess: ({ didAddAsNewFollower }) => {
      trpcUtils.profile.getById.setData({ id }, oldData => {
        if (oldData == null) { return }

        const countModifier = didAddAsNewFollower ? 1 : -1

        return {
          ...oldData,
          isFollowing: didAddAsNewFollower,
          followersCount: oldData.followersCount + countModifier
        }
      })
    }
  });

  return (<>
    <Head>
      <title>{`T3witter User: ${profile.name}`}</title>
    </Head>
    <header className="sticky top-0 z-10 flex items-center border-b bg-slate-50 px-4 py-4 shadow-md">
      <Link href=".." className="mr-2" title="Go Back">
        <HoverEffectWidget>
          <LeftArrow className="fill-current stroke-current" />
        </HoverEffectWidget>
      </Link>
      <ProfileImage imageSrc={profile.image} className="flex-shrink-0 h-16 w-16 motion-safe:animate-apparate" />
      <div className="ml-1 sm:ml-2">
        <h1 className="pl-2 text-left text-xl font-bold motion-safe:animate-apparate">{profile.name}</h1>
        <div className="text-gray-500 text-xs sm:text-sm md:text-base motion-safe:animate-apparate">
          <div className="inline-block pl-1">&bull;&nbsp;{tweetsCount}&nbsp;{getPluralString(tweetsCount, "Tweet", "Tweets")}</div>
          <div className="inline-block pl-1">&bull;&nbsp;{followersCount}&nbsp;{getPluralString(followersCount, "Follower", "Followers")}</div>
          <div className="inline-block pl-1">&bull;&nbsp;Following&nbsp;{followsCount}</div>
        </div>
      </div>
      <div className="flex-1 ml-1 sm:ml-2 flex justify-center lg:justify-start lg:ml-8 items-center">
        <FollowUserButton
          isFollowing={isFollowing}
          userId={id}
          isLoading={toggleFollowing.isLoading}
          clickHandler={() => toggleFollowing.mutate({ userId: id })}
        />
      </div>
    </header>
    <main>
      <InfiniteTweetList
        tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
        isError={tweets.isError}
        isLoading={tweets.isLoading}
        hasMore={Boolean(tweets.hasNextPage)}
        fetchNewTweets={tweets.fetchNextPage}
      />
    </main>
  </>)
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [], // 1. <~Basically the cache. 2. Do NOT generate page by default.
    fallback: "blocking" // wait until request, *then* generate a page and add to cache
  }
}

/**** GET DATA ****/
export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  const id = context.params?.id;

  // AuthCheck: If user is not auth'd redirect to `/`
  if (id == null || id == undefined) {
    return {
      redirect: { destination: "/" }
    }
  }

  // Cue STATIC GENERATION Process
  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id }); //** .prefetch() is necessary for ssg **//
  return {  // this return is props & sets Props definition for main ProfilePage:NextPage function
    props: {
      trpcState: ssg.dehydrate(),
      id
    }
  }
}

export default ProfilePage