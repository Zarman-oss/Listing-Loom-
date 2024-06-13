'use client';
import { BellIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useGlobalContext } from '@/context/globalContext.js';
import { useState, useEffect } from 'react';

export default function UnreadMessageCount({ session }) {
  const { unread, setUnread } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');

        if (res.status === 200) {
          const data = await res.json();
          setUnread(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadMessages();
  }, [session]);

  return (
    <Link href='/messages'>
      <button type='button' className='rounded-full p-1 text-black relative'>
        <BellIcon className='h-8 w-8' aria-hidden='true' />
        {unread > 0 && (
          <span className='absolute top-1 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full'>
            {unread}
          </span>
        )}
      </button>
    </Link>
  );
}
