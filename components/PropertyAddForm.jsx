'use client';

import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function PropertyAddForm() {
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
    },
    seller_info: {
      name: '',
      email: '',
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
      action="/api/properties"
      className="max-w-lg mx-auto"
      method="POST"
      encType="multipart/form-data"
    >
      <div className="space-y-12 m-8 ">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Property Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Property Type
              </label>
              <div className="mt-2">
                <select
                  value={fields.type}
                  onChange={handleChange}
                  id="type"
                  name="type"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="House">House</option>
                  <option value="Cabin Or Cottage">Cabin or Cottage</option>
                  <option value="Room">Room</option>
                  <option value="Studio">Studio</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Listing Name
                </label>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={fields.name}
                    onChange={handleChange}
                    autoComplete="username"
                    placeholder="Affordable 1100 property"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Location
                </label>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="street"
                    name="location.street"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={fields.location.street}
                    onChange={handleChange}
                    autoComplete="username"
                    placeholder="Street"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="city"
                    name="location.city"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={fields.location.city}
                    onChange={handleChange}
                    autoComplete="username"
                    placeholder="City"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="state"
                    name="location.state"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    autoComplete="username"
                    value={fields.location.state}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="zipcode"
                    name="location.zipcode"
                    value={fields.location.zipcode}
                    onChange={handleChange}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="ZipCode"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <div className="">
                <label
                  htmlFor="beds"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Beds
                </label>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    id="beds"
                    name="beds"
                    value={fields.beds}
                    onChange={handleChange}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="">
                <label
                  htmlFor="baths"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Baths
                </label>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    id="baths"
                    name="baths"
                    value={fields.baths}
                    onChange={handleChange}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="">
                <label
                  htmlFor="square_feet"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Square Feet
                </label>
              </div>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    id="square_feet"
                    name="square_feet"
                    value={fields.square_feet}
                    onChange={handleChange}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Add Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={fields.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Add some additional information for listing"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Amenities
              </legend>
              <div className="max-w-md">
                <div className="flex flex-wrap gap-2">
                  <div className="mt-6 ">
                    <div className=" flex items-center space-x-4 ">
                      <div className="flex flex-col">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Wifi
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_wifi"
                        onChange={handleAmenitiesChange}
                        value="Wifi"
                        checked={fields.amenities.includes('Wifi')}
                        name="amenities"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_kitchen"
                          className="font-medium text-gray-900"
                        >
                          Open Kitchen
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_kitchen"
                        name="amenities"
                        value="Open Kitchen"
                        checked={fields.amenities.includes('Open Kitchen')}
                        onChange={handleAmenitiesChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_washer_dryer"
                          className="font-medium text-gray-900"
                        >
                          Washer and Dryer
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_washer_dryer"
                        name="amenities"
                        value="Washer and Dryer"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Washer and Dryer')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_free_parking"
                          className="font-medium text-gray-900"
                        >
                          Free Parking
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_free_parking"
                        name="amenities"
                        value="Free Parking"
                        checked={fields.amenities.includes('Free Parking')}
                        onChange={handleAmenitiesChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_pool"
                          className="font-medium text-gray-900"
                        >
                          Pool
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_pool"
                        name="amenities"
                        value="Pool"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Pool')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_tub"
                          className="font-medium text-gray-900"
                        >
                          Tub
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_tub"
                        name="amenities"
                        value="Tub"
                        checked={fields.amenities.includes('Tub')}
                        onChange={handleAmenitiesChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_security"
                          className="font-medium text-gray-900"
                        >
                          Security
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_security"
                        name="amenities"
                        value="Security"
                        checked={fields.amenities.includes('Security')}
                        onChange={handleAmenitiesChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_Handy_Cap_facility"
                          className="font-medium text-gray-900"
                        >
                          Handy Cap facility
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_Handy_Cap_facility"
                        name="amenities"
                        value="Handy Cap facility"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes(
                          'Handy Cap facility'
                        )}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_elevator"
                          className="font-medium text-gray-900"
                        >
                          Elevator
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_elevator"
                        name="amenities"
                        value="Elevator"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Elevator')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_dishwasher"
                          className="font-medium text-gray-900"
                        >
                          Dishwasher
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_dishwasher"
                        name="amenities"
                        value="Dishwasher"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Dishwasher')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_gym"
                          className="font-medium text-gray-900"
                        >
                          Gym
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_gym"
                        name="amenities"
                        value="Gym"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Gym')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_ac"
                          className="font-medium text-gray-900"
                        >
                          AC
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_ac"
                        name="amenities"
                        value="AC"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('AC')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_patio"
                          className="font-medium text-gray-900"
                        >
                          Patio
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_patio"
                        name="amenities"
                        value="Patio"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Patio')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_tv"
                          className="font-medium text-gray-900"
                        >
                          Tv
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_tv"
                        name="amenities"
                        value="Tv"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Tv')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor="amenity_coffee_maker"
                          className="font-medium text-gray-900"
                        >
                          Coffee Maker
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id="amenity_coffee_maker"
                        name="amenities"
                        value="Coffee Maker"
                        onChange={handleAmenitiesChange}
                        checked={fields.amenities.includes('Coffee Maker')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Put amount
              </legend>
              <div className="sm:col-span-4">
                <div className="">
                  <label
                    htmlFor="weekly_rate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Weekly
                  </label>
                </div>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      id="weekly_rate"
                      name="rates.weekly"
                      value={fields.rates.weekly}
                      onChange={handleChange}
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 ">
                <div className="">
                  <label
                    htmlFor="monthly_rate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Monthly
                  </label>
                </div>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      id="monthly_rate"
                      name="rates.monthly"
                      value={fields.rates.monthly}
                      onChange={handleChange}
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 ">
                <div className="">
                  <label
                    htmlFor="nightly_rate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nightly
                  </label>
                </div>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      id="nighly_rate"
                      name="rates.nightly"
                      value={fields.rates.nightly}
                      onChange={handleChange}
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="seller_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="seller_name"
                        name="seller_info.name"
                        value={fields.seller_info.name}
                        onChange={handleChange}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="seller_email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        id="seller_email"
                        name="seller_info.email"
                        value={fields.seller_info.email}
                        onChange={handleChange}
                        autoComplete="Email address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="seller_phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        id="seller_phone"
                        name="seller_info.phone"
                        value={fields.seller_info.phone}
                        onChange={handleChange}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="col-span-full">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer text-red-700 "
                    >
                      Upload photos
                    </label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 "
          >
            Add property
          </button>
        </div>
      </div>
    </form>
  );
}
