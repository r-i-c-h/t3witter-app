import { useState } from "react";
import { type NextPage } from "next";
import { /* signIn, signOut, */ useSession } from "next-auth/react";
// import InfiniteTweetsList from "~/components/InfiniteTweetsList";
import NewTweetForm from "~/components/NewTweetForm";
import RecentTweets from "~/components/RecentTweets";
import FollowingTweets from "~/components/FollowingTweets";
import LoadingSpinner from "~/components/LoadingSpinner";

const TABS = ["Recent", "Following"] as const; // ?? Why Does this even work?🤣

const Home: NextPage = () => {
  const session = useSession();
  const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>("Recent");

  //! PROTECT FEEDS \ Implement Login+Logout here or only in Sidebar?!?
  // const handleLogin = () => { // <~~ Make TS Happy with void wrapper
  // void signIn();
  // }
  //  if (session.status === "unauthenticated") {
  //    //TODO: LOGIN FRONT WIDGET [maybe - would kill the "public" feed
  //    return <h2>Please <button onClick={handleLogin}>Log In</button></h2>
  //  }

  if (session.status === "loading") { return <LoadingSpinner big={true} /> }

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-slate-50 pt-2">
        <h1 className="mb-2 px-4 py-1 text-2xl font-bold">Welcome</h1>
        {session.status === "authenticated" && (<>
          <div className="flex">
            {TABS.map(tab => {
              return <button key={tab}
                onClick={() => setSelectedTab(tab)}
                className={
                  `flex-grow p-2 hover:bg-slate-200 focus-visible:bg-slate-200
                  ${tab === selectedTab ? `bg-amber-50 border-2 border-b-4 border-b-amber-300 text-amber-800 font-semibold`
                    : `text-gray-500`}
                  `
                }>
                {tab}
              </button>
            })}
          </div>
        </>
        )}
      </header >
      <NewTweetForm />
      {selectedTab === "Recent" ? <RecentTweets /> : null}
      {selectedTab === "Following" ? <FollowingTweets /> : null}
    </>
  );
};

export default Home;