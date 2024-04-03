import connectDataBase from '../config/database';
import User from '../models/User';

import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    /**
     * This function will be invoked when the user logs in successfully.
     * It will connect to the database, check if the user exists, and add the user to the database if they don't.
     * and return the object true to sign users in
     */
    async signIn({ profile }) {
      await connectDataBase();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },

    /**
     * This function modifies the user session.
     * It retrieves the user from the database, assigns the user ID to the session, and returns the session.
     */
    async session({ session }) {},
  },
};
