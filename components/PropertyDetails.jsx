// import { MapPinIcon } from '@heroicons/react/24/solid';
// import Link from 'next/link.js';
// import { FaBath, FaBed, FaDotCircle, FaRulerCombined } from 'react-icons/fa';
// import AgentContactModal from './AgentContactModal.jsx';
// export default function PropertyDetails({ property }) {
//   const getPropertyRate = () => {
//     const { rates } = property;

//     if (rates.monthly) {
//       return `$${rates.monthly.toLocaleString()}/month`;
//     } else if (rates.weekly && rates.nightly) {
//       return `$${rates.weekly.toLocaleString()}/week,$${rates.nightly.toLocaleString()}/night`;
//     } else if (rates.weekly) {
//       return `$${rates.weekly.toLocaleString()}/week`;
//     } else if (rates.nightly) {
//       return `$${rates.nightly.toLocaleString()}/night`;
//     } else {
//       return 'No rate available';
//     }
//   };

//   if (!property) {
//     return null;
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 py-8 gap-12">
//       <div>
//         <div className=" mt-10 sm:mt-2">
//           <h2 className="text-xl font-semibold mb-4">Description</h2>
//           <p className="text-gray-700">{property.description}</p>
//         </div>
//         <div className=" mt-10 sm:mt-2">
//           <h2 className="text-xl font-semibold mb-4">Property Details</h2>
//           <ul className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 list-none">
//             {property.amenities.map((amenity, index) => (
//               <li key={index} className="flex items-center">
//                 <FaDotCircle className="text-green-500 mr-1" />
//                 {amenity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="px-8 flex flex-col justify-between">
//         <div className="lg:flex-row justify-between mb-2">
//           <div className="text-red-600 text-lg font-bold ">
//             <p>{property.type}</p>
//           </div>
//           <div className="flex flex-col">
//             <h2 className="text-xl font-bold">{property.name}</h2>

//             <div className="flex items-center mb-1">
//               <h1 className="text-2xl font-semibold mb-1">
//                 {property.address}
//               </h1>
//             </div>
//             <div className="flex items-center mt-2 gap-2 text-gray-500 mb-2">
//               <div className="flex items-center gap-3">
//                 <p className="flex items-center">
//                   <FaBed className="mr-1 h-6 w-6" />
//                   <span>{property.beds}</span>
//                 </p>
//                 <p className="flex items-center">
//                   <FaBath className="mr-1 h-6 w-6" />
//                   <span>{property.baths}</span>
//                 </p>
//                 <p className="flex items-center">
//                   <FaRulerCombined className="mr-1 h-6 w-6" />
//                   <span>{property.square_feet}</span>
//                   <span className="hidden md:inline"> sqft</span>
//                 </p>
//               </div>
//             </div>

//             <div className="flex mb-2 lg:mb-0">
//               <span className="text-red-700">
//                 <h2>
//                   <p className="flex items-center mt-1">
//                     <MapPinIcon className="text-red-700 mr-1 h-6 w-6" />
//                     <span className="text-md font-bold">
//                       {property.location.street}, {property.location.city}{' '}
//                       {property.location.state}
//                     </span>
//                   </p>
//                 </h2>
//               </span>
//             </div>

//             <div className="text-lg ml-1  text-green-600 font-semibold mb-4">
//               {getPropertyRate()}
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Link href="/contact">
//               <AgentContactModal property={property} />
//             </Link>
//             <div className="ml-4"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { MapPinIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { FaBath, FaBed, FaDotCircle, FaRulerCombined } from 'react-icons/fa';
import AgentContactModal from './AgentContactModal.jsx';

export default function PropertyDetails({ property }) {
  const getPropertyRate = () => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8 px-4 sm:px-8 lg:px-12">
      <div>
        <div className="mt-10 sm:mt-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Description
          </h2>
          <p className="text-gray-700">{property.description}</p>
        </div>
      </div>

      <div className="lg:pl-12 flex flex-col justify-between">
        <div className="mb-6">
          <div className="text-red-600 text-lg font-bold mb-2">
            <p>{property.type}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {property.name}
            </h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {property.address}
            </h3>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <FaBed className="text-gray-500" />
                <span className="font-bold">{property.beds}</span>
                <span>Bed</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-gray-500" />
                <span className="font-bold">{property.baths}</span>
                <span>Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRulerCombined className="text-gray-500" />
                <span className="font-bold">
                  {property.square_feet.toLocaleString()}
                </span>
                <span>sqft</span>
              </div>
            </div>
            <div className="flex items-center text-gray-700 mb-4">
              <MapPinIcon className="text-red-700 h-6 w-6" />
              <span className="text-md font-semibold ml-2">
                {property.location.street}, {property.location.city},{' '}
                {property.location.state}
              </span>
            </div>
            <div className="text-lg text-green-600 font-semibold mb-4">
              {getPropertyRate()}
            </div>
            <div className="mt-10 sm:mt-2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Property Details
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <FaDotCircle className="text-green-500 mr-2" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Link href="/contact" passHref>
            <div className="inline-block bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition-colors duration-300">
              Contact Seller Agent
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
