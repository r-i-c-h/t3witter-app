import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import ExpandingTextArea from "./ExpandingTextArea";
import { useState } from "react";

export default function NewTweetForm() {
  const session = useSession();
  const [inputValue, setInputValue] = useState('');
  //!!
  //TODO:
  // if (session.status !== "authenticated") return null;

  return (
    <>
      <form action="" className="flex flex-col gap-2 border-b px-4 py-2">
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