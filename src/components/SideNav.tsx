import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import HoverEffectWidget from "./HoverEffectWidget";
import { HomeIcon, ProfileIcon, LoginIcon, LogoutIcon } from "./IconsLib";

export default function SideNav() {
  const session = useSession();
  const user = session.data?.user;

  const handleLogout = () => { // <~~ Make TS Happy with void wrapper
    void signOut();
  }

  const handleLogin = () => { // <~~ Make TS Happy with void wrapper
    void signIn();
  }

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <HoverEffectWidget>
              <span className="flex items-center gap-2" title="Home">
                <HomeIcon />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </HoverEffectWidget>
          </Link>
        </li>
        {user != null ? ( // User IS Logged IN
          <li>
            <Link href={`/profiles/${user.id}`}>
              <HoverEffectWidget>
                <span className="flex items-center gap-2" title="Profile">
                  <ProfileIcon />
                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </HoverEffectWidget>
            </Link>
          </li>
        ) : null
        }
        {user != null ? ( // User IS Logged IN
          <li>
            <HoverEffectWidget red>
              <button onClick={handleLogout} className="group" title="Logout">
                <span className="flex items-center gap-2 group">
                  <LogoutIcon className="group-hover:stroke-red-800" />
                  <span className="hidden text-lg group-hover:text-red-800 md:inline">Logout</span>
                </span>
              </button>
            </HoverEffectWidget>
          </li>
        ) : (
          <li>
            <HoverEffectWidget>
              <button onClick={handleLogin}>
                <span className="flex items-center gap-2" title="Login">
                  <LoginIcon />
                  <span className="hidden text-lg md:inline">Login</span>
                </span>
              </button>
            </HoverEffectWidget>
          </li>
        )
        }
      </ul>
    </nav>
  );
}