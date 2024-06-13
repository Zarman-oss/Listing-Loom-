import connectDataBase from '@/config/database.js';
import Message from '@/models/Message.js';
import { getSessionUser } from '@/utils/getSessionUser.js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/messages/unread-count/:id
 * GETS all the unread messages
 */

export const GET = async (request) => {
  try {
    await connectDataBase();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
