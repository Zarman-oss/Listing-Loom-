import { MapPinIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import BookMarkButton from './UI/buttons/BookMarkButton.jsx';
import getPropertyRate from '@/utils/getPropertyRate.js';

export default function PropertyCard({ property }) {
  if (!property) {
    return null;
  }

  return (
    <div className='rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white'>
      <div className='relative h-80'>
        <Image
          src={property.images[0]}
          alt={`Image of ${property.name}`}
          layout='fill'
          objectFit='cover'
          className='hover:scale-105 transition-transform duration-300 ease-in-out'
        />
      </div>

      <div className='p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0'>
        <div className='flex-grow'>
          <div className='text-red-600 font-semibold mb-2 uppercase'>
            {property.type}
          </div>
          <h3 className='text-2xl font-bold mb-2 text-gray-900 hover:text-indigo-600 transition-colors duration-300'>
            {property.name}
          </h3>
          <p className='text-gray-600 mb-4'>
            <span className='font-bold'>{property.beds}</span> Bed
            <span className='ml-4 font-bold'>{property.baths}</span> Baths
            <span className='ml-4 font-bold'>
              {property.square_feet.toLocaleString()}
            </span>{' '}
            sqft
          </p>
          <p className='text-lg font-bold text-green-600 mb-4'>
            {getPropertyRate(property)}
          </p>
          <div className='flex items-center mt-1 text-gray-700'>
            <MapPinIcon className='text-red-700 h-6 w-6' />
            <span className='text-md font-semibold ml-2'>
              {property.location.street}, {property.location.city}{' '}
              {property.location.state}
            </span>
          </div>
        </div>

        <div className='ml-auto mt-4 lg:mt-0'>
          <BookMarkButton property={property} />
        </div>
      </div>
      <div className='p-4 text-center'>
        <Link href={`/properties/${property._id}`} passHref>
          <LinkButton>Check Property &#8594;</LinkButton>
        </Link>
      </div>
    </div>
  );
}

// Styled component for the Link button
const LinkButton = ({ children }) => (
  <button className='text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none transition-colors duration-300'>
    {children}
  </button>
);
