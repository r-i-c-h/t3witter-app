import { type NextPage } from "next";
import NewTweetForm from "~/components/NewTweetForm";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-slate-50 pt-2">
        <h1 className="mb-2 px-4 py-1 text-2xl font-bold">Home Base</h1>
      </header>
      <NewTweetForm />
    </>
  );
};

export default Home;