import LoadingSpinner from "./LoadingSpinner";

export default function TweetFeedLoader() {
  return (<div>
    <LoadingSpinner big={true} />
    <LoadingSkeletonTweetCard />
    <LoadingSkeletonTweetCard />
    <LoadingSkeletonTweetCard />
  </div>
  );
}

function LoadingSkeletonTweetCard() {
  return (
    <div className="flex animate-pulse border-b px-4 py-4">
      <div className="ml-4">
        <div data-placeholder className="w-16 h-16 block bg-gray-200 rounded-full dark:bg-gray-700"> </div>
      </div>

      <div className="ml-4 w-full">
        <div className="flex items-center">
          <div data-placeholder className="inline-block h-5 bg-gray-200 rounded-md dark:bg-gray-700 w-2/5"></div>
          <div data-placeholder className="ml-2 inline-block h-3 bg-gray-200 rounded-md dark:bg-gray-700 w-1/5"></div>
        </div>
        <ul className="mt-2 space-y-2">
          <li data-placeholder className="w-5/6 h-5 bg-gray-200 rounded-md dark:bg-gray-700"> </li>
          <li data-placeholder className="w-1/6 h-5 bg-gray-200 rounded-md dark:bg-gray-700"> </li>
        </ul>
      </div>
    </div>
  )
}