import connectDataBase from '@/config/database.js';
import Message from '@/models/Message.js';
import { getSessionUser } from '@/utils/getSessionUser.js';

export const dynamic = 'force-dynamic';

/**
 * PUT /api/messages/:id
 * Mark as read/new the messages
 */

export const PUT = async (request, { params }) => {
  try {
    await connectDataBase();
    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const messages = await Message.findById(id);

    if (!messages)
      return new Response('Message Not Found', {
        status: 404,
      });

    if (messages.recipient.toString() !== userId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    messages.read = !messages.read;
    await messages.save();
    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};

/**
 * PUT /api/messages/:id
 * Deletes messages
 */

export const DELETE = async (request, { params }) => {
  try {
    await connectDataBase();
    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const messages = await Message.findById(id);

    if (!messages)
      return new Response('Message Not Found', {
        status: 404,
      });

    if (messages.recipient.toString() !== userId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    await messages.deleteOne();

    return new Response('Message Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
