'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import HeroBtn from './UI/buttons/HeroBtn.jsx';

export default function PropertySearchForm() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location === '' && propertyType === 'All') {
      router.push('/properties');
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
    >
      <div className="flex flex-col">
        <input
          type="text"
          id="location"
          placeholder="State, City, Area Code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 shadow-md"
        />
      </div>
      <div className="flex flex-col">
        <select
          id="property-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 shadow-md"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Room">Room</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Studio">Studio</option>
        </select>
      </div>
      <div className="w-full sm:w-auto">
        <HeroBtn text="Search" />
      </div>
    </form>
  );
}
