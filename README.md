# _T3witter_ (Clone of a popular message website)

**Production Deployment: https://t3witter-app.vercel.app/**

## Base Features:

- A Public message feed visible to unautenticated users, including display of "likes" per-message
- Standard Login/Logout functionality
- User Account creation via Discord or GitHub paths
- Users can add messages to system/public feed
- Users can add "Likes" per message w/updates to quantities
- Ability for Users to "follow" accounts and view a filtered message feed _only_ from the accounts they follow
- Users have an individual "Profile" page which displays _only their own_ messages
- User "Profile" pages display their system-wide statistics for followers/number of messages/and number of followed accounts
- Mobile Responsive Design

## Core Tech:

Starts with [T3-Stack](https://create.t3.gg/) via _`create-t3-app`_:

- [React](https://react.dev/)
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Database:

- MySQL Database via [PlanetScale](https://planetscale.org)

## Continuous Deployment/Integration:

- [Github](https://github.com/r-i-c-h/t3witter-app) - Source
- [Vercel](https://vercel.com) - Deployment

---

## TODOs...

- [ ] Settle @ts-ignored TS-issue in NewTweetForm's `setInfniteData` ?😠?
- [ ] Fix color a11y issues - Amber-500: #F59E0B | amber-200: #FDE68A | amber-700: #B45309
- [x] Add Skeleton Loaders for Tweet Cards instead of just spinning arrow loader
- [x] Add Better Error Message Notification
- [x] Revise [SELF Profile Page] Header to mobile layout and responsive size increases.
- [x] Revise [Profile Page] Header to mobile layout and responsive size increases INCLUDE FOLLOW BUTTON.
- [x] Revise Tweetcard Styling to shrink vertical size of <3 line OR increase other line-heights
- [x] Revise Tweetcard Styling to shrink date/timing font but maintain vertical alignment
- [x] 🐛! Placeholder text running beyond vertical textbox in mobile.
- [x] 🐛! Tweet card `<p>` not wrapping correctly in mobile, caused by stats-block in profile-page `<header>`
- [x] Add Logged in User's name to "Welcome" || Change to "Home"

### Upgradables...

- [ ] Add Google Login auth
- [ ] Revise for site-wide Light/Dark Mode
- [ ] Add Better Time-tracking lib to get prettier relative-time stamping on TweetCard
- [ ] Revise User Profile Page IDs to reflect user-names instead of database uuid() values
