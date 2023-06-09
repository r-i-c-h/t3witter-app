import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Head from "next/head";
import SideNav from "~/components/SideNav";
import "~/styles/globals.css";

import { Open_Sans } from "next/font/google"
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open_sans',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>T3witter Social</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A clone of a popular social newsfeed app that people post to." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={`container flex mx-auto items-start sm:pr-4 ${openSans.variable}`}>
        <SideNav />
        <div className="min-h-screen flex-grow max-w-screen-lg">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
