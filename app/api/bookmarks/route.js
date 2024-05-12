import connectDataBase from '@/config/database.js';
import User from '@/models/User.js';
import Property from '@/models/Property.js';
import { getSessionUser } from '@/utils/getSessionUser.js';

export const dynamic = 'force-dynamic';

/**
 * POST /api/properties
 * Bookmarks a property
 */

export const POST = async (request) => {
  try {
    await connectDataBase();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const user = await User.findOne({ _id: userId });

    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = 'Property removed successfully';
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = 'Property added successfully';
      isBookmarked = true;
    }

    await user.save();

    return new Response(
      JSON.stringify({
        message,
        isBookmarked,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log('Error:', error);

    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
