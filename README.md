# _T3witter_ (Twitter Clone Project)

**Production Deployment: https://t3witter-app.vercel.app/**

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

- [ ] Revise Tweetcard Styling to shrink vertical size of <3 line OR increase other line-heights
- [ ] Revise Tweetcard Styling to shrink date/timing font but maintain vertical alignment
- [ ] Change wording for # of users followed on profile stats
- [ ] Fix color a11y issues - Amber-500: #F59E0B | amber-200: #FDE68A | amber-700: #B45309
- [ ] Revise [SELF Profile Page] Header to mobile layout and responsive size increases.
- [ ] Revise [Profile Page] Header to mobile layout and responsive size increases INCLUDE FOLLOW BUTTON.
- [ ] Add Logged in User's name to "Welcome" || Change to "Home"
- [ ] Add Better Time-tracking lib to get prettier relative-time stamping on TweetCard

### Upgradables...

- [ ] Add Google Login auth
- [ ] Revise User Profile Page IDs to reflect user-names instead of database uuid() values
