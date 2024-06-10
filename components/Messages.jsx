'use client';
import { useEffect, useState } from 'react';
import { InboxIcon } from '@heroicons/react/24/solid';
import Loader from './Loading.jsx';
import Message from './Message.jsx';

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {messages.length > 0 ? (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {messages.map((message) => (
            <Message key={message._id} messages={message} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-64'>
          <InboxIcon className='w-16 h-16 text-gray-400' />
          <p className='text-gray-500 mt-2'>You have no messages.</p>
        </div>
      )}
    </div>
  );
}
