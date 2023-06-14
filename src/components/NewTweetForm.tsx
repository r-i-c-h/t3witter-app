import { type FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import ExpandingTextArea from "./ExpandingTextArea";

export default function NewTweetForm() {
  const session = useSession();
  if (session.status !== "authenticated") return null;

  return <Form />;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState('');
  const trpcUtils = api.useContext();

  const createNewPost = api.tweet.create.useMutation({
    onSuccess: (newTwit, /*variables, context*/) => {
      console.log(newTwit)
      setInputValue("");

      if (session.status !== "authenticated") return; // <~~ clears @TS error for getting id below 👌🤷

      // @ts-expect-error - For some reason the mutation of the cachedData, by having the first tweet appended to the front, causes a recursive TS-Error
      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, (cachedData) => {
        if (!cachedData || cachedData == null || cachedData.pages[0] == null) {
          // per https://trpc.io/docs/client/react/useInfiniteQuery#setinfinitedata
          return {
            pages: [],
            pageParams: [],
          };
        }

        const newMsgData = {
          ...newTwit,
          likeCount: 0,
          likedByMe: false,
          user: {
            id: session.data.user.id,
            name: session.data.user.name || null,
            image: session.data.user.image || null,
          },
        };

        const pages = cachedData.pages.slice();
        const firstPage = pages[0];
        const laterPages = cachedData.pages.slice(1);
        const firstPageTweets = firstPage?.tweets.slice() ?? [];

        return {
          ...cachedData,
          pages: [{
            ...firstPage,
            tweets: [newMsgData, ...firstPageTweets]
          },
          ...laterPages
          ]
        }
      })
    }
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content = inputValue;
    if (content.length > 1) {
      createNewPost.mutate({ content });
    }
  }

  return (<>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        <ProfileImage imageSrc={session.data?.user.image} />
        <ExpandingTextArea inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      {/* button styles are passed through className as a "className" prop on the <Button> component
          text-content is a "regular" {...prop} */}
      <Button className="self-end">Post 🐣 Tw33t</Button>
    </form>
  </>
  );
}