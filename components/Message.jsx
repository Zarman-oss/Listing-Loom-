'use client';
import { useState } from 'react';
import HeroBtn from '@/components/UI/buttons/HeroBtn.jsx';
import Alert from './UI/Alert.jsx';

export default function Message({ messages }) {
  const [isRead, setIsRead] = useState(messages.read);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isDeleted, setIsDeleted] = useState(false);

  const handleMarkAsRead = async () => {
    try {
      const res = await fetch(`/api/messages/${messages._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setAlert({
          show: true,
          type: 'success',
          message: read ? 'Marked as read' : 'Marked as new',
        });
      }
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Something went wrong',
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${messages._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setAlert({
          show: true,
          type: 'success',
          message: 'Message Deleted',
        });
      }
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Message was not deleted',
      });
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <>
      <Alert
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ show: false, type: '', message: '' })}
      />

      <div className='relative p-3 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105'>
        {!isRead && (
          <span className='absolute top-2 right-2 text-red-500 text-xs font-semibold px-2 py-1 rounded'>
            New
          </span>
        )}
        <div className='mb-2'>
          <h2 className='text-md font-semibold text-gray-800'>
            Property Listing:
          </h2>
          <h2 className='text-md font-semibold text-gray-800'>
            {messages.property.name}
          </h2>
        </div>
        <div className='mb-2'>
          <h2 className='text-sm font-semibold text-gray-800'>Sender:</h2>
          <h2 className='text-sm text-gray-800'>{messages.sender.username}</h2>
        </div>
        <div className='mb-2'>
          <a className='text-semibold' href={`mailto:${messages.email}`}>
            <h2 className='text-sm font-semibold text-gray-800'>Email:</h2>
            <p className='text-gray-600 text-sm'>{messages.email}</p>
          </a>
        </div>
        <div className='mb-2'>
          <h2 className='text-sm font-semibold text-gray-800'>Phone:</h2>
          <p className='text-gray-600 text-sm'>{messages.phone}</p>
        </div>
        <p className='mb-2 p-2 bg-yellow-100 text-gray-700 text-sm rounded'>
          {messages.body}
        </p>
        <p className='mb-2 text-gray-500 text-xs'>
          Received at: {new Date(messages.createdAt).toLocaleString()}
        </p>
        <div className='flex justify-end space-x-2'>
          <button onClick={handleMarkAsRead} className='px-2 py-1 text-sm'>
            {isRead ? 'Mark As New' : 'Mark As Read'}
          </button>
          <HeroBtn onClick={handleDelete} text='Delete' />
        </div>
      </div>
    </>
  );
}
