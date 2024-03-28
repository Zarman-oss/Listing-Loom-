import { HomeModernIcon } from '@heroicons/react/24/outline';
import { FaInstagram } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="bg-white border-gray-400 py-4 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <HomeModernIcon className="h-10 w-10 text-black" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <a href="/properties">Properties</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className=" flex flex-col-1">
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; 2024 Listing Loom. All rights reserved
          </p>
          <FaInstagram className="h-6 w-6 text-black" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
