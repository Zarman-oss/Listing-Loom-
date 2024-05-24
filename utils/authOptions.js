// import GoogleProvider from 'next-auth/providers/google';
// import connectDataBase from '../config/database';
// import User from '../models/User';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: 'consent',
//           access_type: 'offline',
//           response_type: 'code',
//         },
//       },
//     }),
//   ],

//   callbacks: {
//     async signIn({ profile }) {
//       console.log('Sign-in callback invoked');

//       await connectDataBase();

//       const userExists = await User.findOne({ email: profile.email });

//       console.log('User exists:', userExists);

//       if (!userExists) {
//         const username = profile.name.slice(0, 20);

//         console.log('Creating new user:', profile.email);

//         await User.create({
//           email: profile.email,
//           username,
//           image: profile.picture,
//         });
//       }
//       return true;
//     },

//     async session({ session }) {
//       console.log('Session callback invoked');

//       const user = await User.findOne({
//         email: session.user.email,
//       });

//       session.user.id = user._id.toString();

//       return session;
//     },
//   },
// };

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
    error: '/auth/error', // Custom error page
  },
  callbacks: {
    async signIn({ profile }) {
      console.log('Sign-in callback invoked');

      try {
        await connectDataBase();

        const userExists = await User.findOne({ email: profile.email });

        console.log('User exists:', userExists);

        if (!userExists) {
          const username = profile.name.slice(0, 20);

          console.log('Creating new user:', profile.email);

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
      console.log('Session callback invoked');

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
