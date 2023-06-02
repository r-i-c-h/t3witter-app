import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

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
      {/* ^^ - ? self-start ? */}
      <h2>NAV</h2>
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user != null ? ( // User IS Logged IN
          <li>
            <Link href={`/profiles/${user.id}`}>Profile</Link>
          </li>
        ) : null
        }
        {user != null ? ( // User IS Logged IN
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        ) : (
          <li>
            <button onClick={handleLogin}>Log In</button>
          </li>
        )
        }
      </ul>
    </nav>
  );
}