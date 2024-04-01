import { FaGoogle } from 'react-icons/fa';
export default function LoginButton() {
  return (
    <button className="bg-white text-black  text-sm font-medium py-2 px-2 rounded-lg sm:w-32 flex items-center">
      <FaGoogle className="mr-2 text-3xl text-red-700  " />
      Sign in
    </button>
  );
}
