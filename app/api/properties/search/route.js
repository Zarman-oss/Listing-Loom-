import connectDataBase from '@/config/database.js';
import Property from '@/models/Property.js';

/**
 * GET /api/properties/user/search
 * @returns search results back
 */

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    await connectDataBase();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    const locationPattern = new RegExp(location, 'i');
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.city': locationPattern },
        { 'location.street': locationPattern },
        { 'location.state': locationPattern },
      ],
    };

    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i');
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
};
