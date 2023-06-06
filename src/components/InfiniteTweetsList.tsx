import InfiniteScroll from "react-infinite-scroll-component";

interface Tweet {
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
}

export default function InfiniteTweetList({ isLoading, isError, hasMore, fetchNewTweets, tweets }: InfiniteTweetListProps) {
  if (isLoading) { //TODO: LOADING WIDGET
    return <h2>Loading..</h2>
  }
  if (isError) { //TODO: ERROR WIDGET
    return <h2>ERROR</h2>
  }
  if (tweets == null || tweets?.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-grey-500">No [more] Tweets</h2>
    )
  }

  return <ul>
    <InfiniteScroll
      dataLength={tweets.length}
      next={fetchNewTweets}
      hasMore={hasMore}
      loading={`Loading...`} // TODO: LOADING WIDGET
    >
      {
        tweets.map((tweet) => {
          return (<div key={tweet.id}>{tweet.content}</div>)
        })
      }
    </InfiniteScroll>
  </ul>
}