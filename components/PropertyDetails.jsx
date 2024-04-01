import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa';
import BlackButton from '../components/UI/buttons/BlackButton';
import PropertyImage from './PropertyImage';

export default function PropertyDetails({ property }) {
  if (!property) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <PropertyImage />
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-4">{property.address}</h1>
        <div className="flex items-center gap-4 text-gray-500 mb-2">
          <p>
            <FaBed className="inline mr-2" /> {property.beds}
          </p>
          <p>
            <FaBath className="inline mr-2" /> {property.baths}
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>
        <div className="text-red-600 font-bold mb-4">
          <p>{property.type}</p>
        </div>
        <div className="text-xl text-gray-800 font-semibold mb-4">
          ${property.price}
        </div>
        <BlackButton text="Contact Agent" />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis
          sapien ut diam malesuada, sit amet ultricies justo interdum. Vivamus
          nec dolor vitae libero sodales consequat. Fusce tincidunt vestibulum
          hendrerit. Proin sed sapien quis mauris tempor euismod ut et felis.
          Sed a lorem quis ex vulputate tempus eget non eros. Donec elementum
          nulla ut justo eleifend posuere.
        </p>
      </div>
    </div>
  );
}
