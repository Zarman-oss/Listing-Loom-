import { FaCalendar, FaHome, FaUserFriends } from 'react-icons/fa';
import HeroBtn from './heroBtn';

export default function infoBox() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 rounded-lg">
      <div className="bg-gray-300 p-4 rounded-lg shadow-md flex items-center">
        <FaHome className="text-6xl text-gray-600 mr-2" />
        <div>
          <h2 className="text-lg font-bold">For Renters</h2>
          <p className="mt-1 mb-2">
            Discover your dream rental property. Save favorites and connect with
            landlords.
          </p>
          <HeroBtn text="Browse Properties" />
        </div>
      </div>
      <div className="bg-gray-300 p-4 rounded-lg shadow-md flex items-center">
        <FaUserFriends className="text-6xl text-gray-600 mr-2" />
        <div>
          <h2 className="text-lg font-bold">For Property Owners</h2>
          <p className="mt-1 mb-2">
            List your properties and find potential tenants. Rent out as an
            Airbnb or for long term.
          </p>
          <HeroBtn text="List Properties " />
        </div>
      </div>

      <div className="bg-gray-300 p-4 rounded-lg shadow-md flex items-center">
        <FaCalendar className="text-5xl text-gray-600 mr-2" />
        <div>
          <h2 className="text-lg font-bold">Connect with realtors</h2>
          <p className="mt-1 mb-2">
            Connect with realtors to find your dream property. Additional text
            here.
          </p>
          <HeroBtn text="Book A Call" />
        </div>
      </div>
    </div>
  );
}
