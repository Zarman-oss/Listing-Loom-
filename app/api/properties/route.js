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
    console.log(formData.get('name'));

    // ? get all them values from amenities and images

    const amenities = formData.getAll('amenities');

    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    // ?  now we have to be able to store this in db right, for that we have to make an object

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        week: formData.get('rates.week'),
        month: formData.get('rates.month'),
        night: formData.get('rates.night'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      images,
    };

    console.log(propertyData);

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to add property', {
      status: 500,
    });
  }
};
