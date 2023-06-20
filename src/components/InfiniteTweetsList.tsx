import InfiniteScroll from "react-infinite-scroll-component";
import TweetCard from "./TweetCard";
import LoadingSpinner from "./LoadingSpinner";
export interface Tweet {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null; };
}

interface InfiniteTweetListProps {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
  onlyFollowedUsers?: boolean;

}

export default function InfiniteTweetList({ tweets, isLoading, isError, hasMore = false, fetchNewTweets }: InfiniteTweetListProps) {
  if (isLoading) { return <LoadingSpinner big={true} /> }

  if (isError) { //TODO: ERROR WIDGET
    return <h2>ERROR on Inf Tweet List</h2>
  }
  if (tweets == null || tweets?.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-grey-500">No [more] Tweets</h2>
    )
  }

  return (<ul>
    <InfiniteScroll
      dataLength={tweets.length}
      next={fetchNewTweets}
      hasMore={hasMore}
      loader={<LoadingSpinner />}
    >
      {
        tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />
        })
      }
    </InfiniteScroll>
  </ul>)
}