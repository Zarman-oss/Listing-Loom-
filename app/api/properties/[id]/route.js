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

/**
 * PUT /api/properties/:id
 * updates a property
 * @returns  nothing
 */
export const PUT = async (request) => {
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

    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

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
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };
    console.log('Property Data:', propertyData);

    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'listingloom',
        }
      );

      imageUploadPromises.push(result.secure_url);

      const uploadedImages = await Promise.all(imageUploadPromises);

      propertyData.images = uploadedImages;
    }

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
