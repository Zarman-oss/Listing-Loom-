// import connectDataBase from '@/config/database.js';
// import Message from '@/models/Message.js';
// import { getSessionUser } from '@/utils/getSessionUser.js';
// export const dynamic = 'force-dynamic';

// export const POST = async (request) => {
//   /**
//    * POST /api/messages
//    * send messages
//    */

//   try {
//     await connectDataBase();

//     const { email, phone, message, property } = request.join();

//     const sessionUser = await getSessionUser();

//     if (!sessionUser || !sessionUser.user) {
//       return (
//         new Response({ message: 'You must logged in to send message' }),
//         {
//           status: 401,
//         }
//       );
//     }

//     const { user } = sessionUser;

//     if (user.id === recipient) {
//       return new Response(JSON.stringify({ message: 'Request failed' }), {
//         status: 400,
//       });
//     }

//     const newMessage = new Message({
//       sender: user.id,
//       recipient,
//       property,
//       email,
//       phone,
//       body: message,
//     });

//     await newMessage.save();

//     return new Response(JSON.stringify({ message: 'Message sent' }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);
//     return new Response('Something went wrong', {
//       status: 500,
//     });
//   }
// };

import connectDataBase from '@/config/database.js';
import Message from '@/models/Message.js';
import { getSessionUser } from '@/utils/getSessionUser.js';
export const dynamic = 'force-dynamic';

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
