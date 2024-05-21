import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function GoBackBtn() {
  return (
    <button className="text-xl font-semibold text-indigo-600 flex items-center bg-white border border-transparent rounded-lg px-2 py-1">
      <ArrowLeftIcon className="mr-2 h-8 w-8 text-indigo-600" />
    </button>
  );
}
