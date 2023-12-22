import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [
        '/',
        'events/:id',
        'events/webhook/clerk',
        'events/webhook/stripe',
        'events/uploadthing',
        '/api/webhook/clerk',
    ],
    ignoredRoutes: [
        '/api/webhook/clerk',
        'events/webhook/clerk',
        'events/webhook/stripe',
        'events/uploadthing'
    ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 