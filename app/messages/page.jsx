import Messages from '@/components/Messages.jsx';
import GoBackBtn from '@/components/UI/buttons/GoBackBtn.jsx';
import Link from 'next/link.js';

export default function MessagePage() {
  return (
    <>
      <section className='px-4 py-4'>
        <div className='flex max-w-7xl mx-auto p-1'>
          <div>
            <Link href='/'>
              <GoBackBtn />
            </Link>
          </div>
        </div>
        <div className='text-center mt-6 mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Listing Inquiries
          </h1>
          <p className='text-gray-600 mt-2'>
            Manage and respond to inquiries about your properties
          </p>
        </div>
        <Messages />
      </section>
    </>
  );
}
