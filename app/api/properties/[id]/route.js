import cloudinary from '@/config/cloudinary.js';
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

    return Response.json(property);
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

export const DELETE = async ({ params }) => {
  try {
    const propertyId = params.id;

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

    const publicIds = property.images.map((imageUrl) => {
      const parts = imageUrl.split('/');
      return parts.at(-1).split('.').at(0);
    });

    if (publicIds.length > 0) {
      for (let publicId of publicIds) {
        await cloudinary.uploader.destroy('listingloom/' + publicId);
      }
    }

    await property.deleteOne();

    return new Response('Property Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

/**
 * PUT /api/properties/:id
 * Updates  a  property
 * @returns  updated property
 */

export const PUT = async (request, { params }) => {
  try {
    await connectDataBase();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      console.error('User ID is required');
      return new Response('User ID is required', { status: 401 });
    }

    const { id } = params;

    const { userId } = sessionUser;

    const formData = await request.formData();

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response('Property does not exist', { status: 404 });
    }

    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

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
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
        price: formData.get('rates.price'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return Response.json(updatedProperty);
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to update property', { status: 500 });
  }
};
