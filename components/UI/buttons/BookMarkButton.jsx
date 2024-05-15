import { HeartIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Alert from '@/components/UI/Alert.jsx';

export default function BookMarkButton({ property }) {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [alertData, setAlertData] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  useEffect(() => {
    if (property && property._id) {
      if (!userId) {
        return;
      }

      const bookmarkStatus = async () => {
        try {
          const res = await fetch('/api/bookmarks/check', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              propertyId: property._id,
            }),
          });

          if (res.status === 200) {
            const data = await res.json();
            setIsBookmarked(data.isBookmarked);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      bookmarkStatus();
    }
  }, [property, userId]);

  const handleClick = async () => {
    if (!userId) {
      setAlertData({
        show: true,
        type: 'error',
        message: 'You need to sign in to bookmark',
      });
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
        setAlertData({
          show: true,
          type: 'success',
          message: data.message,
        });
      } else {
        const data = await res.json();
        setAlertData({
          show: true,
          type: 'error',
          message: data.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertData({
        show: true,
        type: 'error',
        message: 'An error occurred while bookmarking the property',
      });
    }
  };

  return (
    <div className="">
      <Alert
        show={alertData.show}
        onClose={() => setAlertData({ ...alertData, show: false })}
        type={alertData.type}
        message={alertData.message}
      />
      <button
        onClick={handleClick}
        className="flex items-center gap-1 px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-full shadow-sm focus:outline-none hover:bg-gray-100"
      >
        {isBookmarked ? (
          <>
            <TrashIcon className="h-6 w-6 text-red-500 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-6 lg:w-6" />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl">
              Remove
            </span>
          </>
        ) : (
          <>
            <HeartIcon className="h-6 w-6 text-red-500 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-6 lg:w-6" />
            <span className="ml-1 text-sm sm:ml-2 sm:text-base md:text-lg lg:text-xl">
              Save
            </span>
          </>
        )}
      </button>
    </div>
  );
}
