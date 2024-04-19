import connectDataBase from '@/config/database.js';
import Property from '@/models/Property.js';

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
