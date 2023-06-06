import { type NextPage } from "next";
import { /* signIn, signOut, */ useSession } from "next-auth/react";
import RecentTweets from "~/components/RecentTweets";
import NewTweetForm from "~/components/NewTweetForm";


const Home: NextPage = () => {
  const session = useSession();
  //! PROTECT FEEDS \ Implement Login+Logout here or only in Sidebar?!?
  // const handleLogin = () => { // <~~ Make TS Happy with void wrapper
  // void signIn();
  // }
  //  if (session.status === "unauthenticated") {
  //    //TODO: LOGIN FRONT WIDGET [maybe - would kill a "public" feed]
  //    return <h2>Please <button onClick={handleLogin}>Log In</button></h2>
  //  }

  if (session.status === "loading") {
    //TODO: LOADING WIDGET
    return <h2>LOADING</h2>
  }

  // TODO: Method to switch to *only* show accounts the user is following instead of all recent tweets...
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-slate-50 pt-2">
        <h1 className="mb-2 px-4 py-1 text-2xl font-bold">Welcome</h1>
      </header>
      <NewTweetForm />
      <RecentTweets />
    </>
  );
};

export default Home;