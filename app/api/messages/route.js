import connectDataBase from '@/config/database.js';
import Message from '@/models/Message.js';
import { getSessionUser } from '@/utils/getSessionUser.js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/messages
 * fetch messages
 */

export const GET = async (request) => {
  try {
    await connectDataBase();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return (
        new Response('User ID is required'),
        {
          status: 401,
        }
      );
    }

    const { userId } = sessionUser;

    const messages = await Message.find({ recipient: userId })
      .populate('sender', 'username')
      .populate('property', 'name');
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

export const POST = async (request) => {
  /**
   * POST /api/messages
   * send messages
   */

  try {
    await connectDataBase();

    // Parse the request body
    const { name, email, phone, message, property, recipient } =
      await request.json();

    console.log('Request payload:', {
      email,
      phone,
      message,
      property,
      recipient,
    });

    if (!email || !phone || !message || !property || !recipient) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        {
          status: 400,
        }
      );
    }

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: 'You must be logged in to send a message' }),
        {
          status: 401,
        }
      );
    }

    const { user } = sessionUser;

    if (user.id === recipient) {
      return new Response(JSON.stringify({ message: 'Request failed' }), {
        status: 400,
      });
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      name,
      property,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message sent' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
