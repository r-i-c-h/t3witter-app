import Button from "./Button";
interface FollowButtonArgs {
  isFollowing: boolean;
  userId: string;
}

export default function FollowUserButton({ isFollowing, userId }: FollowButtonArgs) {


  return (
    <Button small className="font-normal text-xs ml-2">Follow User </Button>
  );
}