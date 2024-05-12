import { useState } from 'react';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/solid';
import Alert from '@/components/UI/Alert.jsx';

export default function BookMarkButton({ saved, onSave }) {
  const [isBookmarked, setIsBookmarked] = useState(saved);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    // Toggle bookmark state
    setIsBookmarked(!isBookmarked);
    onSave(!isBookmarked);

    // Show alert when bookmarking property
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className="flex items-center gap-1 px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-full shadow-sm focus:outline-none hover:bg-gray-100"
      >
        {isBookmarked ? (
          <>
            <TrashIcon className="h-5 w-5 text-red-500" />
            <span className="ml-1">Remove property</span>
          </>
        ) : (
          <>
            <HeartIcon className="h-6 w-6 text-red-500" />
            <span className="ml-1">Save</span>
          </>
        )}
      </button>

      <Alert
        show={showAlert}
        onClose={handleCloseAlert}
        type="success" // or "error" based on your preference
        message={
          isBookmarked
            ? 'Property bookmarked!'
            : 'Property removed from bookmarks!'
        }
      />
    </div>
  );
}
