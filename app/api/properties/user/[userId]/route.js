import connectDataBase from '@/config/database.js';
import Property from '@/models/Property.js';

/**
 * GET api/properties/user/:userId
 * Fetch owner property listings
 * @returns  all the listings that user created
 */

export const GET = async (request, { params }) => {
  try {
    await connectDataBase();

    const userId = params.userId;

    if (!userId) {
      return new Response('User Id is required', {
        status: 400,
      });
    }
    const properties = await Property.find({ owner: userId });

    return Response.json(properties);
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
