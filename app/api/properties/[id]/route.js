import connectDataBase from '../../../../config/database';
import Property from '../../../../models/Property';

/**
 * GET api/properties/:id
 * Fetch  single  properties
 * @returns  An array of properties
 */

export const GET = async (request, { params }) => {
  try {
    await connectDataBase();

    const property = await Property.findById(params.id);

    if (!property) return new Response('Property not found', { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Service is not available', { status: 500 });
  }
};
