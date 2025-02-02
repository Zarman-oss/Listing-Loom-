import connectDataBase from '@/config/database.js';
import User from '@/models/User.js';
import { getSessionUser } from '@/utils/getSessionUser.js';

export const dynamic = 'force-dynamic';

/**
 * POST /api/bookmarks
 * Bookmarks a property
 */

export const POST = async (request) => {
  try {
    await connectDataBase();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
