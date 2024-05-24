import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
export default function LoginButton() {
  return (
    <button className="bg-white text-black  text-sm font-medium py-2 px-2 rounded-lg sm:w-32 flex items-center">
      <ArrowLeftEndOnRectangleIcon className="mr-2 text-3xl text-black  h-8 w-8" />
      Log In
    </button>
  );
}
