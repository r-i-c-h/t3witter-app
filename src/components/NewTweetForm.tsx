import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import ExpandingTextArea from "./ExpandingTextArea";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";


export default function NewTweetForm() {
  const session = useSession();
  const [inputValue, setInputValue] = useState('');

  const createNewPost = api.tweet.create.useMutation({
    onSuccess: (newTwit) => {
      console.log(newTwit)
      setInputValue("");
    }
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content = inputValue;
    if (content.length > 1) {
      createNewPost.mutate({ content });
    }
  }

  //TODO: MAKE PRETTIER
  if (session.status !== "authenticated") return null;


  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
        <div className="flex gap-4">
          <ProfileImage imageSrc={session.data?.user.image} />
          <ExpandingTextArea inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        {/* button styles are passed through className as a "className" prop on the <Button> component
          text-content is a "regular" {...prop} */}
        <Button className="self-end" >Post 🐣 Tw33t</Button>
      </form>
    </>
  );
}