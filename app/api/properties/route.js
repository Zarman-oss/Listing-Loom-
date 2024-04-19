import connectDataBase from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

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
    await connectDataBase();

    const sessionUser = await getSessionUser();

    console.log('Session User:', sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      console.error('User ID is required');
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    console.log('User ID:', userId);

    const formData = await request.formData();

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
      amenities: formData.getAll('amenities'),
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
      owner: userId,
    };
    console.log('Property Data:', propertyData);

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to add property', {
      status: 500,
    });
  }
};
