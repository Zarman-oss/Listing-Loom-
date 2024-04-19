import { authOptions } from '@/utils/authOptions.js';
import { getServerSession } from 'next-auth/next';

export const getSessionUser = async () => {
  try {
    console.log('Fetching session...');
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session || !session.user) {
      console.log('No session or user found.');
      return null;
    }

    console.log('Session user found:', session.user);

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
};
