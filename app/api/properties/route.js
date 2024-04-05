import connectDataBase from '../../../config/database';
import Property from '../../../models/Property';

/**
 * GET api/properties
 * Fetch  all the properties
 * @returns  An array of properties
 */

export const GET = async (request) => {
  try {
    await connectDataBase();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Service is not available', { status: 500 });
  }
};

/**
 * POST /api/properties
 * Adds a property
 * @response sends JSON to client with new property in it
 */
export const POST = async (request) => {
  try {
    const formData = await request.formData();

    // ? get all them values from amenities and images

    const amenities = formData.getAll('amenities');

    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    console.log(amenities, images);

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to add property', {
      status: 500,
    });
  }
};
