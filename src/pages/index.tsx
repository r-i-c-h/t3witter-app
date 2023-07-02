import { useState } from "react";
import { type NextPage } from "next";
import { /* signIn, signOut, */ useSession } from "next-auth/react";
import NewTweetForm from "~/components/NewTweetForm";
import RecentTweets from "~/components/RecentTweets";
import FollowingTweets from "~/components/FollowingTweets";
import LoadingSpinner from "~/components/LoadingSpinner";
import WelcomeHeader from "~/components/WelcomeHeader";

const TABS = ["Recent", "Following"] as const; // Doesn't work as pure Enum?

const Home: NextPage = () => {
  const session = useSession();
  const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>("Recent"); // <~~Sets "Recent" as default for Unauth'd Public Feed

  /**
  ** NOTE: For a fully-private (non-Twitter) experience
  ** protect feeds and implement Login+Logout/signIn() here, not only in Sidebar
  ** Be aware, if you do so, TS wants login function to have a void-wrapper as below:
  ** >> const handleLogin = () => { void signIn(); }
  **/

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /**** LOADING STATE ****/
  if (session.status === "loading") { return <LoadingSpinner big={true} /> }
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  return (
    <>
      <header className="sticky top-0 z-10 bg-gradient-to-b from-amber-200 to-amber-50 pt-2 shadow-md">
        <WelcomeHeader />
        {session.status === "authenticated" && (<>
          <div className="flex">
            {TABS.map(tab => {
              return <button key={tab}
                onClick={() => setSelectedTab(tab)}
                className={
                  `text-lg flex-grow p-2 border-b-4 hover:bg-amber-400 focus-visible:bg-amber-400 hover:text-black focus-visible:text-black transition-colors duration-300 hover:border-amber-800
                  ${tab === selectedTab ? `border-amber-500 text-amber-950 font-semibold` : `border-amber-200 text-amber-900`}
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