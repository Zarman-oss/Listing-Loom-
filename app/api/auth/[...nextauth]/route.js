import NextAuth from 'next-auth/next';
import { authOptions } from '../../../../utils/authOptions';

const options = {
  ...authOptions,
  debug: true,
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
