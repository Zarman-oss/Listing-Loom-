import Properties from '@/components/Properties.jsx';
import PropertySearchForm from '@/components/PropertySearchForm.jsx';
import Link from 'next/link';
import GoBackBtn from '../../components/UI/buttons/GoBackBtn';

export default async function HomePage() {
  return (
    <>
      <section className='px-4 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-center sm:px-6 lg:px-8 '>
          <PropertySearchForm />
        </div>
        <div className='flex max-w-7xl mx-auto p-1'>
          <div>
            <Link href='/'>
              <GoBackBtn />
            </Link>
          </div>
        </div>
        <div className='text-center mt-6 mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Latest Properties
          </h1>
          <p className='text-gray-600 mt-2'>
            Check out the latest properties added to our listings
          </p>
        </div>
        <Properties />
      </section>
    </>
  );
}
