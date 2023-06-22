import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "./root";
import SuperJSON from "superjson";
import { createInnerTRPCContext } from "./trpc"; // manually exported

/**** TRPC Helper to create static pages ****/
export default function ssgHelper() {
  return createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: createInnerTRPCContext({ session: null, revalidateSSG: null }) // No {session} since rendering is on server.
  })
}