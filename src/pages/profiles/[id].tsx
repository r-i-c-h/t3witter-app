//!!! Profiles use Static Site Generation
import type { NextPage, GetStaticPropsContext, GetStaticPaths, InferGetStaticPropsType } from "next";
import Head from "next/head";
import ssgHelper from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from 'next/error';
import Link from "next/link";
import { LeftArrow } from "~/components/IconsLib";
import HoverEffectWidget from "~/components/HoverEffectWidget";
import ProfileImage from "~/components/ProfileImage";
import getPluralString from "~/utils/getPluralString";
import InfiniteTweetList from "~/components/InfiniteTweetsList";
import FollowUserButton from "~/components/FollowUserButton";

// NextPage needs an arrow func 🤷‍♂️
// Props are defined by the getStaticProps() function below.
export const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id }) => {
  const { data: profile } = api.profile.getById.useQuery({ id }) // data *should* be in cache because of `prefetch()` below

  if (!profile || !profile.name) { // should be impossible
    return <ErrorPage statusCode={404} />
  }
  const { tweetsCount, followersCount, followsCount, isFollowing } = profile;
  const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
    { userId: id },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  )

  return (<>
    <Head>
      <title>{`T3witter User: ${profile.name}`}</title>
    </Head>
    <header className="sticky top-0 z-10 flex items-center border-b  bg-white px-4 py-4">
      <Link href=".." className="mr-2" title="Go Back">
        <HoverEffectWidget>
          <LeftArrow className="fill-current stroke-current" />
        </HoverEffectWidget>
      </Link>
      <ProfileImage imageSrc={profile.image} className="flex-shrink-0 h-16 w-16" />
      <div className="ml-2 flex-grow">
        <h1 className="pl-2 text-left text-xl font-bold">{profile.name}</h1>
        <div className="text-gray-500">
          <span className="pl-2">{tweetsCount}&nbsp;{getPluralString(tweetsCount, "Tweet", "Tweets")}</span>
          <span className="pl-1">|&nbsp;{followersCount}&nbsp;{getPluralString(followersCount, "Follower", "Followers")}</span>
          <span className="pl-1">|&nbsp;{followsCount}&nbsp;Following</span>
        </div>
      </div>
      <FollowUserButton isFollowing={isFollowing} userId={id} onClick={() => null} />
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