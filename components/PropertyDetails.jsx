import {
  FaBath,
  FaBed,
  FaDotCircle,
  FaMapMarker,
  FaRulerCombined,
  FaTimesCircle,
} from 'react-icons/fa';
import BlackButton from '../components/UI/buttons/BlackButton';

export default function PropertyDetails({ property }) {
  const getPropertyRate = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/month`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/week`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/nigh`;
    }
  };

  if (!property) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 py-8 gap-12'>
      <div>
        <div className=' mt-10 sm:mt-2'>
          <h2 className='text-xl font-semibold mb-4'>Description</h2>
          <p className='text-gray-700'>{property.description}</p>
        </div>
        <div className=' mt-10 sm:mt-2'>
          <h2 className='text-xl font-semibold mb-4'>Property Details</h2>
          <ul className='grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 list-none'>
            {property.amenities.map((amenity, index) => (
              <li key={index} className='flex items-center'>
                <FaDotCircle className='text-green-500 mr-1' />
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='px-8 '>
        <div className=' lg:flex-row justify-between mb-4'>
          <h3 className='text-xl font-bold'>{property.name}</h3>
          <div className='text-red-600 font-bold mb-2'>
            <p>{property.type}</p>
          </div>
          <h1 className='text-2xl font-semibold mb-1'>{property.address} </h1>

          <div className='flex align-start gap-2 mb-1 lg:mb-0'>
            <span className='text-red-700'>
              <h2 className='flex'>
                <FaMapMarker className='text-red-700 mr-1 inline mt-1' />
                {property.location.street}, {property.location.city}
              </h2>
            </span>
          </div>

          <div className='flex items-center gap-2 text-gray-500 mb-2'>
            <p>
              <FaBed className='inline mr-2' /> {property.beds}
            </p>
            <p>
              <FaBath className='inline mr-2' /> {property.baths}
            </p>
            <p>
              <FaRulerCombined className='inline mr-2' />
              {property.square_feet}
              <span className='md:hidden lg:inline'>sqft</span>
            </p>
          </div>

          <div className='text-xl text-gray-800 font-semibold mb-4'>
            {getPropertyRate()}
            {property.rates.nightly ? (
              `$${property.rates.nightly.toLocaleString()}`
            ) : (
              <div className='flex items-center'>
                <FaTimesCircle className='text-red-700 mr-1' />
                <h3 className='text-sm'>No Nightly Payment Available </h3>
              </div>
            )}
          </div>
        </div>

        <BlackButton text='Contact Agent' />
      </div>
    </div>
  );
}
