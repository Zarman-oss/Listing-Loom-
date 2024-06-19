import GoogleProvider from 'next-auth/providers/google';
import connectDataBase from '../config/database';
import User from '../models/User';

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
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ profile }) {
      try {
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
      } catch (error) {
        console.error('Error during sign-in callback:', error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const user = await User.findOne({
          email: session.user.email,
        });

        session.user.id = user._id.toString();
        return session;
      } catch (error) {
        console.error('Error during session callback:', error);
        return session;
      }
    },
  },
};
