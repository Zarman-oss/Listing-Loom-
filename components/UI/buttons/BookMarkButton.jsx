import { useState } from 'react';
import { HeartIcon, CheckIcon } from '@heroicons/react/24/solid';

export default function BookMarkButton({ saved, onSave }) {
  const [isSaved, setIsSaved] = useState(saved);

  const handleClick = () => {
    setIsSaved(!isSaved);
    onSave(!isSaved); // Callback to parent component to handle saving state
  };
  return (
    <div className="">
      <button
        onClick={handleClick}
        className="flex  items-center gap-1 px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-full shadow-sm focus:outline-none hover:bg-gray-100"
      >
        {isSaved ? (
          <CheckIcon className="h-5 w-5 text-green-500" />
        ) : (
          <HeartIcon className="h-6 w-6 text-red-500" />
        )}
        <span>{isSaved ? 'Saved' : 'Save'}</span>
      </button>
    </div>
  );
}
