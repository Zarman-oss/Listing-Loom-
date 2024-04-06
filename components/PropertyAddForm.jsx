'use client';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function PropertyAddForm() {
  const [fields, setFields] = useState({
    type: 'Apartment',
    name: 'Test Property',
    description: '',
    location: {
      street: '',
      city: 'Test city',
      state: 'Test State ',
      zipcode: '',
    },
    beds: '3',
    baths: '2',
    square_feet: '1600',
    amenities: [],
    rates: {
      week: '',
      month: '2100',
      nigh: '',
    },
    seller_info: {
      name: '',
      email: 'test@test.com ',
      phone: '',
    },
    images: [],
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

  const handleImageChange = (e) => {
    const { files } = e.target;

    const updatedImages = [...fields.images];

    for (const file of files) {
      updatedImages.push(file);
    }

    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  return (
    <form
      className='max-w-lg mx-auto'
      action='/api/properties'
      method='POST'
      encType='multipart/form-data'
    >
      <div className='space-y-12 m-8 '>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Add Property Information
          </h2>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Property Type
              </label>
              <div className='mt-2'>
                <select
                  value={fields.type}
                  onChange={handleChange}
                  id='type'
                  name='type'
                  autoComplete='country-name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option value='Apartment'>Apartment</option>
                  <option value='Condo'>Condo</option>
                  <option value='House'>House</option>
                  <option value='Cabin Or Cottage'>Cabin or Cottage</option>
                  <option value='Room'>Room</option>
                  <option value='Studio'>Studio</option>
                  <option value='Other'>Other</option>
                </select>
              </div>

              <div className='mt-2'>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Listing Name
                </label>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.name}
                    onChange={handleChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Affordable 1100 property'
                  />
                </div>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <div className=''>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Location
                </label>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.location.street}
                    onChange={handleChange}
                    type='text'
                    name='location.street'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Street'
                  />
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.location.city}
                    onChange={handleChange}
                    type='text'
                    name='location.city'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='City'
                  />
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.location.state}
                    onChange={handleChange}
                    type='text'
                    name='location.state'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='State'
                  />
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.location.zipcode}
                    onChange={handleChange}
                    type='text'
                    name='location.zipcode'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='ZipCode'
                  />
                </div>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <div className=''>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Beds
                </label>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.beds}
                    onChange={handleChange}
                    type='number'
                    name='beds'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder=''
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-4'>
              <div className=''>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Baths
                </label>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.baths}
                    onChange={handleChange}
                    type='number'
                    name='baths'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder=''
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-4'>
              <div className=''>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Square Feet
                </label>
              </div>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    value={fields.square_feet}
                    onChange={handleChange}
                    type='number'
                    name='square_feet'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder=''
                  />
                </div>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='about'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Add Description
              </label>
              <div className='mt-2'>
                <textarea
                  value={fields.description}
                  onChange={handleChange}
                  id='description'
                  name='description'
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <fieldset>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Amenities
              </legend>
              <div className='max-w-md'>
                <div className='flex flex-wrap  gap-2'>
                  <div className='mt-6 '>
                    <div className=' flex items-center space-x-4 '>
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Wifi
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Wifi'
                        checked={fields.amenities.includes('Wifi')}
                        id='comments'
                        name='Wifi'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Open Kitchen
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Open Kitchen '
                        checked={fields.amenities.includes('Open Kitchen')}
                        id='comments'
                        name='Open Kitchen'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Washer and Dryer
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Washer and Dryer'
                        checked={fields.amenities.includes('Washer and Dryer')}
                        id='comments'
                        name='Washer and Dryer'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Free Parking
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Free Parking'
                        checked={fields.amenities.includes('Free Parking')}
                        id='comments'
                        name='Free Parking'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Pool
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Pool'
                        checked={fields.amenities.includes('Pool')}
                        id='comments'
                        name='Pool'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Tub
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Tub'
                        checked={fields.amenities.includes('Tub')}
                        id='comments'
                        name='Tub'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Security
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Security'
                        checked={fields.amenities.includes('Security')}
                        id='comments'
                        name='Security '
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Handy Cap facility
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Handy Cap facility'
                        checked={fields.amenities.includes(
                          'Handy Cap facility'
                        )}
                        id='comments'
                        name='Handy Cap facility'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Elevator
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Elevator'
                        checked={fields.amenities.includes('Elevator')}
                        id='comments'
                        name='Elevator'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Dishwasher
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Dishwasher'
                        checked={fields.amenities.includes('Dishwasher')}
                        id='comments'
                        name='Dishwasher'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Gym
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Gym'
                        checked={fields.amenities.includes('Gym')}
                        id='comments'
                        name='Gym'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          AC
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='AC'
                        checked={fields.amenities.includes('AC')}
                        id='comments'
                        name='AC'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Patio
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Patio'
                        checked={fields.amenities.includes('Patio')}
                        id='comments'
                        name='Patio'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Tv
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Tv'
                        checked={fields.amenities.includes('Tv')}
                        id='comments'
                        name='Tv'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                      <div className='flex flex-col'>
                        <label
                          htmlFor='comments'
                          className='font-medium text-gray-900'
                        >
                          Coffee Maker
                        </label>
                      </div>
                      <input
                        onChange={handleAmenitiesChange}
                        value='Coffee Maker'
                        checked={fields.amenities.includes('Coffee Maker')}
                        id='comments'
                        name='Tv'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <legend className='text-sm font-semibold leading-6 text-gray-900'>
                Put amount
              </legend>
              <div className='sm:col-span-4 '>
                <div className=''>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Week
                  </label>
                </div>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      value={fields.rates.week}
                      onChange={handleChange}
                      type='number'
                      name='rates.week'
                      id='username'
                      autoComplete='username'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4 '>
                <div className=''>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Month
                  </label>
                </div>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      value={fields.rates.month}
                      onChange={handleChange}
                      type='number'
                      name='rates.month'
                      id='username'
                      autoComplete='username'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='sm:col-span-4 '>
                <div className=''>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Year
                  </label>
                </div>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                    <input
                      value={fields.rates.year}
                      onChange={handleChange}
                      type='number'
                      name='rates.year'
                      id='username'
                      autoComplete='username'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='border-b border-gray-900/10 pb-12'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Personal Information
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  Use a permanent address where you can receive mail.
                </p>

                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Name
                    </label>
                    <div className='mt-2'>
                      <input
                        value={fields.seller_info.name}
                        onChange={handleChange}
                        type='text'
                        name='seller_info.name'
                        id='first-name'
                        autoComplete='given-name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email address
                    </label>
                    <div className='mt-2'>
                      <input
                        value={fields.seller_info.email}
                        onChange={handleChange}
                        id='email'
                        name='seller_info.email'
                        type='email'
                        autoComplete='email'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Phone
                    </label>
                    <div className='mt-2'>
                      <input
                        value={fields.seller_info.phone}
                        onChange={handleChange}
                        type='text'
                        name='seller_info.phone'
                        id='first-name'
                        autoComplete='given-name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className='col-span-full'>
              <label
                htmlFor='photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Photo
              </label>
              <div className='mt-2 flex items-center gap-x-3'>
                <UserCircleIcon
                  className='h-12 w-12 text-gray-300'
                  aria-hidden='true'
                />
                <button
                  type='button'
                  className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                >
                  Change
                </button>
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='cover-photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Select Pictures
              </label>

              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                <div className='text-center'>
                  <PhotoIcon
                    className='mx-auto h-12 w-12 text-gray-300'
                    aria-hidden='true'
                  />
                  <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                    <label
                      htmlFor='images'
                      className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                    >
                      Upload photos
                    </label>
                    <input
                      className='sr-only'
                      type='file'
                      id='images'
                      name='images'
                      accept='image/*'
                      multiple
                      required
                      onChange={handleImageChange}
                    />
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  {/* <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
