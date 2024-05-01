import connectDataBase from '@/config/database.js';
import Property from '@/models/Property.js';
import { getSessionUser } from '@/utils/getSessionUser.js';

/**
 * GET api/properties/:id
 * Fetch  single  properties
 * @returns  An array of properties
 */

export const GET = async (request, { params }) => {
  try {
    await connectDataBase();

    const property = await Property.findById(params.id);

    if (!property) return new Response('Property Not Found', { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

/**
 * DELETE /api/properties/:id
 * Deletes  a  property
 * @returns  nothing
 */

export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id; // Assuming the property id is provided in the params

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    await connectDataBase();

    const property = await Property.findById(propertyId);

    if (!property) return new Response('Property Not Found', { status: 404 });

    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized action', {
        status: 401,
      });
    }

    await property.deleteOne();

    return new Response('Property deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
