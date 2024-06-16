'use client';
import Alert from '@/components/UI/Alert.jsx';
import { fetchProperty } from '@/utils/requests.js';
import { useParams, useRouter } from 'next/navigation.js';
import { useEffect, useState } from 'react';

export default function PropertyEditForm() {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const { id } = useParams();
  const router = useRouter();

  const [fields, setFields] = useState({
    type: '',
    name: '',
    description: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    beds: '',
    baths: '',
    square_feet: '',
    amenities: [],
    rates: {
      weekly: '',
      monthly: '',
      nightly: '',
      price: '',
    },
    seller_info: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(id);

        if (propertyData && propertyData.rates) {
          const defaultRates = { ...propertyData.rates };

          for (const rate in defaultRates) {
            if (defaultRates[rate] === null) {
              defaultRates[rate] = '';
            }
          }
          propertyData.rates = defaultRates;
        }

        setFields(propertyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    const updatedAmenities = [...fields.amenities];

    if (checked) {
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);

      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.status === 200) {
        setAlert({
          show: true,
          type: 'success',
          message: 'Property updated successfully',
        });
        setTimeout(() => {
          router.push(`/properties/${id}`);
        }, 2000);
      } else {
        setAlert({
          show: true,
          type: 'error',
          message: 'Failed to update property',
        });
      }
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Network error occurred',
      });
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Alert
            show={alert.show}
            onClose={() => setAlert({ show: false, type: '', message: '' })}
            type={alert.type}
            message={alert.message}
          />
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-8 divide-y divide-gray-200'>
              <div>
                <h2 className='text-3xl font-bold text-gray-900 text-center'>
                  Edit Property Information
                </h2>

                <div className='mt-6'>
                  <label
                    htmlFor='type'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Property Type
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      id='type'
                      name='type'
                      value={fields.type}
                      onChange={handleChange}
                      placeholder='Type of property'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                    />
                  </div>
                </div>
                <div className='mt-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Property Name
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={fields.name}
                      onChange={handleChange}
                      placeholder='Name of the property'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='sm:col-span-4 mt-6'>
                  <label className='block text-sm font-medium leading-6 text-gray-900'>
                    Location
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                      <input
                        type='text'
                        id='street'
                        name='location.street'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                        value={fields.location.street}
                        onChange={handleChange}
                        autoComplete='username'
                        placeholder='Street'
                      />
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                      <input
                        type='text'
                        id='city'
                        name='location.city'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                        value={fields.location.city}
                        onChange={handleChange}
                        autoComplete='username'
                        placeholder='City'
                      />
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                      <input
                        type='text'
                        id='state'
                        name='location.state'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                        onChange={handleChange}
                        autoComplete='username'
                        value={fields.location.state}
                        placeholder='State'
                      />
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                      <input
                        type='text'
                        id='zipcode'
                        name='location.zipcode'
                        value={fields.location.zipcode}
                        onChange={handleChange}
                        autoComplete='username'
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                        placeholder='ZipCode'
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <label
                    htmlFor='beds'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Beds
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      id='beds'
                      name='beds'
                      value={fields.beds}
                      onChange={handleChange}
                      placeholder='Number of beds'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                    />
                  </div>
                </div>
                <div className='mt-6'>
                  <label
                    htmlFor='baths'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Baths
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      id='baths'
                      name='baths'
                      value={fields.baths}
                      onChange={handleChange}
                      placeholder='Number of baths'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                    />
                  </div>
                </div>
                <div className='mt-6'>
                  <label
                    htmlFor='square_feet'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Square Feet
                  </label>
                  <div className='mt-2'>
                    <input
                      type='number'
                      id='square_feet'
                      name='square_feet'
                      value={fields.square_feet}
                      onChange={handleChange}
                      placeholder='Total square feet'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                    />
                  </div>
                </div>
                <div className='mt-6'>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Description
                  </label>
                  <div className='mt-2'>
                    <textarea
                      id='description'
                      name='description'
                      value={fields.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder='Add some additional information for listing'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                    />
                  </div>
                </div>
                <fieldset className='mt-6'>
                  <legend className='text-lg font-semibold text-gray-900'>
                    Amenities
                  </legend>
                  <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
                    {[
                      'Wifi',
                      'Open Kitchen',
                      'Washer and Dryer',
                      'Free Parking',
                      'Pool',
                      'Tub',
                      'Security',
                      'Handy Cap facility',
                      'Elevator',
                      'Dishwasher',
                      'Gym',
                      'AC',
                      'Patio',
                      'Tv',
                      'Coffee Maker',
                    ].map((amenity) => (
                      <div key={amenity} className='flex items-center'>
                        <input
                          type='checkbox'
                          id={`amenity_${amenity}`}
                          name='amenities'
                          value={amenity}
                          checked={fields.amenities.includes(amenity)}
                          onChange={handleAmenitiesChange}
                          className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                        />
                        <label
                          htmlFor={`amenity_${amenity}`}
                          className='ml-2 text-sm text-gray-700'
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <div className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3'>
                  {['weekly', 'monthly', 'nightly', 'price'].map((rate) => (
                    <div key={rate}>
                      <label
                        htmlFor={`${rate}_rate`}
                        className='block text-sm font-medium text-gray-900'
                      >
                        {rate.charAt(0).toUpperCase() + rate.slice(1)} Rate
                      </label>
                      <div className='mt-2 relative rounded-md shadow-sm'>
                        <input
                          type='number'
                          id={`${rate}_rate`}
                          name={`rates.${rate}`}
                          value={fields.rates[rate]}
                          onChange={handleChange}
                          className='block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                          placeholder='0.00'
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='border-t border-gray-200 pt-6'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Personal Information
                  </h3>
                  <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6'>
                    <div>
                      <label
                        htmlFor='seller_name'
                        className='block text-sm font-medium text-gray-900'
                      >
                        Name
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          id='seller_name'
                          name='seller_info.name'
                          value={fields.seller_info.name}
                          onChange={handleChange}
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='seller_email'
                        className='block text-sm font-medium text-gray-900'
                      >
                        Email
                      </label>
                      <div className='mt-2'>
                        <input
                          type='email'
                          id='seller_email'
                          name='seller_info.email'
                          value={fields.seller_info.email}
                          onChange={handleChange}
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='seller_phone'
                        className='block text-sm font-medium text-gray-900'
                      >
                        Phone
                      </label>
                      <div className='mt-2'>
                        <input
                          type='tel'
                          id='seller_phone'
                          name='seller_info.phone'
                          value={fields.seller_info.phone}
                          onChange={handleChange}
                          className='block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-5'>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-900'
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}
