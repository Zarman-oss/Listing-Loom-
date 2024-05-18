'use client';

import HeroBtn from './UI/buttons/HeroBtn.jsx';
import { useState } from 'react';

export default function PropertySearchForm() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        id="location"
        placeholder="State,City,State,Area Code"
        className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 shadow-md "
      />
      <select className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 shadow-md ">
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="condo">Condo</option>
        <option value="townhouse">Townhouse</option>
      </select>
      <button>
        <HeroBtn text="Search" />
      </button>
    </div>
  );
}
