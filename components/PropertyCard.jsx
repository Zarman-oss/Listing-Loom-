import Image from 'next/image';
import Link from 'next/link';
import {
  FaBath,
  FaBed,
  FaMapMarker,
  FaMoneyBill,
  FaRulerCombined,
} from 'react-icons/fa';

export default function PropertyCard({ property }) {
  const getPropertyRate = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/month`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/week`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  if (!property) {
    return null;
  }

  return (
    <div className="rounded-xl shadow-md relative lg:max-w-sm">
      <Image
        src={`/images/properties/${property.images[0]}`}
        alt="photo"
        sizes="100vw"
        height={0}
        width={0}
        className="w-full h-auto lg:w-full lg:h-48"
      />
      <div className="p-2">
        <div className="text-left md:text-center lg:text-left mb-1">
          <div className="text-red-600 font-bold ">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-1 py-1  text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${getPropertyRate()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-2">
          <p>
            <FaBed className="inline mr-2" /> 3
          </p>{' '}
          <p>
            <FaBath className="inline mr-2" /> 2
          </p>{' '}
          <p>
            <FaRulerCombined className="inline mr-2" />
            {property.square_feet}{' '}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-sm mb-2">
          <h3 className="text-center md:text-left lg:text-center">
            Property Payment Options:{' '}
          </h3>
          <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
            {property.rates.nightly && (
              <p>
                <FaMoneyBill className="inline mr-2" /> Nigh
              </p>
            )}
            {property.rates.weekly && (
              <p>
                <FaMoneyBill className="inline mr-2" /> Week
              </p>
            )}
            {property.rates.monthly && (
              <p>
                <FaMoneyBill className="inline mr-2" /> Month{' '}
              </p>
            )}
          </div>
        </div>

        <div className="border border-gray-100 mb-2"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-2 lg:mb-0">
            <FaMapMarker className="text-red-700 mt-1" />
            <span className="text-red-700">
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px]  text-black px-4 py-2 rounded-lg text-center text-sm flex items-center hover:bg-gray-300"
          >
            <div className="font-bold flex items-center">
              <button>
                <span>Check Property</span>
              </button>
              <span className="mr-1">&#8594;</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
