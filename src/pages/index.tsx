import { useState } from "react";
import { type NextPage } from "next";
import { /* signIn, signOut, */ useSession } from "next-auth/react";
import NewTweetForm from "~/components/NewTweetForm";
import RecentTweets from "~/components/RecentTweets";
import FollowingTweets from "~/components/FollowingTweets";
import LoadingSpinner from "~/components/LoadingSpinner";

const TABS = ["Recent", "Following"] as const; // Doesn't work as pure Enum?

const Home: NextPage = () => {
  const session = useSession();
  const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>("Recent");

  // TS wants a login function to have a void-wrapper as below:
  //>> const handleLogin = () => { void signIn(); }

  // For a fully-private non-Twitter experience protect feeds and implement Login+Logout here, not only in Sidebar
  //  if (session.status === "unauthenticated") {
  //  ...LOGIN WIDGET ala... return <h2>Please <button onClick={handleLogin}>Log In</button></h2>
  //  }

  if (session.status === "loading") { return <LoadingSpinner big={true} /> }

  let welcomeString;
  if (session.status === "authenticated") {
    const baseName = session.data?.user.name;
    welcomeString = baseName?.split(' ')[0];
  } else {
    welcomeString = "to T3witter"
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-gradient-to-b from-amber-200 to-amber-50 pt-2">
        <h1 className="lg:text-left text-center mb-2 px-4 py-1 text-2xl text-amber-900 font-bold">Welcome <span className="">{welcomeString}</span></h1>
        {session.status === "authenticated" && (<>
          <div className="flex">
            {TABS.map(tab => {
              return <button key={tab}
                onClick={() => setSelectedTab(tab)}
                className={
                  `flex-grow p-2 border-b-4 hover:bg-amber-400 focus-visible:bg-amber-400 hover:text-black focus-visible:text-black transition-colors duration-300 hover:border-amber-800

                  ${tab === selectedTab ?
                    `border-amber-500 text-amber-950 font-semibold`
                    : `border-amber-200 text-amber-900`}
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