'use client';

import {
  EnvelopeIcon,
  InboxIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Loader from './Loading.jsx';
import HeroBtn from './UI/buttons/HeroBtn.jsx';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log('Error fetching messages: ', error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  const handleMarkAsRead = (id) => {
    console.log(`Mark as read: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete: ${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {messages.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="p-3 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="flex items-center mb-2">
                <UserIcon className="text-blue-500 mr-2 h-5 w-5" />
                <h2 className="text-md text-gray-800 font-semibold">
                  {message.property.name}
                </h2>
              </div>
              <div className="flex items-center mb-2">
                <UserIcon className="text-blue-500 mr-2 h-5 w-5" />
                <h2 className="text-md text-gray-800 font-semibold">
                  {message.name}
                </h2>
              </div>
              <div className="flex items-center mb-1">
                <EnvelopeIcon className="text-blue-500 mr-2 h-5 w-5" />
                <p className="text-gray-600 text-sm">{message.email}</p>
              </div>
              <div className="flex items-center mb-1">
                <PhoneIcon className="text-blue-500 mr-2 h-5 w-5" />
                <p className="text-gray-600 text-sm">{message.phone}</p>
              </div>
              <p className="mt-2 p-2 bg-yellow-100 text-gray-700 text-sm rounded">
                {message.body}
              </p>
              <p className="mt-2 text-gray-500 text-xs">
                Received at: {new Date(message.receivedAt).toLocaleString()}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleMarkAsRead(message.id)}
                  className="text-black px-2 py-1 text-sm rounded  transition-colors"
                >
                  Mark as Read
                </button>
                <HeroBtn
                  onClick={() => handleDelete(message.id)}
                  text="Delete"
                  className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <InboxIcon className="text-5xl text-gray-400 mb-4 h-12 w-12" />
          <p className="text-gray-500 text-center">You have no messages.</p>
        </div>
      )}
    </div>
  );
}
