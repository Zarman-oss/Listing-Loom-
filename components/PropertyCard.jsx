'use client';
import { MapPinIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa';
import BookMarkButton from './UI/buttons/BookMarkButton.jsx';

export default function PropertyCard({ property }) {
  const [saved, setSaved] = useState(false);

  const handleSave = (isSaved) => {
    setSaved(isSaved);
  };

  const getPropertyRate = () => {
    if (!property || !property.rates) {
      return 'No rate available';
    }

    const { rates } = property;

    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/month`;
    } else if (rates.weekly && rates.nightly) {
      return `$${rates.weekly.toLocaleString()}/week, $${rates.nightly.toLocaleString()}/night`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/week`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    } else {
      return 'No rate available';
    }
  };

  if (!property) {
    return null;
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-60">
        <Image
          src={property.images[0]}
          alt="Property Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6 flex justify-between items-start lg:items-center">
        <div>
          <div className="text-red-600 font-bold mb-2">{property.type}</div>
          <h3 className="text-2xl font-bold mb-2">{property.name}</h3>
          <p className="text-gray-600 mb-4">
            <FaBed className="inline mr-2" />
            {property.beds} Bed
            <FaBath className="inline ml-4 mr-2" />
            {property.baths} Baths
            <FaRulerCombined className="inline ml-4 mr-2" />
            {property.square_feet.toLocaleString()} sqft
          </p>
          <p className="text-lg font-bold text-green-600 mb-4">
            {getPropertyRate()}
          </p>
          <div className="flex items-center mt-2">
            <MapPinIcon className="text-red-700 mr-1 h-8 w-8" />
            <span className="text-md font-bold">
              {property.location.street}, {property.location.city}{' '}
              {property.location.state}
            </span>
          </div>
        </div>
        <div className="ml-auto">
          <BookMarkButton saved={saved} onSave={handleSave} />
        </div>
      </div>
      <div className="  p-2 m-4">
        <Link href={`/properties/${property._id}`} passHref>
          <LinkButton>Check Property &#8594;</LinkButton>
        </Link>
      </div>
    </div>
  );
}

// Styled component for the Link button
const LinkButton = ({ children }) => (
  <button className="text-indigo-600 font-bold hover:text-blue-700 focus:outline-none">
    {children}
  </button>
);
