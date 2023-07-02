# _T3witter_ (Clone of a popular message website)

**Production Deployment: https://t3witter-app.vercel.app/**

## Base Features:

- A Public message feed visible to unautenticated users, including display of "likes" per-message
- User Account creation via Discord or GitHub paths with standard Login/Logout functionality
- Mobile Responsive Design
- Separate Development and Deployed Production environments
- Users can add messages to system/public feed
- Users can add "Likes" per message w/updates to quantities
- Ability for Users to "follow" accounts and view a filtered message feed _only_ from the accounts they follow
- Users have an individual "Profile" page which displays _only their own_ messages
- User "Profile" pages display their system-wide statistics for followers/number of messages/and number of followed accounts
- Custom Animations and UI\UX augmenting TailwindCSS defaults

## Core Tech:

Starts with [T3-Stack](https://create.t3.gg/) via _`create-t3-app`_:

- [React](https://react.dev/)
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)

## Database:

- MySQL Database via [PlanetScale](https://planetscale.org)

## Continuous Deployment/Integration:

- [Github](https://github.com/r-i-c-h/t3witter-app) - Source
- [Vercel](https://vercel.com) - Deployment

---

## Possible Future Upgradables...

- [ ] Add Google Login auth
- [ ] Add site-wide Light/Dark Mode
- [ ] Add Better Time-tracking lib to get prettier relative-time stamping on TweetCard
- [ ] Settle @ts-ignored issue in NewTweetForm's `setInfniteData` 😠
- [ ] Revise User Profile Page IDs to reflect user-names instead of database uuid() values