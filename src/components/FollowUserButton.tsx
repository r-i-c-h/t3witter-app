import { useSession } from "next-auth/react";
import Button from "./Button";

interface FollowButtonArgs {
  isFollowing: boolean;
  isLoading: boolean;
  userId: string;
  clickHandler: () => void;
}

export default function FollowUserButton({ isFollowing, isLoading, userId, clickHandler }: FollowButtonArgs) {
  const session = useSession()

  if (session.status !== "authenticated") { return null; }
  if (session.data.user.id === userId) {
    return null; // User can't follow themselves!
  }

  return (
    <Button small gray={isFollowing}
      disabled={isLoading}
      onClick={() => clickHandler()} className="font-semibold text-sm">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}