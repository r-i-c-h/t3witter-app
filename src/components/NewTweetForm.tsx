import Button from "./Button";
import ProfileImage from "./ProfileImage";

export default function NewTweetForm() {

  const getFillerText = () => {
    const proomptsArr = [`What's Shakin' Bacon?`, `What's The Word?`, `What'cha Know, Joe?`, `What's Crack-A-Lackin'?`, `How Goes?`, `Que Pasa?`, `What's the Skinny?`, `What's the Jive, Clive?`, `Whatcha Thinkin'bout?`]
    return proomptsArr[Math.floor(Math.random() * proomptsArr.length)]?.concat(`...`)
  }

  return (
    <>
      <form action="" className="flex flex-col gap-2 border-b px-4 py-2">
        <div className="flex gap-4">
          <ProfileImage />
          <textarea className="flex-grow resize-none overflow-hidden border border-amber-200 focus-visible:outline-amber-900 p-4 rounded text-lg" name="new_tweet" id="new_tweet" placeholder={getFillerText()} />
        </div>
        {/* button styles are passed through className as a "className" prop on the <Button> component
          text-content is a "regular" {...prop} */}
        <Button className="self-end mr-2" >Post 🐣 Tw33t</Button>
      </form>
    </>
  );
}