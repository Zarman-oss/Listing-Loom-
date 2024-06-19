import { authOptions } from '@/utils/authOptions.js';
import { getServerSession } from 'next-auth/next';

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };

  console.error('Error fetching session:', error);
  return null;
};
