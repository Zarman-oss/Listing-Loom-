// 'use client';
// import { useState } from 'react';
// import { HeartIcon, TrashIcon } from '@heroicons/react/24/solid';
// import Alert from '@/components/UI/Alert.jsx';
// import { useSession } from 'next-auth/react';

// export default function BookMarkButton(property) {
//   // const [isBookmarked, setIsBookmarked] = useState(saved);
//   // const [showAlert, setShowAlert] = useState(false);

//   // const handleClick = () => {
//   //   // Toggle bookmark state
//   //   setIsBookmarked(!isBookmarked);
//   //   onSave(!isBookmarked);

//   //   // Show alert when bookmarking property
//   //   setShowAlert(true);
//   // };

//   // const handleCloseAlert = () => {
//   //   setShowAlert(false);
//   // };

//   const { data: session } = useSession();

//   const userId = session?.user?.id;

//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const handleClick = async () => {
//     if (!userId) {
//       ('You need to sign in to bookmark');
//       return;
//     }
//   };

//   return (
//     <div className="">
//       <button
//         onClick={handleClick}
//         className="flex items-center gap-1 px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-full shadow-sm focus:outline-none hover:bg-gray-100"
//       >
//         <HeartIcon className="h-6 w-6 text-red-500" />
//         <span className="ml-1">Save</span>

//         {/* {isBookmarked ? (
//           <>
//             <TrashIcon className="h-5 w-5 text-red-500" />
//             <span className="ml-1">Remove property</span>
//           </>
//         ) : (
//           <>
//             <HeartIcon className="h-6 w-6 text-red-500" />
//             <span className="ml-1">Save</span>
//           </>
//         )} */}
//       </button>

//       <Alert
//         show={showAlert}
//         onClose={handleCloseAlert}
//         type="success" // or "error" based on your preference
//         message={
//           isBookmarked
//             ? 'Property bookmarked!'
//             : 'Property removed from bookmarks!'
//         }
//       />
//     </div>
//   );
// }

'use client';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function BookMarkButton({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [setBookmarked, setIsBookmarked] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      // Handle scenario when user is not signed in
      console.log('You need to sign in to bookmark');
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
        console.log(data.message); // Log success message
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error('Error:', error); // Log error
    }
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className="flex items-center gap-1 px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-full shadow-sm focus:outline-none hover:bg-gray-100"
      >
        <HeartIcon className="h-6 w-6 text-red-500" />
        <span className="ml-1">Save</span>
      </button>
    </div>
  );
}
