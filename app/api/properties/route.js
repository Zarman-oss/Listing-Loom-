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
