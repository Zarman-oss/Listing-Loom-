export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/properties/add',
    '/properties/:id/edit',
    '/profile',
    '/properties/saved',
    '/messages',
  ],
};
